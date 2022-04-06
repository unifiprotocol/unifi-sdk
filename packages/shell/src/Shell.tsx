import React from "react";
import styled from "styled-components";
import {
  UnifiThemeProvider,
  Themes,
  NavigationHeader,
  mediaQueries,
} from "@unifiprotocol/uikit";
import {
  IAdapter,
  IConnector,
  IMulticallAdapter,
} from "@unifiprotocol/core-sdk";
import { AdapterProvider, useAdapter } from "./Adapter";
import { ShellEventBus } from "./EventBus";
import { Updater } from "./Components/Updater";
import { BalancesProvider, BalancesState, useBalances } from "./Balances";
import { TopHeader } from "./Components/TopHeader";
import { Sidebar } from "./Components/Sidebar";
import { NavigationProvider } from "./Navigation";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { BrowserRouter } from "react-router-dom";
import { EnsureAdapter } from "./Adapter/EnsureAdapter";

export type ShellWrappedProps = {
  connection: IConnector;
  adapter: IAdapter;
  multicallAdapter: IMulticallAdapter;
  eventBus: typeof ShellEventBus;
  // TODO breaking change: pass whole state in balances prop
  balances: BalancesState["balances"];
  refreshingBalances: BalancesState["refreshing"];
  i18n: typeof i18n;
};

export type ShellWrappedComp = React.FC<ShellWrappedProps>;

const ShellWrapper = styled.div`
  ${mediaQueries.xs} {
    max-width: 100vw;
    overflow: hidden;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
`;
export interface ShellProps {
  Wrapped?: ShellWrappedComp;
  Sidebar?: ShellWrappedComp[];
}

export const Shell: React.FC<ShellProps> = ({
  Wrapped,
  Sidebar: SidebarComps = [],
}) => {
  return (
    <BrowserRouter>
      <AdapterProvider>
        <BalancesProvider>
          <I18nextProvider i18n={i18n}>
            <UnifiThemeProvider theme={Themes.Dark}>
              <ShellWrapper>
                <NavigationProvider>
                  <Updater />
                  <NavigationHeader />
                  <TopHeader />
                  <ContentWrapper>
                    <EnsureAdapter>
                      {SidebarComps.length > 0 && (
                        <Sidebar>
                          {SidebarComps.map((Comp, idx) => (
                            <ConnectedComp Wrapped={Comp} key={idx} />
                          ))}
                        </Sidebar>
                      )}
                      <ConnectedComp Wrapped={Wrapped} />
                    </EnsureAdapter>
                  </ContentWrapper>
                </NavigationProvider>
              </ShellWrapper>
            </UnifiThemeProvider>
          </I18nextProvider>
        </BalancesProvider>
      </AdapterProvider>
    </BrowserRouter>
  );
};

const ConnectedComp: React.FC<{ Wrapped?: ShellWrappedComp }> = ({
  Wrapped,
}) => {
  const { isAdapterReady, connector, adapter, multicallAdapter } = useAdapter();
  const { balances, refreshing } = useBalances();
  if (!isAdapterReady) {
    return <>"Loading"</>;
  }

  return Wrapped ? (
    <Wrapped
      eventBus={ShellEventBus}
      adapter={adapter!}
      multicallAdapter={multicallAdapter!}
      connection={connector!}
      balances={balances}
      refreshingBalances={refreshing}
      i18n={i18n}
    />
  ) : null;
};

export default Shell;
