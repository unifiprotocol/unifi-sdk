import { useCallback } from "react";
import { PrimaryButton } from "@unifiprotocol/uikit";
import { useAdapter } from "./Adapter";
import { useBalances } from "./Balances";
import { AddCurrency, RefreshBalances } from "./EventBus/Events/BalancesEvents";
import { ShowNotification } from "./EventBus/Events/NotificationEvents";
import { ShellWrappedComp } from "./Shell";

export const Sample: ShellWrappedComp = ({ connection, eventBus }) => {
  const { balances } = useBalances();
  const { activeChain } = useAdapter();

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

  const address = connection?.adapter?.adapter.isConnected() ? (
    <h1>{connection?.adapter?.adapter.getAddress()}</h1>
  ) : (
    <h1>Not Connected</h1>
  );

  return (
    <div>
      {address}
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
      <div>Balances</div>
      <pre>{JSON.stringify(balances, null, 4)}</pre>
    </div>
  );
};
