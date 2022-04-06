import { useEffect } from "react";
import { Connectors } from "@unifiprotocol/core-sdk";
import { useAdapter } from "../../Adapter";
import Clocks from "../../Services/Clocks";
import { getStorageKey } from "../../Utils/ChainStorage";
import { BalancesUpdater } from "../../Balances/BalancesUpdater";
import { Notifications } from "../Notifications";

export const Updater = () => {
  const { connectOffline, connect, activeChain } = useAdapter();

  useEffect(() => {
    Clocks.start();
    return () => {
      Clocks.clear();
    };
  }, []);

  useEffect(() => {
    const lastConnector = getStorageKey(activeChain.blockchain, "CONNECTOR");
    if (lastConnector) {
      connect(lastConnector as Connectors);
    } else {
      connectOffline();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BalancesUpdater />
      <Notifications />
    </>
  );
};
