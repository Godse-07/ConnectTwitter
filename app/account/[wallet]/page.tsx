"use client";

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

function Page() {
  const walletParams = useParams();
  const wallet = walletParams.wallet as string;
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setLoading(true);
        // Using Alchemy's demo endpoint for Sepolia - no API key needed
        const provider = new ethers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/demo');
        
        // Fetch the balance in wei
        const balanceWei = await provider.getBalance(wallet);
        
        // Convert wei to ETH
        const balanceEth = ethers.formatEther(balanceWei);
        
        setBalance(balanceEth);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching balance:', err);
        setError('Failed to fetch wallet balance');
        setLoading(false);
      }
    };

    if (wallet) {
      fetchBalance();
    }
  }, [wallet]);

  return (
    <div className='bg-gradient-to-b from-[#0F0F0F] via-[#1A1A1A] to-[#050505] min-h-screen w-full flex flex-col items-center justify-center text-white p-4'>
      <h1 className='text-2xl font-bold mb-2'>Wallet Address</h1>
      <p className='text-gray-300 mb-6 break-all text-center'>{wallet}</p>
      
      <h2 className='text-xl font-semibold mb-2'>Sepolia ETH Balance</h2>
      {loading ? (
        <div className='flex items-center justify-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500'></div>
        </div>
      ) : error ? (
        <p className='text-red-400'>{error}</p>
      ) : (
        <div className='bg-gray-800 rounded-lg p-4 flex flex-col items-center'>
          <p className='text-3xl font-bold text-blue-400'>{balance.slice(0,6)} SepoliaETH</p>
        </div>
      )}
    </div>
  );
}

export default Page;