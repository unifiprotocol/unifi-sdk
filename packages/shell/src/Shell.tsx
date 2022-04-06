import React from "react";
import styled from "styled-components";
import {
  UnifiThemeProvider,
  Themes,
  NavigationHeader,
  mediaQueries,
} from "@unifiprotocol/uikit";
import { IConnector } from "@unifiprotocol/core-sdk";
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

export type ShellWrappedProps = {
  connection: IConnector;
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
                    {SidebarComps.length > 0 && (
                      <Sidebar>
                        {SidebarComps.map((Comp, idx) => (
                          <ConnectedComp Wrapped={Comp} key={idx} />
                        ))}
                      </Sidebar>
                    )}
                    <ConnectedComp Wrapped={Wrapped} />
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
  const { connector } = useAdapter();
  const { balances, refreshing } = useBalances();
  return Wrapped ? (
    <Wrapped
      eventBus={ShellEventBus}
      connection={connector}
      balances={balances}
      refreshingBalances={refreshing}
      i18n={i18n}
    />
  ) : null;
};

export default Shell;
