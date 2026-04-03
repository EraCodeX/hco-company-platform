import React from "react";
import { Hammer, DollarSign, Phone } from "lucide-react";

import constructionSite1 from "../assets/images/activity-construction-site-1.webp";
import constructionSite2 from "../assets/images/activity-construction-site-2.webp";
import constructionSite3 from "../assets/images/activity-construction-site-3.webp";

import engineeringPlanning1 from "../assets/images/activity-engineering-planning-1.webp";
import engineeringPlanning2 from "../assets/images/activity-engineering-planning-2.webp";
import engineeringPlanning3 from "../assets/images/activity-engineering-planning-3.webp";

import finishedProject1 from "../assets/images/activity-finished-project-1.webp";
import finishedProject2 from "../assets/images/activity-finished-project-2.webp";
import finishedProject3 from "../assets/images/activity-finished-project-3.webp";

//Projects
import tiranaCielo from "../assets/images/project-residential-tirana-cielo.webp";
import samiFrasheri from "../assets/images/project-residential-sami-frasheri.webp";
import lakeView from "../assets/images/project-residential-lake-view.webp";
import deltaResidence from "../assets/images/project-residential-delta-residence.webp";
import katedraljaRingjallja from "../assets/images/project-religious-katedralja-ringjallja.webp";
import hotelLuaniArte from "../assets/images/project-hotel-luani-arte.webp";
import spaWellness from "../assets/images/project-spa-wellness-center.webp";
import aeroportiNeneTereza from "../assets/images/project-infrastructure-tirana-airport-nene-tereza.webp";

//Features
import highQualityImage from "../assets/images/feature-high-quality-construction.webp";
import timelyCompletionImage from "../assets/images/feature-on-time-project-delivery.webp";
import skilledTeamImage from "../assets/images/feature-skilled-construction-team.webp";
import budgetFriendlyImage from "../assets/images/feature-cost-effective-construction.webp";
import customerSatisfactionImage from "../assets/images/feature-client-satisfaction.webp";
//Materials

import woodImage from "../assets/images/material-wood.webp";
import concreteImage from "../assets/images/material-concrete.webp";
import steelImage from "../assets/images/material-structural-steel.webp";
import glassImage from "../assets/images/material-glass.webp";
import tilesImage from "../assets/images/material-ceramic-tiles.webp";
import graniteImage from "../assets/images/material-granite.webp";
import brickImage from "../assets/images/material-brick.webp";
import marbleImage from "../assets/images/material-marble.webp";
import aluminumImage from "../assets/images/material-aluminum.webp";
import pvcImage from "../assets/images/material-pvc.webp";
import sandImage from "../assets/images/material-construction-sand.webp";
import cementImage from "../assets/images/material-cement.webp";
import plasterboardImage from "../assets/images/material-plasterboard.webp";
import asphaltImage from "../assets/images/material-asphalt.webp";
import insulationImage from "../assets/images/material-thermal-insulation.webp";
import roofingImage from "../assets/images/material-roofing.webp";
import adhesivesImage from "../assets/images/material-construction-adhesives.webp";
import ceramicsImage from "../assets/images/material-ceramics.webp";
import gypsumImage from "../assets/images/material-gypsum.webp";
import paintsImage from "../assets/images/material-paints.webp";
import pipesImage from "../assets/images/material-pipes.webp";
import electricalImage from "../assets/images/material-electrical-components.webp";
import timberImage from "../assets/images/material-timber.webp";
import stoneImage from "../assets/images/material-natural-stone.webp";
import metalSheetsImage from "../assets/images/material-metal-sheets.webp";
import compositeImage from "../assets/images/material-composite.webp";
import fiberCementImage from "../assets/images/material-fiber-cement.webp";

export const imagesData = [
  [
    {
      src: constructionSite1,
      alt: "Construction site workers building structure",
    },
    {
      src: constructionSite2,
      alt: "Construction team working on building foundation",
    },
    {
      src: constructionSite3,
      alt: "Construction process on active job site",
    },
  ],
  [
    {
      src: engineeringPlanning1,
      alt: "Engineering planning and project design meeting",
    },
    {
      src: engineeringPlanning2,
      alt: "Architect reviewing construction blueprints",
    },
    {
      src: engineeringPlanning3,
      alt: "Project planning and technical documentation",
    },
  ],
  [
    {
      src: finishedProject1,
      alt: "Completed modern construction project exterior",
    },
    {
      src: finishedProject2,
      alt: "Finished building project with modern design",
    },
    {
      src: finishedProject3,
      alt: "Final result of construction project",
    },
  ],
];
export const servicesData = [
  {
    icon: "fas fa-truck-loading",
    title: "Excavation Works",
    description:
      "We provide expert excavation services, from site clearing to trench digging, ensuring your project starts on solid ground.",
  },
  {
    icon: "fa fa-hammer",
    title: "Carpentry Works",
    description:
      "Our carpenters craft high-quality woodwork, including framing, roofing, and custom cabinetry, to meet your specific needs.",
  },
  {
    icon: "fa fa-wrench",
    title: "Iron Works",
    description:
      "We specialize in durable and precise ironwork, including gates, railings, and structural supports.",
  },
  {
    icon: "fas fa-building",
    title: "Concrete Works",
    description:
      "Offering a range of concrete services, from foundations to decorative finishes, for residential and commercial buildings.",
  },
  {
    icon: "fas fa-home",
    title: "Roofing Works",
    description:
      "Our roofing experts ensure reliable, long-lasting roofs, handling installations, repairs, and replacements.",
  },
  {
    icon: "fas fa-th-large",
    title: "Brick Wall Works",
    description:
      "We build and repair brick walls with precision, adding both structural integrity and aesthetic value to your property.",
  },
  {
    icon: "fa fa-paint-roller",
    title: "Plastering Works",
    description:
      "Our plastering services provide smooth, durable finishes for both interior and exterior surfaces, enhancing your space.",
  },
  {
    icon: "fa fa-thumbs-up",
    title: "Facade Works",
    description:
      "Transform the look of your building with our expert facade services, including restoration, installation, and cladding.",
  },
  {
    icon: "fa fa-umbrella",
    title: "Canopy System Works",
    description:
      "We design and install functional canopy systems, providing shelter and aesthetic appeal for your property.",
  },
  {
    icon: "fa fa-window-restore",
    title: "Ventilated Facade Works",
    description:
      "Our ventilated facades improve energy efficiency and airflow while adding a modern touch to your building’s exterior.",
  },
  {
    icon: "fas fa-border-all",
    title: "Tiling Works",
    description:
      "Our tiling services cover everything from floors to walls, offering a variety of styles and high-quality installations.",
  },
  {
    icon: "fa fa-paint-brush",
    title: "Decorative Coating Works",
    description:
      "We specialize in decorative coatings that enhance the look and feel of your space, combining beauty with protection.",
  },
  {
    icon: "fa fa-tools",
    title: "Renovation Works",
    description:
      "Our renovation services transform existing spaces, upgrading interiors and exteriors to meet modern standards.",
  },
  {
    icon: "fa fa-water",
    title: "Plumbing Works",
    description:
      "From installations to repairs, our plumbing services cover everything from pipes to fixtures, ensuring a well-functioning system.",
  },
  {
    icon: "fa fa-shield-alt",
    title: "Insulation Works",
    description:
      "We provide insulation solutions to improve energy efficiency, reduce noise, and create comfortable indoor environments.",
  },
  {
    icon: "fa fa-bolt",
    title: "Electrical Works",
    description:
      "Our licensed electricians offer reliable electrical installations, repairs, and maintenance for both residential and commercial properties.",
  },
];

export const valuesData = [
  {
    icon: "fas fa-star",
    title: "Excellence and Quality",
    description:
      "We make the best efforts with endless passion and a challenging spirit to meet and exceed every expectation, to become the best in every way.",
    color: "gray",
  },
  {
    icon: "fas fa-shield-alt",
    title: "Integrity & Security",
    description:
      "We fulfill our mission’s promise through behavior that reflects honesty, responsibility, & justice in action.",
    color: "yellow",
  },
  {
    icon: "fas fa-users",
    title: "Teamwork & Collaboration",
    description:
      "We work together towards a common goal, making what we do better and improving every day.",
    color: "orange",
  },
];

// Array me të gjithë projektet
export const projectsData = [
  {
    id: 1,
    titleKey: "tiranaCieloTitle",
    descriptionKey: "tiranaCieloDesc",
    image: tiranaCielo,
  },
  {
    id: 2,
    titleKey: "samiFrasheriTitle",
    descriptionKey: "samiFrasheriDesc",
    image: samiFrasheri,
  },
  {
    id: 3,
    titleKey: "lakeViewTitle",
    descriptionKey: "lakeViewDesc",
    image: lakeView,
  },
  {
    id: 4,
    titleKey: "deltaResidenceTitle",
    descriptionKey: "deltaResidenceDesc",
    image: deltaResidence,
  },
  {
    id: 5,
    titleKey: "katedraljaTitle",
    descriptionKey: "katedraljaDesc",
    image: katedraljaRingjallja,
  },
  {
    id: 6,
    titleKey: "hotelLuaniTitle",
    descriptionKey: "hotelLuaniDesc",
    image: hotelLuaniArte,
  },
  {
    id: 7,
    titleKey: "spaWellnessTitle",
    descriptionKey: "spaWellnessDesc",
    image: spaWellness,
  },
  {
    id: 8,
    titleKey: "aeroportiTitle",
    descriptionKey: "aeroportiDesc",
    image: aeroportiNeneTereza,
  },
];

// src/utils/Data.js
export const jobListings = [
  {
    titleKey: "constructionEngineerTitle",
    descriptionKey: "constructionEngineerDescription",
    location: "Tirana, Albania",
    responsibilities: [
      "responsibilityConstructionEngineer1",
      "responsibilityConstructionEngineer2",
      "responsibilityConstructionEngineer3",
      "responsibilityConstructionEngineer4",
    ],
    requirements: [
      "requirementConstructionEngineer1",
      "requirementConstructionEngineer2",
      "requirementConstructionEngineer3",
      "requirementConstructionEngineer4",
    ],
    deadline: "30/11/2025",
  },
  {
    titleKey: "constructionWorkerTitle",
    descriptionKey: "constructionWorkerDescription",
    location: "Tirana, Albania",
    responsibilities: [
      "responsibilityConstructionWorker1",
      "responsibilityConstructionWorker2",
      "responsibilityConstructionWorker3",
      "responsibilityConstructionWorker4",
    ],
    requirements: [
      "requirementConstructionWorker1",
      "requirementConstructionWorker2",
      "requirementConstructionWorker3",
      "requirementConstructionWorker4",
    ],
    deadline: "30/11/2025",
  },
  {
    titleKey: "constructionForemanTitle",
    descriptionKey: "constructionForemanDescription",
    location: "Tirana, Albania",
    responsibilities: [
      "responsibilityConstructionForeman1",
      "responsibilityConstructionForeman2",
      "responsibilityConstructionForeman3",
      "responsibilityConstructionForeman4",
    ],
    requirements: [
      "requirementConstructionForeman1",
      "requirementConstructionForeman2",
      "requirementConstructionForeman3",
      "requirementConstructionForeman4",
    ],
    deadline: "30/11/2025",
  },
  {
    titleKey: "constructionArchaeologistTitle",
    descriptionKey: "constructionArchaeologistDescription",
    location: "Tirana, Albania",
    responsibilities: [
      "responsibilityConstructionArchaeologist1",
      "responsibilityConstructionArchaeologist2",
      "responsibilityConstructionArchaeologist3",
      "responsibilityConstructionArchaeologist4",
    ],
    requirements: [
      "requirementConstructionArchaeologist1",
      "requirementConstructionArchaeologist2",
      "requirementConstructionArchaeologist3",
      "requirementConstructionArchaeologist4",
    ],
    deadline: "30/11/2025",
  },
  {
    titleKey: "architecturalDesignerTitle",
    descriptionKey: "architecturalDesignerDescription",
    location: "Tirana, Albania",
    responsibilities: [
      "responsibilityArchitecturalDesigner1",
      "responsibilityArchitecturalDesigner2",
      "responsibilityArchitecturalDesigner3",
      "responsibilityArchitecturalDesigner4",
    ],
    requirements: [
      "requirementArchitecturalDesigner1",
      "requirementArchitecturalDesigner2",
      "requirementArchitecturalDesigner3",
      "requirementArchitecturalDesigner4",
    ],
    deadline: "30/11/2025",
  },
  {
    titleKey: "projectCoordinatorTitle",
    descriptionKey: "projectCoordinatorDescription",
    location: "Tirana, Albania",
    responsibilities: [
      "responsibilityProjectCoordinator1",
      "responsibilityProjectCoordinator2",
      "responsibilityProjectCoordinator3",
      "responsibilityProjectCoordinator4",
    ],
    requirements: [
      "requirementProjectCoordinator1",
      "requirementProjectCoordinator2",
      "requirementProjectCoordinator3",
      "requirementProjectCoordinator4",
    ],
    deadline: "30/11/2025",
  },
  {
    titleKey: "structuralEngineerTitle",
    descriptionKey: "structuralEngineerDescription",
    location: "Tirana, Albania",
    responsibilities: [
      "responsibilityStructuralEngineer1",
      "responsibilityStructuralEngineer2",
      "responsibilityStructuralEngineer3",
      "responsibilityStructuralEngineer4",
    ],
    requirements: [
      "requirementStructuralEngineer1",
      "requirementStructuralEngineer2",
      "requirementStructuralEngineer3",
      "requirementStructuralEngineer4",
    ],
    deadline: "30/11/2025",
  },
  {
    titleKey: "installationForemanTitle",
    descriptionKey: "installationForemanDescription",
    location: "Tirana, Albania",
    responsibilities: [
      "responsibilityInstallationForeman1",
      "responsibilityInstallationForeman2",
      "responsibilityInstallationForeman3",
      "responsibilityInstallationForeman4",
    ],
    requirements: [
      "requirementInstallationForeman1",
      "requirementInstallationForeman2",
      "requirementInstallationForeman3",
      "requirementInstallationForeman4",
    ],
    deadline: "30/11/2025",
  },
];

export const objectTypes = [
  {
    id: 1,
    type: "Residential",
    qualityPrices: { first: 100, second: 90, third: 80 },
    workerCost: 20,
    transportCost: 10,
    discount: 5,
    tax: 18,
  },
  {
    id: 2,
    type: "House",
    qualityPrices: { first: 120, second: 110, third: 100 },
    workerCost: 25,
    transportCost: 12,
    discount: 7,
    tax: 20,
  },
  {
    id: 3,
    type: "Commercial",
    qualityPrices: { first: 150, second: 140, third: 130 },
    workerCost: 30,
    transportCost: 15,
    discount: 10,
    tax: 22,
  },
  {
    id: 4,
    type: "Industrial",
    qualityPrices: { first: 200, second: 180, third: 170 },
    workerCost: 35,
    transportCost: 20,
    discount: 12,
    tax: 25,
  },
];

//Features
export const featuresData = [
  {
    id: 1,
    image: highQualityImage,
    titleKey: "highQualityTitle",
    descriptionKey: "highQualityDesc",
  },
  {
    id: 2,
    image: timelyCompletionImage,
    titleKey: "timelyCompletionTitle",
    descriptionKey: "timelyCompletionDesc",
  },
  {
    id: 3,
    image: skilledTeamImage,
    titleKey: "skilledTeamTitle",
    descriptionKey: "skilledTeamDesc",
  },
  {
    id: 4,
    image: budgetFriendlyImage,
    titleKey: "budgetFriendlyTitle",
    descriptionKey: "budgetFriendlyDesc",
  },
  {
    id: 5,
    image: customerSatisfactionImage,
    titleKey: "customerSatisfactionTitle",
    descriptionKey: "customerSatisfactionDesc",
  },
];
//Materials
export const materials = [
  {
    name: "Wood",
    image: woodImage,
    description:
      "Premium quality wood for construction and design, offering durability and aesthetic appeal.",
  },
  {
    name: "Concrete",
    image: concreteImage,
    description:
      "High-grade concrete for strong foundations and sustainable structures.",
  },
  {
    name: "Steel",
    image: steelImage,
    description:
      "Robust and corrosion-resistant steel for architectural and industrial applications.",
  },
  {
    name: "Glass",
    image: glassImage,
    description:
      "Crystal-clear glass for modern and sleek designs, ensuring durability and style.",
  },
  {
    name: "Tiles",
    image: tilesImage,
    description:
      "Elegant tiles with diverse patterns, perfect for interior and exterior spaces.",
  },
  {
    name: "Granite",
    image: graniteImage,
    description:
      "Durable and elegant granite for countertops, flooring, and other construction needs.",
  },
  {
    name: "Brick",
    image: brickImage,
    description:
      "Reliable and affordable bricks for traditional and modern building projects.",
  },
  {
    name: "Marble",
    image: marbleImage,
    description: "Luxurious marble for sophisticated interiors and exteriors.",
  },
  {
    name: "Aluminum",
    image: aluminumImage,
    description:
      "Lightweight and versatile aluminum for construction and design.",
  },
  {
    name: "PVC",
    image: pvcImage,
    description: "Cost-effective and durable PVC for pipes, windows, and more.",
  },
  {
    name: "Sand",
    image: sandImage,
    description: "Clean and fine sand ideal for masonry and plastering.",
  },
  {
    name: "Cement",
    image: cementImage,
    description: "High-quality cement for strong and durable structures.",
  },
  {
    name: "Plasterboard",
    image: plasterboardImage,
    description:
      "Efficient and easy-to-install plasterboard for walls and ceilings.",
  },
  {
    name: "Asphalt",
    image: asphaltImage,
    description: "Reliable asphalt for durable and smooth roads and pavements.",
  },
  {
    name: "Insulation Materials",
    image: insulationImage,
    description:
      "Thermal and acoustic insulation for energy-efficient buildings.",
  },
  {
    name: "Roofing Materials",
    image: roofingImage,
    description:
      "Durable and weather-resistant roofing materials for all building types.",
  },
  {
    name: "Adhesives & Sealants",
    image: adhesivesImage,
    description:
      "High-quality adhesives and sealants for secure bonding and sealing.",
  },
  {
    name: "Ceramics",
    image: ceramicsImage,
    description:
      "Aesthetic and durable ceramics for interior and exterior applications.",
  },
  {
    name: "Gypsum",
    image: gypsumImage,
    description:
      "Versatile gypsum for walls, ceilings, and decorative applications.",
  },
  {
    name: "Paints & Coatings",
    image: paintsImage,
    description:
      "Wide range of paints and coatings for protective and decorative finishes.",
  },
  {
    name: "Pipes & Plumbing Materials",
    image: pipesImage,
    description:
      "Durable pipes and fittings for water supply and drainage systems.",
  },
  {
    name: "Electrical Materials",
    image: electricalImage,
    description:
      "Cables, switches, and other electrical materials for residential and industrial use.",
  },
  {
    name: "Timber",
    image: timberImage,
    description:
      "Natural and engineered timber for construction and furniture.",
  },
  {
    name: "Stone",
    image: stoneImage,
    description: "Natural stone for landscaping, paving, and structural use.",
  },
  {
    name: "Metal Sheets",
    image: metalSheetsImage,
    description:
      "High-quality metal sheets for roofing and industrial applications.",
  },
  {
    name: "Composite Materials",
    image: compositeImage,
    description:
      "Innovative composite materials for strength and lightweight construction.",
  },
  {
    name: "Fiber Cement Boards",
    image: fiberCementImage,
    description:
      "Durable and fire-resistant fiber cement boards for walls and cladding.",
  },
];
//Help
export const helpCategories = {
  projects: {
    icon: <Hammer size={20} />,
    titleKey: "Projects",
    faqKeys: [
      { q: "faq_project_1_q", a: "faq_project_1_a" },
      { q: "faq_project_2_q", a: "faq_project_2_a" },
      { q: "faq_project_3_q", a: "faq_project_3_a" },
      { q: "faq_project_4_q", a: "faq_project_4_a" },
      { q: "faq_project_5_q", a: "faq_project_5_a" },
      { q: "faq_project_6_q", a: "faq_project_6_a" },
    ],
  },
  payments: {
    icon: <DollarSign size={20} />,
    titleKey: "Payments",
    faqKeys: [
      { q: "faq_payment_1_q", a: "faq_payment_1_a" },
      { q: "faq_payment_2_q", a: "faq_payment_2_a" },
      { q: "faq_payment_3_q", a: "faq_payment_3_a" },
      { q: "faq_payment_4_q", a: "faq_payment_4_a" },
      { q: "faq_payment_5_q", a: "faq_payment_5_a" },
    ],
  },
  support: {
    icon: <Phone size={20} />,
    titleKey: "Support",
    faqKeys: [
      { q: "faq_support_1_q", a: "faq_support_1_a" },
      { q: "faq_support_2_q", a: "faq_support_2_a" },
      { q: "faq_support_3_q", a: "faq_support_3_a" },
      { q: "faq_support_4_q", a: "faq_support_4_a" },
      { q: "faq_support_5_q", a: "faq_support_5_a" },
    ],
  },
};
