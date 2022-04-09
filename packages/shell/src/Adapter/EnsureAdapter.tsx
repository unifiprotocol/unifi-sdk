import { Connectors } from "@unifiprotocol/core-sdk";
import { CgSpinner } from "@unifiprotocol/uikit";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAdapter } from ".";
import { getStorageKey } from "../Utils/ChainStorage";

const ConnectingAdapter = styled.div`
  margin: 2rem;
  color: ${(p) => p.theme.primary};
`;

export const EnsureAdapter: React.FC = ({ children }) => {
  const { connect, connectOffline, activeChain, isAdapterReady } = useAdapter();
  useEffect(() => {
    const lastConnector = getStorageKey<Connectors>(
      activeChain.blockchain,
      "CONNECTOR"
    );
    if (lastConnector) {
      connect(lastConnector);
    } else {
      connectOffline();
    }
  }, [activeChain.blockchain, connect, connectOffline]);

  const [secondsWaiting, setSecondsWaiting] = useState(0);

  useEffect(() => {
    if (isAdapterReady) {
      return;
    }
    setTimeout(() => setSecondsWaiting(secondsWaiting + 1), 1000);
  }, [secondsWaiting, isAdapterReady]);

  const dots = (secondsWaiting % 3) + 1;

  if (!isAdapterReady) {
    if (secondsWaiting < 1) {
      return <></>;
    }
    return (
      <ConnectingAdapter>
        <CgSpinner size={20} /> Connecting{".".repeat(dots)}
      </ConnectingAdapter>
    );
  }
  return <>{children}</>;
};
