import { Card, CardContent, Grid } from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";
import { useConnection } from "../Hooks/useConnection";

export const OnlinePanel = () => {
  const { adapter } = useConnection();
  const [balance, setBalance] = useState(0);
  const { address, addressLink } = useMemo(() => {
    let address, addressLink;

    if (adapter) {
      address = adapter.getAddress();
      addressLink = adapter.getAddressLink(address);
    }
    return { address, addressLink };
  }, [adapter]);

  useEffect(() => {
    if (!adapter) return;
    adapter.getBalance().then(({ balance }) => {
      setBalance(adapter.nativeToken.toFactorized(balance, 4));
    });
  }, [adapter, setBalance]);

  if (!adapter) {
    return (
      <Card elevation={0}>
        <CardContent>Connect to start interacting</CardContent>
      </Card>
    );
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card elevation={1}>
          <CardContent>
            <h4>Your address</h4>
            <a href={addressLink}>{address}</a>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card elevation={1}>
          <CardContent>
            <h4>Your balance</h4>
            {balance}
            {adapter.nativeToken.symbol}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
