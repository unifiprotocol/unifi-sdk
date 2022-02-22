import React from "react";
import { useNavigation } from "../../Navigation";
import { SidebarItemIcon, SidebarItemWrapper, SidebarWrapper } from "./Styles";

export const Sidebar: React.FC = ({ children }) => {
  const { sidebarOpen } = useNavigation();

  return <SidebarWrapper isOpen={sidebarOpen}>{children}</SidebarWrapper>;
};

export const SidebarItem: React.FC<{
  icon?: React.FC<{ size?: number }>;
  active?: boolean;
  id?: string;
}> = ({ children, icon: Icon, active, id }) => {
  return (
    <SidebarItemWrapper id={id} active={active ?? false}>
      {Icon && <SidebarItemIcon>{<Icon size={20} />}</SidebarItemIcon>}
      <span>{children}</span>
    </SidebarItemWrapper>
  );
};
