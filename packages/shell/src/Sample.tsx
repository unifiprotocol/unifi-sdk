import { useCallback } from "react";
import { BiHome, PrimaryButton } from "@unifiprotocol/uikit";
import { useAdapter } from "./Adapter";
import { useBalances } from "./Balances";
import { AddCurrency, RefreshBalances } from "./EventBus/Events/BalancesEvents";
import { ShowNotification } from "./EventBus/Events/NotificationEvents";
import { ShellWrappedComp } from "./Shell";
import { SidebarItem } from "./Components/Sidebar";
import { useTranslation } from "react-i18next";
import { OpenNetworkModal } from "./EventBus/Events/UIEvents";

export const Sample: ShellWrappedComp = ({ connection, eventBus }) => {
  const { balances } = useBalances();
  const { activeChain } = useAdapter();
  const { i18n } = useTranslation();

  const onAddWrappedToken = useCallback(() => {
    eventBus.emit(new AddCurrency(activeChain.wrappedToken));
    setTimeout(() => eventBus.emit(new RefreshBalances()));
  }, [activeChain.wrappedToken, eventBus]);

  const onShowNotification = useCallback(() => {
    eventBus.emit(
      new ShowNotification({
        content: "Hola!",
        appearance: "success",
      })
    );
  }, [eventBus]);

  const onOpenModal = useCallback(() => {
    eventBus.emit(new OpenNetworkModal());
  }, [eventBus]);

  const address = connection?.adapter?.adapter.isConnected() ? (
    <p>{connection?.adapter?.adapter.getAddress()}</p>
  ) : (
    <p>Not Connected</p>
  );

  return (
    <div>
      {address}
      <p>Language: {i18n.language}</p>
      <div>
        <PrimaryButton onClick={onAddWrappedToken}>
          Add Wrapped Token
        </PrimaryButton>
      </div>
      <div>
        <PrimaryButton onClick={onShowNotification}>
          Show Notification
        </PrimaryButton>
      </div>
      <div>
        <PrimaryButton onClick={onOpenModal}>
          Open Network Modal By Event
        </PrimaryButton>
      </div>
      <div>Balances</div>
      <pre>{JSON.stringify(balances, null, 4)}</pre>
    </div>
  );
};

export const SampleSidebar = () => {
  return (
    <>
      <SidebarItem icon={BiHome}>Exchange</SidebarItem>
      <SidebarItem icon={BiHome}>Liquidity</SidebarItem>
      <SidebarItem icon={BiHome}>UP</SidebarItem>
      <SidebarItem>Test</SidebarItem>
      <div>Test #2</div>
    </>
  );
};
