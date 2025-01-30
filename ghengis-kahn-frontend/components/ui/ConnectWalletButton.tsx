import { useState } from "react";
import { ethers } from "ethers";
import { useMembers } from "../../hooks/useMembers";

interface ConnectWalletButtonProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
  onNetworkError?: (error: string) => void;
}

export default function ConnectWalletButton({
  onConnect,
  onDisconnect,
  onNetworkError,
}: ConnectWalletButtonProps) {
  // Track connected address
  const [address, setAddress] = useState<string | null>(null);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const { members } = useMembers();

  async function handleConnect() {
    if (typeof window === "undefined" || !window.ethereum) {
      const error = "No crypto wallet found. Please install one (e.g., MetaMask).";
      setNetworkError(error);
      if (onNetworkError) onNetworkError(error);
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();

      // Check if the network is Base Mainnet
      const BASE_MAINNET_CHAIN_ID = BigInt(8453);
      if (network.chainId !== BASE_MAINNET_CHAIN_ID) {
        const error = "Please switch your wallet to Base Mainnet.";
        setNetworkError(error);
        if (onNetworkError) onNetworkError(error);
        return; // Do not connect if not on Base Mainnet
      }

      const accounts = await provider.send("eth_requestAccounts", []);

      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
        setNetworkError(null); // Clear any previous error
        if (onConnect) {
          onConnect(accounts[0]);
        }
      }
    } catch (error: any) {
      if (error?.code === -32002) {
        const errorMsg = "A wallet request is already pending. Please open your wallet to confirm or reject.";
        setNetworkError(errorMsg);
        if (onNetworkError) onNetworkError(errorMsg);
      } else {
        console.error("User rejected request or another error occurred:", error);
      }
    }
  }

  function handleDisconnect() {
    // Ethers doesn't provide a "disconnect" by default for injected wallets;
    // we'll just clear the local address variable to mimic a "disconnect."
    setAddress(null);
    if (onDisconnect) {
      onDisconnect();
    }
  }

  const isConnected = !!address;
  const walletText = isConnected
    ? address.slice(0, 6) + "..." + address.slice(-4)
    : "Connect Wallet";

  const isMember = members.some(member => member.account.toLowerCase() === address?.toLowerCase());

  return (
    <div className="flex items-center">
      {/* <div className="text-red-500 mr-2">
        {networkError || (isConnected && (
          isMember ? (
            <>
              <span className="text-slate-300">Welcome Member! Join the </span>
              <a
                href="https://discord.gg/FckzFjK9jR"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Membership Discord
              </a>
            </>
          ) : (
            <>
              <span className="text-slate-300">You are not a Member. Visit </span>
              <a
                href="https://creator.bid/agents/678e4b71970206e12577fcf4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                $KAHN CreatorBid
              </a>
              <span className="text-slate-300"> to become a Member.</span>
            </>
          )
        ))}
      </div> */}
      <div>
        <button
          onClick={isConnected ? handleDisconnect : handleConnect}
          className="btn-sm text-slate-300 hover:text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none"
        >
          {walletText}
        </button>
      </div>
    </div>
  );
} 