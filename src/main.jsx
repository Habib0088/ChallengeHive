import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/theme-variables.css";
import "./styles/scroll-animations.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router/dom";
import { router } from "./Route/Route.jsx";
import AuthProvider from "./Component/Context/AuthProvider/AuthProvider.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./Component/Authentication/Registration/Toast/ToastProvider.jsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
