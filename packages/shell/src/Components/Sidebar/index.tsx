import React from "react";
import { useNavigation } from "../../Navigation";
import { SidebarWrapper } from "./Styles";

export const Sidebar = () => {
  const { sidebarOpen } = useNavigation();

  return <SidebarWrapper isOpen={sidebarOpen}>Soy un sidebar</SidebarWrapper>;
};
