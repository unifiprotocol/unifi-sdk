import { useEffect } from "react";
import { Connectors } from "@unifiprotocol/core-sdk";
import { useAdapter } from "../../Adapter";
import { getStorageKey } from "../../Utils/ChainStorage";

export const Updater = () => {
  const { connectOffline, connect, activeChain } = useAdapter();

  useEffect(() => {
    const lastConnector = getStorageKey(activeChain.blockchain, "CONNECTOR");
    if (lastConnector) {
      connect(lastConnector as Connectors);
    } else {
      connectOffline();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};
