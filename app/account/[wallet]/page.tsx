// "use client"

// import React, { useState, useEffect } from 'react'
// import { useParams } from 'next/navigation'
// import { SiBlockchaindotcom } from "react-icons/si";

// function Page() {
//   const params = useParams();
//   const walletFromParams = params.wallet as string;
  
//   const [walletAddress, setWalletAddress] = useState("");
//   const [walletBalance, setWalletBalance] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       fetchWalletDetails();
//     }
//   }, []);

//   const fetchWalletDetails = async () => {
//     try {
//       if (!window.ethereum) {
//         setError("Please install MetaMask to use this feature");
//         return;
//       }

//       const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      
//       if (accounts.length > 0) {
//         setWalletAddress(accounts[0]);
        
//         const balance = await window.ethereum.request({
//           method: 'eth_getBalance',
//           params: [accounts[0], 'latest']
//         });
        
//         const etherBalance = parseInt(balance, 16) / 1e18;
//         setWalletBalance(etherBalance.toFixed(4));
//       }
//     } catch (error) {
//       console.error("Error fetching wallet details", error);
//       setError("Error fetching wallet details. Please try again.");
//     }
//   };

//   return (
//     <div className='bg-gradient-to-b from-[#0F0F0F] via-[#1A1A1A] to-[#050505] min-h-screen flex items-center justify-center'>
//       <div className='bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full'>
//         <h1 className='text-white text-3xl font-bold mb-6 text-center'>MetaMask Wallet Info</h1>
        
//         {error && (
//           <div className='bg-red-900 text-white p-4 rounded mb-4'>
//             {error}
//           </div>
//         )}
        
//         <div className='space-y-4'>
//           <div className='bg-gray-800 p-4 rounded'>
//             <h2 className='text-white text-xl font-semibold mb-2'>Wallet Address:</h2>
//             <p className='text-purple-400 text-lg break-all'>{walletAddress}</p>
//           </div>
          
//           <div className='bg-gray-800 p-4 rounded'>
//             <h2 className='text-white text-xl font-semibold mb-2'>Wallet Balance:</h2>
//             <p className='text-green-400 text-lg'>{walletBalance} ETH</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Page;


"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { useParams } from "next/navigation";
import { SiBlockchaindotcom } from "react-icons/si";

export default function Page() {
  const params = useParams();
  const walletFromParams = params.wallet as string;
  
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [transactions, setTransactions] = useState<{ hash: string; value: string }[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchWalletDetails();
      fetchTransactions();
    }
  }, []);

  const fetchWalletDetails = async () => {
    try {
      if (!window.ethereum) {
        setError("Please install MetaMask to use this feature");
        return;
      }

      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        localStorage.setItem("walletAddress", accounts[0]);
        
        const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/" + process.env.NEXT_PUBLIC_INFURA_API_KEY);
        const balance = await provider.getBalance(accounts[0]);
        
        setWalletBalance(ethers.formatEther(balance));
      }
    } catch (error) {
      console.error("Error fetching wallet details", error);
      setError("Error fetching wallet details. Please try again.");
    }
  };

  const fetchTransactions = async () => {
    const cachedWallet = localStorage.getItem("walletAddress");
    if (!cachedWallet) return;
    const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
    const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${cachedWallet}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;
    
    try {
      const response = await axios.get(url);
      if (response.data.status === "1" && Array.isArray(response.data.result)) {
        setTransactions(response.data.result.slice(0, 5));
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("Failed to fetch transaction history.");
    }
  };

  return (
    <div className='bg-gradient-to-b from-[#0F0F0F] via-[#1A1A1A] to-[#050505] min-h-screen flex items-center justify-center'>
      <div className='bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full'>
        <h1 className='text-white text-3xl font-bold mb-6 text-center'>Sepolia Testnet Wallet Info</h1>
        
        {error && (
          <div className='bg-red-900 text-white p-4 rounded mb-4'>
            {error}
          </div>
        )}
        
        <div className='space-y-4'>
          <div className='bg-gray-800 p-4 rounded'>
            <h2 className='text-white text-xl font-semibold mb-2'>Wallet Address:</h2>
            <p className='text-purple-400 text-lg break-all'>{walletAddress}</p>
          </div>
          
          <div className='bg-gray-800 p-4 rounded'>
            <h2 className='text-white text-xl font-semibold mb-2'>Wallet Balance:</h2>
            <p className='text-green-400 text-lg'>{walletBalance} ETH</p>
          </div>
          
          <div className='bg-gray-800 p-4 rounded'>
            <h2 className='text-white text-xl font-semibold mb-2'>Recent Transactions:</h2>
            {transactions.length > 0 ? (
              <ul className='text-gray-300 text-sm space-y-2'>
                {transactions.map((tx, index) => (
                  <li key={index}>
                    <a href={`https://sepolia.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer" className='text-blue-400 hover:underline'>
                      {tx.hash.slice(0, 10)}...{tx.hash.slice(-8)}
                    </a>
                    - {ethers.formatEther(tx.value)} ETH
                  </li>
                ))}
              </ul>
            ) : (
              <p>No transactions found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
