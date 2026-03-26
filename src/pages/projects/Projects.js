import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { projectsData } from "../../utils/Data";
import { useLanguage } from "../../context/LanguageContext";
import "../../styles/Projects.css";

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
