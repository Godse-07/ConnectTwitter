"use client";

import { ethers } from "ethers";
import React, { createContext, useContext, useState, useEffect } from "react";

interface WalletContextType {
  wallet: string;
  setWallet: (wallet: string) => void;
}

const WalletContext = createContext<WalletContextType>({
  wallet: "",
  setWallet: () => {},
});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    // Auto-check connection
    if (window.ethereum) {
      const checkConnection = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_accounts", []);
        if (accounts.length > 0) setWallet(accounts[0]);
      };
      checkConnection();
    }
  }, []);

  return (
    <WalletContext.Provider value={{ wallet, setWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
