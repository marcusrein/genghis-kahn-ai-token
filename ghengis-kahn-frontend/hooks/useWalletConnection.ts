import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useMembers } from "./useMembers";

interface WalletConnection {
  address: string | null;
  networkError: string | null;
  isMember: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

/**
 * A custom hook that handles Metamask/ethers wallet connection,
 * network validation for Base Mainnet, and membership checks.
 */
export function useWalletConnection(): WalletConnection {
  const { members } = useMembers();
  const [address, setAddress] = useState<string | null>(null);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [isMember, setIsMember] = useState(false);

  const BASE_MAINNET_CHAIN_ID = BigInt(8453);

  async function connectWallet() {
    if (typeof window === "undefined" || !window.ethereum) {
      const error = "No crypto wallet found. Please install one (e.g., MetaMask).";
      setNetworkError(error);
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();

      // Validate Base Mainnet
      if (network.chainId !== BASE_MAINNET_CHAIN_ID) {
        const error = "Please switch your wallet to Base Mainnet.";
        setNetworkError(error);
        return;
      }

      // Request accounts
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts && accounts.length > 0) {
        const userAddress = accounts[0];
        setAddress(userAddress);
        setNetworkError(null);
      }
    } catch (error: any) {
      if (error?.code === -32002) {
        const errorMsg =
          "A wallet request is already pending. Please open your wallet to confirm or reject.";
        setNetworkError(errorMsg);
      } else {
        console.error("User rejected request or another error occurred:", error);
      }
    }
  }

  function disconnectWallet() {
    // Clears the local address, mimicking a wallet disconnect
    setAddress(null);
  }

  // Whenever the address or the members list changes, re-check membership
  useEffect(() => {
    if (address) {
      const found = members.some(
        (member) => member.account.toLowerCase() === address.toLowerCase()
      );
      setIsMember(found);
    } else {
      setIsMember(false);
    }
  }, [address, members]);

  return {
    address,
    networkError,
    isMember,
    connectWallet,
    disconnectWallet,
  };
} 