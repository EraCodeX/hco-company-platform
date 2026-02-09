/* ===============================
   MOCK FIREBASE 
   =============================== */

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(() => ({
    getProvider: jest.fn(() => ({})),
  })),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({})),
  collection: jest.fn(),
  doc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
  getDocs: jest.fn(async () => ({ docs: [] })),
  addDoc: jest.fn(async () => ({})),
  setDoc: jest.fn(async () => ({})),
  updateDoc: jest.fn(async () => ({})),
  deleteDoc: jest.fn(async () => ({})),
  onSnapshot: jest.fn(() => jest.fn()),
  serverTimestamp: jest.fn(() => new Date()),
}));

jest.mock("firebase/messaging", () => ({
  getMessaging: jest.fn(() => ({})),
  getToken: jest.fn(async () => "test-token"),
  onMessage: jest.fn(),
}));

/* ===============================
   IMPORTS
   =============================== */

import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

/* ===============================
 MOCK HEAVY COMPONENTS
   =============================== */

jest.mock("./components/CookieConsent", () => () => <div>CookieConsent</div>);
jest.mock("./components/DisableBrowserBack", () => () => <div>DisableBrowserBack</div>);

// Mock pages
jest.mock("./pages/home/HomePage", () => () => <h1>Home Page</h1>);
jest.mock("./pages/projects/Projects", () => () => <h1>Projects Page</h1>);
jest.mock("./pages/projects/BuildCostPro", () => () => <h1>Build Cost Pro</h1>);

// Providers 
jest.mock("./context/AuthContext", () => ({
  AuthProvider: ({ children }) => <div>{children}</div>,
}));

jest.mock("./context/LanguageContext", () => ({
  LanguageProvider: ({ children }) => <div>{children}</div>,
}));

/* ===============================
 TESTS (App has BrowserRouter inside)
   =============================== */

describe("App routing tests", () => {
  beforeEach(() => {
    // Cleans URL for each test
    window.history.pushState({}, "", "/");
  });

  test("renders HomePage on /", () => {
    window.history.pushState({}, "Home", "/");

    render(<App />);

    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  test("renders Projects page on /projects", () => {
    window.history.pushState({}, "Projects", "/projects");

    render(<App />);

    expect(screen.getByText("Projects Page")).toBeInTheDocument();
  });

  test("renders BuildCostPro on /buildcostpro", () => {
    window.history.pushState({}, "BuildCostPro", "/buildcostpro");

    render(<App />);

    expect(screen.getByText("Build Cost Pro")).toBeInTheDocument();
  });
});
