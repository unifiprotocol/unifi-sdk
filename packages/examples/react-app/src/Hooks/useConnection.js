import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { AppState } from "../State";

export const useConnection = () => {
  const [{ adapter, connector }, setAppState] = useRecoilState(AppState);

  const setConnector = useCallback(
    (connector) => setAppState((s) => ({ ...s, connector })),
    [setAppState]
  );
  const setAdapter = useCallback(
    (adapter) => setAppState((s) => ({ ...s, adapter })),
    [setAppState]
  );

  return {
    adapter,
    connector,
    setConnector,
    setAdapter,
  };
};
