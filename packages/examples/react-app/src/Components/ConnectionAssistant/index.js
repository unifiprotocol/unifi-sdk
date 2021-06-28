import { Button, Paper, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import styled from "styled-components";
import {
  Blockchains,
  connectorFactory,
  getBlockchainWalletConnectors,
} from "@unifiprotocol/core-sdk";
import { useCallback, useEffect, useState } from "react";
import { useConnection } from "../../Hooks/useConnection";

import { Selector } from "../Selector";
import {
  Step,
  StepNum,
  StepAction,
  StepContent,
  StepperWrapper,
} from "./Styles";

const blockchains = [
  Blockchains.Binance,
  Blockchains.Ethereum,
  Blockchains.EthereumRopsten,
  Blockchains.Harmony,
].map((v) => [v, v]);

const ConnectionAssistantWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const ConnectionAssistant = () => {
  const {
    setAdapter,
    setConnector,
    setBlockchain,
    blockchain,
    connector,
    adapter,
  } = useConnection();
  const [wallets, setWallets] = useState([]);
  const [wallet, selectWallet] = useState();
  const [message, setMessage] = useState();
  const disableConnect = !wallet || adapter;

  const onBlockchainChange = useCallback(() => {
    if (!blockchain) return;
    const chainWallets = getBlockchainWalletConnectors(blockchain);
    setWallets(
      chainWallets.map((wallet) => [
        wallet.name,
        <>
          <img
            alt={wallet.displayName}
            style={{ width: "1rem", marginRight: "0.2rem" }}
            src={wallet.logoURI}
          />
          {wallet.displayName}{" "}
        </>,
      ])
    );
    selectWallet(undefined);
  }, [blockchain]);

  const onWalletChange = useCallback(() => {
    if (!wallet) return;

    setConnector(connectorFactory(blockchain, wallet));
  }, [blockchain, wallet, setConnector]);

  const connect = useCallback(async () => {
    if (!connector) return;
    await connector
      .connect()
      .then(setAdapter)
      .then(() =>
        setMessage({ message: "Connected successfuly", severity: "success" })
      )
      .catch((error) => {
        setMessage({ message: error.message, severity: "error" });
      });
  }, [connector, setAdapter]);
  const disconnect = useCallback(() => {
    connector.disconnect();
    setAdapter();
    setBlockchain();
    selectWallet();
  }, [setAdapter, setBlockchain, selectWallet, connector]);
  useEffect(onBlockchainChange, [onBlockchainChange]);
  useEffect(onWalletChange, [onWalletChange]);

  return (
    <ConnectionAssistantWrapper>
      <Paper elevation={1}>
        <StepperWrapper>
          <Step>
            <StepNum active={!!blockchain}>1</StepNum>
            <StepContent>
              <StepAction>
                <Selector
                  options={blockchains}
                  onChange={setBlockchain}
                  placeholder="Select blockchain"
                  value={blockchain}
                />
              </StepAction>
            </StepContent>
          </Step>
          <Step>
            <StepNum active={!!wallet}>2</StepNum>
            <StepContent>
              <StepAction>
                <Selector
                  value={wallet}
                  options={wallets}
                  onChange={selectWallet}
                  placeholder="Select wallet"
                />
              </StepAction>
            </StepContent>
          </Step>
          <Step>
            <StepNum active={!!adapter}>3</StepNum>
            <StepContent>
              <StepAction>
                {!adapter ? (
                  <Button
                    disabled={disableConnect}
                    variant="contained"
                    color="primary"
                    onClick={connect}
                  >
                    Connect
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={disconnect}
                  >
                    Disconnect
                  </Button>
                )}
              </StepAction>
            </StepContent>
          </Step>
        </StepperWrapper>
      </Paper>
      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={() => setMessage()}
      >
        {message && (
          <MuiAlert
            elevation={6}
            onClose={() => setMessage()}
            severity={message.severity}
          >
            {message.message}
          </MuiAlert>
        )}
      </Snackbar>
    </ConnectionAssistantWrapper>
  );
};
