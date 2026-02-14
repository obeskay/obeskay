import React, { useState, useEffect } from "react";
import { fetchFAQs } from "../lib/api";

interface Pregunta {
  nombre: string;
  respuesta: string;
  images?: string[];
  url?: {
    texto: string;
    link: string;
  };
}

type iCategoria = {
  nombreCategoria: string;
  preguntas: Pregunta[];
}[];

const faqs: iCategoria = [];

const [faqSchema, setFaqSchema] = useState(null);

useEffect(() => {
  if (faqData.length > 0) {
    const schema = {
      "@context": "http://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.flatMap((faq) =>
        faq.preguntas.map((pregunta) => ({
          "@type": "Question",
          name: pregunta.nombre,
          acceptedAnswer: {
            "@type": "Answer",
            text: pregunta.respuesta,
          },
        }))
      ),
    };
    setFaqSchema(schema);
  }
}, [faqData]);

const PreguntasFrecuentes = () => {
  const [faqData, setFaqData] = useState<iCategoria>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        const response = await fetchFAQs();

        if (response && !response.errors) {
          const processedFaqs = response.map((faq: any) => ({
            nombreCategoria: faq.attributes.category,
            preguntas: [{
              nombre: faq.attributes.question,
              respuesta: faq.attributes.answer,
              ...(faq.attributes.url && {
                url: {
                  texto: faq.attributes.url.Texto,
                  link: faq.attributes.url.Link
                }
              })
            }]
          }));

          setFaqData(processedFaqs);
        } else {
          setError("Error al cargar las preguntas frecuentes");
          console.error(response?.errors);
        }
      } catch (err) {
        setError("Error al cargar las preguntas frecuentes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadFAQs();
  }, []);

  const displayFaqs = faqData.length > 0 ? faqData : faqs;

  return (
    <div className="layout">
      <div className="container flex flex-col items-center max-w-2xl space-y-12">
        <h3>Preguntas frecuentes</h3>

        {loading && (
          <div className="text-center py-8">
            <p>Cargando preguntas frecuentes...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {!loading && !error && displayFaqs.map((faq, i) => (
          <div className="space-y-4" key={i}>
            <h4>{faq.nombreCategoria}</h4>
            {faq.preguntas.map((pregunta, j) => (
              <div className="py-2" key={j}>
                <h6>{pregunta.nombre}</h6>
                <p className="text-justify">{pregunta.respuesta}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ScriptSchema = () => {
  if (!faqSchema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
};

export default PreguntasFrecuentes;