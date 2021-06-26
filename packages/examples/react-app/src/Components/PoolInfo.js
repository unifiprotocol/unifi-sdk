import { Button, Card, CardContent, TextField } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { GetPoolData } from "../UseCases/GetPoolData";
import { useConnection } from "../Hooks/useConnection";
import {
  Blockchains,
  OfflineConnectors,
  connectorFactory,
} from "@unifiprotocol/core-sdk";

const Status = {
  Idle: "idle",
  Fetching: "fetching",
};

const FormField = styled.div`
  display: flex;
  align-items: baseline;
`;
export const PoolInfo = () => {
  const { blockchain } = useConnection();

  const [adapter, setAdapter] = useState();
  useEffect(() => {
    const connector = connectorFactory(
      blockchain,
      blockchain === Blockchains.Binance
        ? OfflineConnectors.BscDataSeed
        : OfflineConnectors.Cloudflare
    );
    connector.connect().then(setAdapter);
  }, [blockchain]);

  const [state, setState] = useState(Status.Idle);
  const [pool, setPool] = useState(null);
  const [tokenAAddress, setTokenAAddress] = useState(
    "0x728c5bac3c3e370e372fc4671f9ef6916b814d8b"
  );
  const [tokenBAddress, setTokenBAddress] = useState(
    "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
  );
  const [pairAddress, setPairAddress] = useState(
    "0x76AE2c33bcce5A45128eF2060C6280a452568396"
  );

  const fetchTokenData = useCallback(async () => {
    setState(Status.Fetching);
    try {
      const res = await new GetPoolData({
        tokenAAddress,
        tokenBAddress,
        pairAddress,
      }).execute(adapter);
      setPool(res);
    } catch (error) {
      setState(Status.Idle);
      console.error(error);
    }
    setState(Status.Idle);
  }, [adapter, tokenAAddress, tokenBAddress, pairAddress, setState]);

  const fetchDisabled = state !== Status.Idle || !adapter;

  return (
    <Card elevation={1}>
      <CardContent>
        <h4>Query ERC20 Token data</h4>
        <FormField>
          <TextField
            onChange={(evt) => setTokenAAddress(evt.target.value)}
            label="Token A address"
            value={tokenAAddress}
          />
          <TextField
            onChange={(evt) => setTokenBAddress(evt.target.value)}
            label="Token B address"
            value={tokenBAddress}
          />
          <TextField
            onChange={(evt) => setPairAddress(evt.target.value)}
            label="Pair address"
            value={pairAddress}
          />

          <Button
            disabled={fetchDisabled}
            variant="contained"
            color="primary"
            elevation={1}
            onClick={fetchTokenData}
          >
            {state === Status.Idle && "Fetch"}
            {state === Status.Fetching && "Fetching..."}
          </Button>
        </FormField>
        {pool && (
          <>
            <b>Balance A</b>: {pool.balanceA} {pool.symbolA}
            <br />
            <b>Balance B</b>: {pool.balanceB} {pool.symbolB}
          </>
        )}
      </CardContent>
    </Card>
  );
};
