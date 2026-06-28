import { createRoot } from "react-dom/client";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import App from "./App.tsx";
import "./index.css";
// 1. Ye line add karein
import { inject } from "@vercel/analytics";

// 2. Analytics ko initialize karein
inject();

createRoot(document.getElementById("root")!).render(<App />);