import { Button, Card, CardContent, TextField } from "@material-ui/core";
import { Blockchains, MulticallAdapter } from "@unifiprotocol/core-sdk";
import { useConnection } from "../Hooks/useConnection";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GetTotalSupply } from "../UseCases/GetTotalSupply";
import styled from "styled-components";
import { GetName } from "../UseCases/GetName";
import { GetSymbol } from "../UseCases/GetSymbol";
import { GetDecimals } from "../UseCases/GetDecimals";

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

  const multicall = useMemo(() => new MulticallAdapter(adapter), [adapter]);

  const fetchTokenData = useCallback(async () => {
    try {
      if (invalidTokenAddress) {
        return;
      }
      setState(Status.Fetching);
      adapter.initializeToken(tokenAddress);

      const [totalSupply, symbol, name, decimals] = await multicall
        .execute([
          new GetTotalSupply({
            tokenAddress,
          }),
          new GetSymbol({
            tokenAddress,
          }),
          new GetName({
            tokenAddress,
          }),
          new GetDecimals({
            tokenAddress,
          }),
        ])
        .then((results) => {
          debugger;
          return results.map((res) => res.value);
        });
      setTokenData({ totalSupply, symbol, name, decimals });

      setState(Status.Idle);
    } catch (error) {
      setState(Status.Idle);
      console.error(error);
    }
  }, [adapter, tokenAddress, setState, invalidTokenAddress, multicall]);

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
