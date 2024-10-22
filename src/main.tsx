import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "./styles/globals.css";
import { Toaster } from "./components/ui/Toaster";
import { getGasless } from "./utils/getGasless";
import {
  biconomyApiIdConst,
  biconomyApiKeyConst,
  chainConst,
  relayerUrlConst,
  clientIdConst,
} from "./consts/parameters";

const container = document.getElementById("root");
const root = createRoot(container!);
const urlParams = new URL(window.location.toString()).searchParams;

const relayerUrl = urlParams.get("relayUrl") || relayerUrlConst || "";
const biconomyApiKey =
  urlParams.get("biconomyApiKey") || biconomyApiKeyConst || "";
const biconomyApiId =
  urlParams.get("biconomyApiId") || biconomyApiIdConst || "";
const sdkOptions = getGasless(relayerUrl, biconomyApiKey, biconomyApiId);

const chain = (urlParams.get("chain") && urlParams.get("chain")?.startsWith("{")) ? JSON.parse(String(urlParams.get("chain"))) : urlParams.get("chain") || chainConst;

const clientId = urlParams.get("clientId") || clientIdConst || "";

const customChain = {
  // Required information for connecting to the network
  chainId: 33139, // Chain ID of the network
  rpc: ["https://33139.rpc.thirdweb.com/35948768453756f1cf091e34b46d265a"], // Array of RPC URLs to use
 
  // Information for adding the network to your wallet (how it will appear for first time users) === \\
  // Information about the chain's native currency (i.e. the currency that is used to pay for gas)
  nativeCurrency: {
    decimals: 18,
    name: "APE",
    symbol: "APE",
  },
  shortName: "ape", // Display value shown in the wallet UI
  slug: "APE", // Display value shown in the wallet UI
  testnet: false, // Boolean indicating whether the chain is a testnet or mainnet
  chain: "Ape Chain", // Name of the network
  name: "Ape Chain Mainnet", // Name of the network
};

root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={customChain} sdkOptions={sdkOptions} clientId={clientId}>
      <Toaster />
      <App />
    </ThirdwebProvider>
  </React.StrictMode>,
);
