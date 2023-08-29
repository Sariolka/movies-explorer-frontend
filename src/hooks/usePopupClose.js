import { useEffect } from "react";

export function usePopupClose(isOpenNavMenu, onClose) {
  useEffect(() => {
    if (!isOpenNavMenu) return;

    const handleOverlay = (event) => {
      if (event.target.classList.contains("burger__overlay")) {
        onClose();
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlay);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [isOpenNavMenu, onClose]);
}
