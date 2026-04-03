import React from "react";
import Header from "../../components/SiteHeader";
import Footer from "../../components/SiteFooter";
import { projectsData } from "../../utils/Data";
import { useLanguage } from "../../context/LanguageContext";
import "../../styles/projects-page.css";

function Projects() {
  const { t } = useLanguage();

  return (
    <div>
      <Header />
      <section className="projects-section">
        <h2>{t("ourProjects")}</h2>
        <div className="projects-grid">
          {projectsData.map((project) => (
            <div key={project.id} className="project-card">
              <img
                src={project.image}
                alt={t(project.titleKey)}
                className="project-image"
                width="1000"
                height="750"
                loading="lazy"
              />
              <h3>{t(project.titleKey)}</h3>
              <p>{t(project.descriptionKey)}</p>
              <button className="see-more-button">{t("seeMore")}</button>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Projects;
