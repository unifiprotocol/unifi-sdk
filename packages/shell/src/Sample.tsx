import React, { useEffect } from "react";
import { useAdapter } from "./Adapter";
import { useBalances } from "./Balances";
import { ShellWrappedComp } from "./Shell";

export const Sample: ShellWrappedComp = ({ connection }) => {
  const { balances, addToken } = useBalances();
  console.log("🚀 ~ file: Sample.tsx ~ line 8 ~ balances", balances);
  const { activeChain } = useAdapter();

  useEffect(() => {
    addToken(activeChain.wrappedToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const address = connection?.adapter?.adapter.isConnected() ? (
    <h1>{connection?.adapter?.adapter.getAddress()}</h1>
  ) : (
    <h1>Not Connected</h1>
  );

  return (
    <div>
      {address}
      <div>Balances</div>
      <pre>{JSON.stringify(balances, null, 4)}</pre>
    </div>
  );
};
