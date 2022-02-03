import React from "react";
import {
  BrandedHeader,
  UnifiThemeProvider,
  Themes,
  NavigationHeader,
} from "@unifiprotocol/uikit";
import { IConnector } from "@unifiprotocol/core-sdk";
import { ConnectionAction } from "./Components/ConnectionAction";
import { AdapterProvider, useAdapter } from "./Adapter";
import { BlockchainAction } from "./Components/BlockchainAction";
import { Updater } from "./Components/Updater";
import { BalancesProvider, BalancesState, useBalances } from "./Balances";

export type ShellWrappedComp = React.FC<
  {
    connection: IConnector;
  } & BalancesState
>;

export const Shell: React.FC<{
  Wrapped?: ShellWrappedComp;
  sidebar?: React.FC<any>[];
}> = ({ Wrapped, sidebar = [] }) => {
  return (
    <BalancesProvider>
      <AdapterProvider>
        <UnifiThemeProvider theme={Themes.Dark}>
          <NavigationHeader />
          <BrandedHeader>
            <BlockchainAction />
            <ConnectionAction />
          </BrandedHeader>
          <Updater />
          {Wrapped && <ConnectedComp Wrapped={Wrapped} />}
        </UnifiThemeProvider>
      </AdapterProvider>
    </BalancesProvider>
  );
};

const ConnectedComp: React.FC<{ Wrapped: ShellWrappedComp }> = ({
  Wrapped,
}) => {
  const { connector } = useAdapter();
  const { balances } = useBalances();
  return <Wrapped connection={connector} balances={balances} />;
};

export default Shell;
