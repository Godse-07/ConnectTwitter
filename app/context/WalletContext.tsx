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
    if (typeof window !== "undefined" && (window.ethereum as ethers.Eip1193Provider) && typeof (window.ethereum as ethers.Eip1193Provider).request === "function") {
      const checkConnection = async () => {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum as ethers.Eip1193Provider);
          const accounts = await provider.send("eth_accounts", []);
          if (accounts.length > 0) setWallet(accounts[0]);
        } catch (error) {
          console.error("Error connecting wallet:", error);
        }
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
