import React, { useEffect } from "react";

declare global {
  interface Window {
    UnifiTopMenu?: {
      $el: HTMLElement;
      insert: () => void;
    };
  }
}

export const UniversalNavigationHeader: React.FC = () => {
  useEffect(() => {
    if (window.UnifiTopMenu?.$el) return;
    const script = document.createElement("script");
    script.src = "https://unifi-top-menu.pages.dev/bundle.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div id="unfi-network-menu" data-theme="light" data-uselogo="false"></div>
    </>
  );
};
