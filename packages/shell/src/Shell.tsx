import React from "react";
import {
  UnifiThemeProvider,
  Themes,
  NavigationHeader,
} from "@unifiprotocol/uikit";
import { IConnector } from "@unifiprotocol/core-sdk";
import { AdapterProvider, useAdapter } from "./Adapter";
import { ShellEventBus } from "./EventBus";
import { Updater } from "./Components/Updater";
import { BalancesProvider, BalancesState, useBalances } from "./Balances";
import { TopHeader } from "./Components/TopHeader";

export type ShellWrappedComp = React.FC<
  {
    connection: IConnector;
    eventBus: typeof ShellEventBus;
  } & BalancesState
>;

export const Shell: React.FC<{
  Wrapped?: ShellWrappedComp;
  sidebar?: React.FC<any>[];
}> = ({ Wrapped, sidebar = [] }) => {
  return (
    <UnifiThemeProvider theme={Themes.Dark}>
      <BalancesProvider>
        <AdapterProvider>
          <Updater />
          <NavigationHeader />
          <TopHeader />
          <ConnectedComp Wrapped={Wrapped} />
        </AdapterProvider>
      </BalancesProvider>
    </UnifiThemeProvider>
  );
};

const ConnectedComp: React.FC<{ Wrapped?: ShellWrappedComp }> = ({
  Wrapped,
}) => {
  const { connector } = useAdapter();
  const { balances } = useBalances();
  return Wrapped ? (
    <Wrapped
      eventBus={ShellEventBus}
      connection={connector}
      balances={balances}
    />
  ) : null;
};

export default Shell;
