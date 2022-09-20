import { useCallback } from "react";
import { BiHome, PrimaryButton } from "@unifiprotocol/uikit";
import { useAdapter } from "./Adapter/useAdapter";
import { useBalances } from "./Balances/useBalances";
import { AddCurrency, RefreshBalances } from "./EventBus/Events/BalancesEvents";
import { ShowNotification } from "./EventBus/Events/NotificationEvents";
import { ShellWrappedComp } from "./Shell";
import { SidebarItem } from "./Components/Sidebar";
import { useTranslation } from "react-i18next";
import { OpenNetworkModal } from "./EventBus/Events/UIEvents";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Blockchains } from "@unifiprotocol/core-sdk";
import ERC20Artifact from "./Contracts/ABI/ERC20.json";
import { Currency } from "@unifiprotocol/utils";
import { Approve } from "./Contracts/ERC20/approve";

const binanceTokens: Currency[] = JSON.parse(
  '[{"decimals":9,"symbol":"SAFEMARS","name":"SafeMars","address":"0x3aD9594151886Ce8538C1ff615EFa2385a8C3A88"},{"decimals":18,"symbol":"WBNB","name":"Wrapped BNB","address":"0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},{"decimals":18,"symbol":"bBzB","name":"BlazarBits","address":"0x195De011a1F5bf44b64A9474C62dA964F68CD34f"},{"decimals":4,"symbol":"TLM","name":"Alien Worlds Trilium","address":"0x2222227E22102Fe3322098e4CBfE18cFebD57c95"},{"decimals":18,"symbol":"ORAI","name":"Oraichain Token","address":"0xA325Ad6D9c92B55A3Fc5aD7e412B1518F96441C0"},{"decimals":8,"symbol":"bGL","name":"Green Light ERC20","address":"0x4e5A337D646323df39EECaF44454A88E9EFA14Da"},{"decimals":18,"symbol":"BUSD","name":"BUSD Token","address":"0xe9e7cea3dedca5984780bafc599bd69add087d56"},{"decimals":18,"symbol":"UNFI","name":"UNFI","address":"0x728c5bac3c3e370e372fc4671f9ef6916b814d8b"},{"decimals":6,"symbol":"MBTC","name":"MemeBitCoin","address":"0xd38c167f158ba405B39e022d31268D56EA70d75b"},{"decimals":18,"symbol":"BUSD","name":"BUSD Token","address":"0x72206dEd3B30d14470dFc9a0Af9c43bDaD98C939"},{"decimals":18,"symbol":"ADX","name":"AdEx Network","address":"0x6bfF4Fb161347ad7de4A625AE5aa3A1CA7077819"},{"decimals":8,"symbol":"DL1","name":"DL1","address":"0xC2816D9eAf026da4D36fA39Eaadb1fEeAF4c0BF8"},{"decimals":3,"symbol":"CT1","name":"CT1","address":"0xc5Da1831DDD582C508C22EAce4e3AF51676a0ab4"},{"decimals":3,"symbol":"TM1","name":"TM1","address":"0x2cd42DfD5818f52Db6a79cAd67bB062Dc802D240"},{"decimals":8,"symbol":"HODL","name":"HODLS","address":"0xC05EC99e212e1D5CBBd473630436D3Fe028dFf7C"},{"decimals":3,"symbol":"BSCTM","name":"BSC SCTM","address":"0xd42a413d7CFa18c7c12310198A5Ed5C442B228a5"},{"decimals":3,"symbol":"BKRWP","name":"BSC KRWP","address":"0xB9Dd513420D68Ac4CCf65cBcaA8cc7bd539713ca"},{"decimals":9,"symbol":"XMN","name":"Metronotes","address":"0x1eE241a736D2cA587B09333989DED271A3ebE213"},{"decimals":9,"symbol":"FEG","name":"FEGtoken","address":"0xacFC95585D80Ab62f67A14C566C1b7a49Fe91167"},{"decimals":18,"symbol":"uUP_UNFI","name":"Unifi LP","address":"0x337B100bC19f7620c91A265524F6Fa5e1b5DcDa3"},{"decimals":18,"symbol":"uUP","name":"Unifi LP","address":"0xEE6237Af026545Df9c0669905163F3c1d3A59ab0"},{"decimals":18,"symbol":"SuperFarm","name":"SuperFarm","address":"0x053476c138126Dc81F7Deda5EA7E409cc59ae182"},{"decimals":18,"symbol":"MoonDog","name":"MoonDog","address":"0x79b391FCfbda34C32a81D32F4Bb288c9433ddd42"},{"decimals":18,"symbol":"TRX","name":"TRON","address":"0x85EAC5Ac2F758618dFa09bDbe0cf174e7d574D5B"},{"decimals":18,"symbol":"ETH","name":"Ethereum Token","address":"0x2170ed0880ac9a755fd29b2688956bd959f933f8"},{"decimals":18,"symbol":"BUNNY","name":"Bunny Token","address":"0xC9849E6fdB743d08fAeE3E34dd2D1bc69EA11a51"},{"decimals":18,"symbol":"ACS","name":"ACryptoS","address":"0x4197c6ef3879a08cd51e5560da5064b773aa1d29"},{"decimals":18,"symbol":"MTV","name":"MultiVAC","address":"0x8aa688AB789d1848d131C65D98CEAA8875D97eF1"},{"decimals":18,"symbol":"KTN","name":"Kattana","address":"0xDAe6c2A48BFAA66b43815c5548b10800919c993E"},{"decimals":8,"symbol":"DRAGON","name":"DragonFarm.finance","address":"0x251a3184857488dc90fA9c9A52fd2D8dF473D92C"},{"decimals":18,"symbol":"ACT","name":"Acet Token","address":"0x9F3BCBE48E8b754F331Dfc694A894e8E686aC31D"},{"decimals":9,"symbol":"CARBO","name":"CarbonDEFI.finance (v3.0)","address":"0xb05139B021aAEa472b94528B030844D84a6724d5"},{"decimals":9,"symbol":"SAFEBTC","name":"SafeBTC","address":"0x380624A4a7e69dB1cA07deEcF764025FC224D056"},{"decimals":18,"symbol":"BTT","name":"BitTorrent","address":"0x352Cb5E19b12FC216548a2677bD0fce83BaE434B"},{"decimals":18,"symbol":"BUSD","name":"BUSD-BD1","address":"0x04132bF45511d03a58AFD4f1D36A29D229Ccc574"},{"decimals":18,"symbol":"WBNB","name":"WRAPPED BNB","address":"0x1353c55FD2beEBd976D7ACC4A7083b0618d94689"},{"decimals":18,"symbol":"PMMT","name":"PMMT Token","address":"0x7b5F643380beba50D5dF015Bb664E3901C8E187E"},{"decimals":18,"symbol":"INFI","name":"Infiniti","address":"0x917b1c6b70e2fbcF50569Fbe5296bb831EAFBBE5"},{"decimals":18,"symbol":"BSW","name":"Biswap","address":"0x965F527D9159dCe6288a2219DB51fc6Eef120dD1"},{"decimals":3,"symbol":"BSTEEM","name":"BSC STEEM","address":"0x0F95049A049a516F4832FedBe21102794122959e"},{"decimals":3,"symbol":"BSCT","name":"BSC SCT","address":"0xE920575CEcE01e5D9A7AB23d1a4FD15d8CF3Fe75"},{"decimals":3,"symbol":"WP1","name":"WP1","address":"0x9144438C80a55DCD87CAc29F9a0fFA34500D4D95"},{"decimals":3,"symbol":"EM1","name":"EM1","address":"0x035810ABa3B0049C89cc30916a8f699eE53b760e"},{"decimals":18,"symbol":"EPS","name":"Ellipsis","address":"0xA7f552078dcC247C2684336020c03648500C6d9F"},{"decimals":9,"symbol":"KURD","name":"KURDCOIN","address":"0x61627543D68B23e71b604bbc3C318CBf3B305f84"},{"decimals":3,"symbol":"BSCT","name":"BSC SCT","address":"0x0F47940342311d65040adB918999366EC63f6BBD"},{"decimals":18,"symbol":"PoLx","name":"Proof of liquidity token","address":"0x3656478c6fA5778B51bB2F47bc2912E3B62Ae3a7"},{"decimals":18,"symbol":"Cake-LP","name":"Pancake LPs","address":"0x928bE3DEB1f8B9e4A24a5744bD313E726462961D"},{"decimals":18,"symbol":"NRV","name":"Nerve","address":"0x42F6f551ae042cBe50C739158b4f0CAC0Edb9096"},{"decimals":18,"symbol":"POTS","name":"Moonpot","address":"0x3Fcca8648651E5b974DD6d3e50F61567779772A8"},{"decimals":18,"symbol":"UP","name":"UP","address":"0xb4E8D978bFf48c2D8FA241C0F323F71C1457CA81"},{"decimals":18,"symbol":"SXP","name":"Swipe","address":"0x47BEAd2563dCBf3bF2c9407fEa4dC236fAbA485A"},{"decimals":18,"symbol":"USDC","name":"USD Coin","address":"0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"},{"decimals":18,"symbol":"MBOX","name":"Mobox","address":"0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377"},{"decimals":18,"symbol":"USDT","name":"Tether USD","address":"0x55d398326f99059fF775485246999027B3197955"},{"decimals":18,"symbol":"IOTX","name":"IoTeX Network","address":"0x9678E42ceBEb63F23197D726B29b1CB20d0064E5"},{"decimals":18,"symbol":"YOLOV","name":"YoloVerse","address":"0xD084C5a4a621914eD2992310024d2438DFde5BfD"},{"decimals":18,"symbol":"TRIAS","name":"\\bTrias Token","address":"0xa4838122c683f732289805FC3C207Febd55BabDD"},{"decimals":18,"symbol":"SEED","name":"SEED","address":"0xA433A20A30670B56861Bab29bEE5c5F1C7AedF70"},{"decimals":18,"symbol":"BFG","name":"BFG Token","address":"0xBb46693eBbEa1aC2070E59B4D043b47e2e095f86"},{"decimals":18,"symbol":"SPS","name":"Splintershards","address":"0x1633b7157e7638c4d6593436111bf125ee74703f"},{"decimals":18,"symbol":"REEF","name":"Reef.finance","address":"0xF21768cCBC73Ea5B6fd3C687208a7c2def2d966e"},{"decimals":18,"symbol":"Cake","name":"PancakeSwap Token","address":"0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82"},{"decimals":18,"symbol":"YoloDraw","name":"YoloDraw","address":"0xF19A0a7bDAbD710fa2C33dF432760c9BEC195011"},{"decimals":18,"symbol":"ACSI","name":"ACryptoS(I)","address":"0x5b17b4d5e4009B5C43e3e3d63A5229F794cBA389"},{"decimals":18,"symbol":"SUPER","name":"SUPER-ERC20","address":"0x51BA0b044d96C3aBfcA52B64D733603CCC4F0d4D"},{"decimals":18,"symbol":"ALPACA","name":"AlpacaToken","address":"0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F"},{"decimals":8,"symbol":"wFTM","name":"wFantom","address":"0x743B896dF0452B71F190ba54Bfa68807AF4b2e05"},{"decimals":18,"symbol":"PUNCH","name":"Punch","address":"0x8f661a8698DCa0A0256b68C6E4fBF235bBFa6281"},{"decimals":18,"symbol":"DogMoon","name":"DogMoon Token","address":"0x36754E0A872FEc169A1479312699C82de5a54B33"},{"decimals":18,"symbol":"TTM","name":"Titanium","address":"0x2fdF8a13A2adDF80688DbDce469E7B89A17b1BC8"},{"decimals":18,"symbol":"WSG","name":"Wall Street Games","address":"0xA58950F05FeA2277d2608748412bf9F802eA4901"},{"decimals":18,"symbol":"Baby Shiba Inu","name":"Baby Shiba Inu","address":"0x086306EBe9655B21E61438bfE2bE6A71F78982DE"},{"decimals":18,"symbol":"BNB","name":"Binance","address":"BNB"}]'
);

export const Sample: ShellWrappedComp = ({ connection, eventBus }) => {
  const { balances, refreshingBalances } = useBalances();
  const { activeChain, adapter } = useAdapter();
  const { i18n } = useTranslation();

  const onAddWrappedToken = useCallback(() => {
    eventBus.emit(new AddCurrency(activeChain.wrappedToken));
    setTimeout(() => eventBus.emit(new RefreshBalances()));
  }, [activeChain.wrappedToken, eventBus]);

  const onSignMessage = useCallback(async () => {
    await adapter?.signMessage("hola buenas!");
  }, [adapter]);

  const sendTransaction = useCallback(async () => {
    const { address } = adapter?.blockchainConfig.wrappedToken!;
    const useCase = new Approve({
      tokenAddress: address,
      spender: "0x7e3944CBC535766671bf962c3e796540f6007F1e",
      amount: "-1",
    });
    await adapter?.initializeContract(address, ERC20Artifact.abi);
    useCase.execute(adapter!).then((res) => {
      console.log(res);
      if (res.success) {
        eventBus.emit(
          new ShowNotification({
            content: "Success!",
            appearance: "success",
          })
        );
      } else {
        eventBus.emit(
          new ShowNotification({
            content: "Error!",
            appearance: "error",
          })
        );
      }
    });
  }, [adapter, eventBus]);

  const onAddBunchOfTokens = useCallback(() => {
    if (activeChain.blockchain === Blockchains.Binance) {
      binanceTokens.forEach((token) => {
        eventBus.emit(
          new AddCurrency(
            new Currency(
              token.address,
              token.decimals,
              token.symbol,
              token.name
            )
          )
        );
      });

      setTimeout(() => eventBus.emit(new RefreshBalances()));
    }
  }, [activeChain.blockchain, eventBus]);

  const onShowNotification = useCallback(() => {
    eventBus.emit(
      new ShowNotification({
        content: "Hola!",
        appearance: "success",
      })
    );
  }, [eventBus]);

  const onOpenModal = useCallback(() => {
    eventBus.emit(new OpenNetworkModal());
  }, [eventBus]);

  const address = connection?.adapter?.adapter.isConnected() ? (
    <p>{connection?.adapter?.adapter.getAddress()}</p>
  ) : (
    <p>Not Connected</p>
  );

  return (
    <div>
      {address}
      <p>Language: {i18n.language}</p>
      <div>
        <PrimaryButton onClick={onAddWrappedToken}>
          Add Wrapped Token
        </PrimaryButton>
        <PrimaryButton onClick={onAddBunchOfTokens}>
          Add bunch of tokens
        </PrimaryButton>
      </div>
      <div>
        <PrimaryButton onClick={onShowNotification}>
          Show Notification
        </PrimaryButton>
      </div>
      <div>
        <PrimaryButton onClick={onOpenModal}>
          Open Network Modal By Event
        </PrimaryButton>
      </div>
      <div>
        <PrimaryButton onClick={onSignMessage}>Sign message</PrimaryButton>
      </div>
      <div>
        <PrimaryButton onClick={sendTransaction}>
          Approve WETH allowance
        </PrimaryButton>
      </div>
      <div>Balances: {refreshingBalances ? "Refreshing" : "Loaded"}</div>

      <pre>{JSON.stringify(balances, null, 4)}</pre>

      <Routes>
        <Route path="/exchange" element={<>Exchange page</>}></Route>
        <Route path="/liquidity" element={<>Liquidity Page</>}></Route>
        <Route path="/up" element={<>UP page</>}></Route>
        <Route path="/" element={<Navigate to="/exchange" />}></Route>
      </Routes>
    </div>
  );
};

export const SampleSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <SidebarItem
        active={/^(\/exchange)/.test(location.pathname)}
        icon={BiHome}
        onClick={() => navigate("exchange")}
      >
        Exchange
      </SidebarItem>
      <SidebarItem
        active={/^(\/liquidity)/.test(location.pathname)}
        icon={BiHome}
        onClick={() => navigate("liquidity")}
      >
        Liquidity
      </SidebarItem>
      <SidebarItem
        active={/^(\/up)/.test(location.pathname)}
        icon={BiHome}
        onClick={() => navigate("up")}
      >
        UP
      </SidebarItem>
      <SidebarItem>Test</SidebarItem>
      <div>Test #2</div>
    </>
  );
};
