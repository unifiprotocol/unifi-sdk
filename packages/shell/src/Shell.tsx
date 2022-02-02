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

export type ShellWrappedComp = React.FC<{
  connection: IConnector;
}>;

export const Shell: React.FC<{
  Wrapped?: ShellWrappedComp;
  sidebar?: React.FC<any>[];
}> = ({ Wrapped, sidebar = [] }) => {
  return (
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
  );
};

const ConnectedComp: React.FC<{ Wrapped: ShellWrappedComp }> = ({
  Wrapped,
}) => {
  const { connector } = useAdapter();
  return <Wrapped connection={connector} />;
};

export default Shell;
