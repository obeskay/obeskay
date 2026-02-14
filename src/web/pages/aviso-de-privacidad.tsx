const Index = () => {
  return (
    <div className="layout">
      <div className="container flex flex-col max-w-3xl space-y-12">
        <h2 className="text-center">Aviso de privacidad</h2>
        <div className="w-full space-y-6">
          <h5 id="identidad-y-domicilio-del-responsable">
            Identidad y Domicilio del Responsable
          </h5>
          <p>
            <b>StickyCovers.com</b>, ubicado en Calle Luis González Obregón 5,
            Colonia Centro, C.P. 06000, Del. Cuauhtémoc, Ciudad de México,
            México, es el responsable del tratamiento de sus datos personales.
          </p>
          <h5 id="datos-personales-recabados">Datos Personales Recabados</h5>
          <p>
            Recopilamos los siguientes datos personales: nombre, dirección de
            correo electrónico, número de teléfono, dirección de entrega y
            detalles de pago. Estos datos se utilizan exclusivamente para
            procesar su pedido y comunicarnos con usted.
          </p>
          <h5 id="uso-de-los-datos">Uso de los Datos</h5>
          <p>Sus datos se utilizarán para:</p>
          <ul className="list-disc pl-4">
            <li>Procesar y entregar sus pedidos.</li>
            <li>
              Comunicarnos con usted sobre su pedido o responder a sus
              consultas.
            </li>
            <li>
              Enviar información sobre promociones y productos, si así lo
              autoriza.
            </li>
            <li>Mejorar nuestros servicios mediante análisis de datos.</li>
          </ul>
          <h5 id="transferencia-de-datos">Transferencia de Datos</h5>
          <p>
            No compartiremos, venderemos ni transferiremos sus datos personales
            a terceros, excepto para procesar pagos a través de Mercado Pago o
            cuando sea requerido por ley.
          </p>
          <h5 id="derechos-arco">Derechos ARCO</h5>
          <p>
            Usted tiene derecho a Acceder, Rectificar y Cancelar sus datos
            personales, así como a Oponerse al tratamiento de los mismos o
            revocar el consentimiento que para dicho fin nos haya otorgado.
            Estos derechos se pueden ejercer a través de los canales de
            comunicación establecidos por StickyCovers.com.
          </p>
          <h5 id="revocaci-n-del-consentimiento">
            Revocación del Consentimiento
          </h5>
          <p>
            Puede revocar su consentimiento para el uso de sus datos personales.
            Sin embargo, es importante considerar que no en todos los casos
            podremos atender su solicitud o concluir el uso de forma inmediata,
            ya que es posible que por alguna obligación legal requiramos seguir
            tratando sus datos personales.
          </p>
          <h5 id="limitaci-n-del-uso-o-divulgaci-n-de-sus-datos">
            Limitación del Uso o Divulgación de sus Datos
          </h5>
          <p>
            Puede solicitar la limitación del uso o divulgación de su
            información personal, en cuyo caso haremos nuestro mejor esfuerzo
            para atender su solicitud.
          </p>
          <h5 id="cambios-al-aviso-de-privacidad">
            Cambios al Aviso de Privacidad
          </h5>
          <p>
            Nos reservamos el derecho de cambiar este aviso de privacidad en
            cualquier momento. Las modificaciones estarán disponibles en nuestro
            sitio web.
          </p>
          <h5 id="contacto">Contacto</h5>
          <p>
            Para cualquier duda o aclaración respecto a sus datos personales,
            puede contactarnos en stickycoversmx@gmail.com.
          </p>
        </div>
        <p>
          Al utilizar los servicios de StickyCovers.com, usted reconoce y acepta
          este aviso de privacidad.
        </p>
      </div>
    </div>
  );
};

export default Index;
