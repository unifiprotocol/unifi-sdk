import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    UnifiTopMenu?: {
      $el: HTMLElement | undefined;
      insert: () => void;
    };
  }
}

export const UniversalNavigationHeader: React.FC = () => {
  const $bar = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.UnifiTopMenu?.$el) return;
    const script = document.createElement("script");
    script.src = "https://unifi-top-menu.pages.dev/bundle.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if ($bar.current) document.body.removeChild($bar.current);
    };
  }, []);

  return (
    <div
      ref={$bar}
      id="unfi-network-menu"
      data-theme="light"
      data-uselogo="false"
    ></div>
  );
};
