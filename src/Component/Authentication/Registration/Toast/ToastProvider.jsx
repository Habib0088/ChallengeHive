import {  useState, useEffect } from "react";
import { registerToast } from "./toast";

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const show = (msg, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  useEffect(() => {
    registerToast(show); // register global function
  }, []);

  return (
    <>
      {children}

      <div className="fixed top-4 right-4 space-y-3 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-12 py-2 text-white rounded-xl shadow animate-slide-in
              ${t.type === "success" ? "bg-green-500" : ""}
              ${t.type === "error" ? "bg-red-500" : ""}
              ${t.type === "info" ? "bg-blue-500" : ""}
            `}
          >
            {t.msg}
          </div>
        ))}
      </div>
    </>
  );
}
