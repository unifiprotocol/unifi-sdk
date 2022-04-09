import React, { useCallback } from "react";
import { useNavigation } from "../../Navigation";
import { SidebarItemIcon, SidebarItemWrapper, SidebarWrapper } from "./Styles";
import { UnfiPrice } from "./UnfiPrice";

export const Sidebar: React.FC = ({ children }) => {
  const { sidebarOpen } = useNavigation();

  return (
    <SidebarWrapper isOpen={sidebarOpen}>
      {children}
      <UnfiPrice />
    </SidebarWrapper>
  );
};

export const SidebarItem: React.FC<{
  icon?: React.FC<{ size?: number }>;
  active?: boolean;
  id?: string;
  onClick?: () => void;
}> = ({ children, icon: Icon, active, id, onClick }) => {
  const onClickWrapper = useCallback(() => {
    return onClick && onClick();
  }, [onClick]);

  return (
    <SidebarItemWrapper
      onClick={onClickWrapper}
      icon={Icon}
      id={id}
      active={active ?? false}
    >
      {Icon && <SidebarItemIcon>{<Icon size={20} />}</SidebarItemIcon>}
      <span>{children}</span>
    </SidebarItemWrapper>
  );
};
