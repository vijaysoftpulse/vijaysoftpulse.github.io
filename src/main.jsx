import { createRoot } from "react-dom/client";
import router from "./Routes";
import en from "@shopify/polaris/locales/en.json";
import { RouterProvider } from "@tanstack/react-router";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";

createRoot(document.getElementById("root")).render(
  <AppProvider i18n={en}>
    <RouterProvider router={router} />
  </AppProvider>
);
