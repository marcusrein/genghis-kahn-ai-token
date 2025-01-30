import { useState } from "react";
// import { ethers } from "ethers";

interface ConnectWalletButtonProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
}

export default function ConnectWalletButton({
  onConnect,
  onDisconnect,
}: ConnectWalletButtonProps) {
  // Track connected address
  // const [address, setAddress] = useState<string | null>(null);

  // async function handleConnect() {
  //   if (typeof window === "undefined" || !window.ethereum) {
  //     alert("No crypto wallet found. Please install one (e.g., MetaMask).");
  //     return;
  //   }

  //   try {
  //     // Prompt user for wallet connection
  //     const provider = new ethers.BrowserProvider(window.ethereum);
  //     const accounts = await provider.send("eth_requestAccounts", []);

  //     if (accounts && accounts.length > 0) {
  //       setAddress(accounts[0]);
  //       if (onConnect) {
  //         onConnect(accounts[0]);
  //       }
  //     }
  //   } catch (error: any) {
  //     if (error?.code === -32002) {
  //       alert(
  //         "A wallet request is already pending. Please open your wallet to confirm or reject."
  //       );
  //     } else {
  //       console.error("User rejected request or another error occurred:", error);
  //     }
  //   }
  // }

  // function handleDisconnect() {
  //   // Ethers doesn't provide a "disconnect" by default for injected wallets;
  //   // we'll just clear the local address variable to mimic a "disconnect."
  //   setAddress(null);
  //   if (onDisconnect) {
  //     onDisconnect();
  //   }
  // }

  // const isConnected = !!address;
  // const walletText = isConnected
  //   ? address.slice(0, 6) + "..." + address.slice(-4)
  //   : "Connect Wallet";

  return (
    <button
      className="btn-sm text-slate-300 hover:text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none"
    >
      Connect Wallet Coming Soon
    </button>
  );
} 