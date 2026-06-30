import React, { useEffect, useRef } from "react";
import partnerCompany1 from "../../assets/partners/partner-company-1-logo.webp";
import partnerCompany2 from "../../assets/partners/partner-company-2-logo.webp";
import partnerCompany3 from "../../assets/partners/partner-company-3-logo.webp";
import partnerCompany4 from "../../assets/partners/partner-company-4-logo.webp";
import partnerCompany5 from "../../assets/partners/partner-company-5-logo.webp";
import partnerCompany6 from "../../assets/partners/partner-company-6-logo.webp";

const images = [
  {
    src: partnerCompany1,
    alt: "Construction partner company logo",
  },
  {
    src: partnerCompany2,
    alt: "Building materials partner company logo",
  },
  {
    src: partnerCompany3,
    alt: "Engineering partner company logo",
  },
  {
    src: partnerCompany4,
    alt: "Architecture partner company logo",
  },
  {
    src: partnerCompany5,
    alt: "Infrastructure partner company logo",
  },
  {
    src: partnerCompany6,
    alt: "Construction technology partner company logo",
  },
];

const PartnersCarousel = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let scrollPos = 0;

    const scroll = () => {
      scrollPos += 1; // control speed
      if (scrollPos >= container.scrollWidth / 2) scrollPos = 0;
      container.scrollLeft = scrollPos;
      requestAnimationFrame(scroll);
    };

    const animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId); // cleanup
  }, []);

  return (
    <section className="partners-section">
      <div className="partners-container-wrapper" ref={containerRef}>
        <div className="partners-container">
          {images.concat(images).map((img, index) => (
            <div className="partner-item" key={index}>
              <img
                src={img.src}
                alt={img.alt}
                width="220"
                height="120"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
