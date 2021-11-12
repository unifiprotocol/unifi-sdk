import React from "react";
import { BrandedHeader } from ".";
import { AiOutlineMenu as OpenSidebarIcon } from "react-icons/ai";

export default {
  title: "Components/BrandedHeader",
};
export const Default = () => {
  const leftControls = () => <OpenSidebarIcon />;

  return (
    <>
      <BrandedHeader {...{ leftControls }} />
      <h1>BrandedHeader</h1>
    </>
  );
};
