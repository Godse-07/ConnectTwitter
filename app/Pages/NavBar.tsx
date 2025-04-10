"use client";

import { Button } from "@/components/ui/button";
import { Antenna, Blocks, Twitter, LogOut, User, Terminal } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { useWallet } from "../context/WalletContext";


declare global {
  interface Window {
    ethereum?: any;
  }
}

function NavBar() {
  const [Wallet, setWalletAddress] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // <-- State for Alert
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { wallet, setWallet } = useWallet();

  useEffect(() => {
    checkWalletConnection();

    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_accounts", []);
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.log("Error checking wallet connection: ", error);
      }
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setWallet(accounts[0]); // Update global state
      } catch (error) {
        console.error("Wallet connection error:", error);
      }
    } else {
      alert("MetaMask is not installed! Please install it.");
    }
  };

  const Router = useRouter();

  const profilePage = () =>{
    if(Wallet){
      Router.push(`/account/${Wallet}`);
    }
  }

  const handleLogout = () => {
    setWalletAddress("");
    setIsDropdownOpen(false);
    localStorage.removeItem(Wallet); 
    setShowAlert(true); 
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="border-b border-border/40 backdrop-blur-sm fixed w-full h-[70px] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-5">
          <Blocks className="h-12 w-12" />
          <span className="text-2xl">TwitBlock</span>
        </div>

        {/* Connect Wallet and Visit Twitter */}
        <div className="flex gap-4">
          <Button
            onClick={() => window.open("https://twitter.com", "_blank")}
            className="text-xl cursor-pointer flex items-center"
          >
            <Twitter className="mr-2 h-4 w-4" />
            <span>Visit Twitter</span>
          </Button>

          {Wallet ? (
            <div className="relative" ref={dropdownRef}>
              <Button
                onClick={toggleDropdown}
                className="text-xl bg-green-600 text-white cursor-pointer flex items-center"
              >
                <Antenna className="mr-2 h-4 w-4" />
                <span>{Wallet.slice(0, 6) + "..." + Wallet.slice(-4)}</span>
              </Button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" style={{ zIndex: 50 }}>
                  <div className="py-1 px-2 text-gray-900">
                    <div className="block px-4 py-2 text-sm border-b">My Account</div>
                    <button onClick={profilePage}
                      className="block px-4 py-2 text-sm hover:bg-black hover:text-white hover:rounded-2xl cursor-pointer w-full text-left flex items-center"
                      role="menuitem"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </button>
                    <button
                      className="block px-4 py-2 text-sm hover:bg-black hover:text-white hover:rounded-2xl cursor-pointer w-full text-left flex items-center"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>LogOut</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button onClick={connectWallet} className="text-xl cursor-pointer flex items-center">
              <Antenna className="mr-2 h-4 w-4" />
              <span>Connect Wallet</span>
            </Button>
          )}
        </div>
      </div>

      {/* Show Alert When Logging Out */}
      {showAlert && (
        <div className="absolute top-16 right-4">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Logged Out</AlertTitle>
            <AlertDescription>
              You disconnected the wallet.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
