import { Button, Card, CardContent, TextField } from "@material-ui/core";
import { Blockchains } from "@unifiprotocol/core-sdk";
import { useConnection } from "../Hooks/useConnection";
import { useCallback, useEffect, useState } from "react";
import { GetTotalSupply } from "../UseCases/GetTotalSupply";
import { GetSymbol } from "../UseCases/GetSymbol";
import styled from "styled-components";

const Status = {
  Idle: "idle",
  Fetching: "fetching",
};

const UNFI_TOKEN_ADDR = {
  [Blockchains.Ethereum]: "0x441761326490cacf7af299725b6292597ee822c2",
  [Blockchains.Binance]: "0x728c5bac3c3e370e372fc4671f9ef6916b814d8b",
};
const FormField = styled.div`
  display: flex;
  align-items: baseline;
`;
export const Erc20Info = () => {
  const { adapter, blockchain } = useConnection();
  const [state, setState] = useState(Status.Idle);
  const [invalidTokenAddress, setInvalidTokenAddress] = useState(false);
  const [tokenData, setTokenData] = useState();
  const [tokenAddress, setTokenAddress] = useState(
    UNFI_TOKEN_ADDR[blockchain] || ""
  );

  const fetchTokenData = useCallback(async () => {
    if (invalidTokenAddress) {
      return;
    }
    setState(Status.Fetching);
    adapter.initializeToken(tokenAddress);
    const getTotalSupply = new GetTotalSupply({
      tokenAddress,
    });
    const getSymbol = new GetSymbol({
      tokenAddress,
    });
    const [totalSupply, symbol] = await Promise.all([
      getTotalSupply.execute(adapter),
      getSymbol.execute(adapter),
    ]).then((values) => values.map((v) => v.value));
    setTokenData({ totalSupply, symbol });
    setState(Status.Idle);
  }, [adapter, tokenAddress, setState, invalidTokenAddress]);

  const fetchDisabled = state !== Status.Idle || invalidTokenAddress;
  console.log(invalidTokenAddress);
  useEffect(() => {
    setInvalidTokenAddress(!adapter.isValidAddress(tokenAddress));
  }, [tokenAddress, adapter]);

  return (
    <Card elevation={1}>
      <CardContent>
        <h4>Query ERC20 Token data</h4>
        <FormField>
          <TextField
            error={invalidTokenAddress}
            onChange={(evt) => setTokenAddress(evt.target.value)}
            label="Token address"
            value={tokenAddress}
            helperText={invalidTokenAddress ? "Invalid token address" : ""}
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
        {tokenData && (
          <>
            <b>Symbol</b>: {tokenData.symbol}
            <br />
            <b>TotalSupply</b>: {tokenData.totalSupply}
          </>
        )}
      </CardContent>
    </Card>
  );
};
