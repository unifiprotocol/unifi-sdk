import React from "react";
import { ShellWrappedComp } from "./Shell";

export const Sample: ShellWrappedComp = ({ connection }) => {
  return connection?.adapter?.adapter.isConnected() ? (
    <h1>{connection?.adapter?.adapter.getAddress()}</h1>
  ) : (
    <h1>Not Connected</h1>
  );
};
