import { useEffect } from "react";
import Clocks from "../../Services/Clocks";
import { BalancesUpdater } from "../../Balances/BalancesUpdater";
import { Notifications } from "../Notifications";

export const Updater = () => {
  useEffect(() => {
    Clocks.start();
    return () => {
      Clocks.clear();
    };
  }, []);

  return (
    <>
      <BalancesUpdater />
      <Notifications />
    </>
  );
};
