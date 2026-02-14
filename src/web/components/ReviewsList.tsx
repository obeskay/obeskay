import { memo, useState, useEffect } from "react";
import ReviewItem from "./ReviewItem";
import { fetchTestimonials } from "../lib/api";

/* eslint-disable @next/next/no-img-element */

interface Testimonial {
  id: string;
  author: string;
  content: string;
  rating: number;
  publishedDate: string;
  featured?: boolean;
  source?: string;
  avatar?: {
    id: string;
    url: string;
  };
}

interface ReviewItemProps {
  author: {
    name: string;
    image: string;
  };
  qualification: number;
  text: string;
}

const mapTestimonialToReviewFormat = (testimonial: Testimonial): ReviewItemProps => {
  return {
    author: {
      name: testimonial.source || testimonial.author,
      image: testimonial.avatar?.url || "https://res.cloudinary.com/stickycoverscloudinary/image/upload/v1701126436/Default_pfp.svg_n3udf6.png",
    },
    qualification: testimonial.rating,
    text: testimonial.content.replace(/<[^>]*>/g, ''), // Remove HTML tags from rich text
  };
};

const ReviewsList = () => {
  const [testimonials, setTestimonials] = useState<ReviewItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true);
        const data = await fetchTestimonials();

        if (data && data.length > 0) {
          // Filter for featured testimonials if needed
          const featuredTestimonials = data.filter((t: Testimonial) => t.featured || !t.source);
          const mappedTestimonials = featuredTestimonials.map(mapTestimonialToReviewFormat);
          setTestimonials(mappedTestimonials);
        } else {
          // Fallback to hardcoded data if no testimonials found
          const fallbackReviews: ReviewItemProps[] = [
            {
              author: {
                name: "Chilango",
                image: "https://res.cloudinary.com/stickycoverscloudinary/image/upload/v1701123931/rhufwlbat2yrgoamy3ou.jpg",
              },
              qualification: 5,
              text: "En esta página stickycovers.com puedes encontrar diferentes diseños de stickers para la tarjeta del Metro...",
            },
            {
              author: {
                name: "La Verdad Noticias",
                image: "https://res.cloudinary.com/stickycoverscloudinary/image/upload/v1701126302/descarga_19_1_1_u9kxtj.jpg",
              },
              qualification: 5,
              text: "Un sitio web que te permite elegir entre una gran cantidad de stickers para hacer que el diseño de tu tarjeta de Movilidad Integrada se vea única...",
            },
            {
              author: {
                name: "Ethian O.",
                image: "https://res.cloudinary.com/stickycoverscloudinary/image/upload/v1701126436/Default_pfp.svg_n3udf6.png",
              },
              qualification: 5,
              text: "Buenas noches, ya llegó el sticker ya lo recibí me encantó muchas gracias. Valio la pena esperar quedó super bien",
            },
            {
              author: {
                name: "Paula R.",
                image: "https://res.cloudinary.com/stickycoverscloudinary/image/upload/v1701126436/Default_pfp.svg_n3udf6.png",
              },
              qualification: 5,
              text: "Me encantan🥰🥰🥰. Están divinaaaasss",
            },
          ];
          setTestimonials(fallbackReviews);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError(true);

        // Show hardcoded data as fallback
        const fallbackReviews: ReviewItemProps[] = [
          {
            author: {
              name: "Chilango",
              image: "https://res.cloudinary.com/stickycoverscloudinary/image/upload/v1701123931/rhufwlbat2yrgoamy3ou.jpg",
            },
            qualification: 5,
            text: "En esta página stickycovers.com puedes encontrar diferentes diseños de stickers para la tarjeta del Metro...",
          },
          {
            author: {
              name: "La Verdad Noticias",
              image: "https://res.cloudinary.com/stickycoverscloudinary/image/upload/v1701126302/descarga_19_1_1_u9kxtj.jpg",
            },
            qualification: 5,
            text: "Un sitio web que te permite elegir entre una gran cantidad de stickers para hacer que el diseño de tu tarjeta de Movilidad Integrada se vea única...",
          },
          {
            author: {
              name: "Ethian O.",
              image: "https://res.cloudinary.com/stickycoverscloudinary/image/upload/v1701126436/Default_pfp.svg_n3udf6.png",
            },
            qualification: 5,
            text: "Buenas noches, ya llegó el sticker ya lo recibí me encantó muchas gracias. Valio la pena esperar quedó super bien",
          },
          {
            author: {
              name: "Paula R.",
              image: "https://res.cloudinary.com/stickycoverscloudinary/image/upload/v1701126436/Default_pfp.svg_n3udf6.png",
            },
            qualification: 5,
            text: "Me encantan🥰🥰🥰. Están divinaaaasss",
          },
        ];
        setTestimonials(fallbackReviews);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="flex gap-6 shrink-0 w-auto">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-shrink-0 w-72 h-48 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-6 shrink-0 w-auto">
      {testimonials?.map((review, i) => (
        <ReviewItem key={i} content={review} />
      ))}
    </div>
  );
};

export default memo(ReviewsList);