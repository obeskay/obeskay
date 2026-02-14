const ProductSchema = ({ name, description, imageUrl, price }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "http://schema.org",
        "@type": "Product",
        name: name,
        description: description,
        image: imageUrl,
        brand: {
          "@type": "Brand",
          name: "Sticky Covers",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "MXN",
          price: price,
          priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
          availability: "http://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "StickyCovers",
          },
        },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
        },
      }),
    }}
  />
);

export default ProductSchema;
