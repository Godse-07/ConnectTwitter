"use client";

import { useParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { createPublicClient, http, formatEther, Block, isAddress, getAddress } from "viem";
import { sepolia } from "viem/chains";

function Page() {
  const { wallet: rawWallet } = useParams();

  const wallet = useMemo(() => {
    return typeof rawWallet === 'string' && isAddress(rawWallet)
      ? getAddress(rawWallet)
      : '';
  }, [rawWallet]);

  const client = useMemo(() => {
    return createPublicClient({
      chain: sepolia,
      transport: http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
    });
  }, []);

  const [balance, setBalance] = useState('');
  const [blockInfo, setBlockInfo] = useState<Block | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!wallet) return;

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const [balanceWei, block] = await Promise.all([
          client.getBalance({ address: wallet }),
          client.getBlock({ blockNumber: 123456n }),
        ]);
        setBalance(formatEther(balanceWei));
        setBlockInfo(block);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch wallet data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [wallet, client]);

  return (
    <div className="bg-gradient-to-b from-[#0F0F0F] via-[#1A1A1A] to-[#050505] min-h-screen w-full flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-2xl font-bold mb-2">Wallet Address</h1>
      <p className="text-gray-300 mb-6 break-all text-center">{wallet || 'Not Found'}</p>

      <h2 className="text-xl font-semibold mb-2">Sepolia ETH Balance</h2>
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <div className="bg-gray-800 rounded-lg p-4 flex flex-col items-center">
          <p className="text-3xl font-bold text-blue-400">
            {Number(balance).toFixed(6)} SepoliaETH
          </p>
        </div>
      )}

      {blockInfo && (
        <div className="mt-8 bg-gray-900 rounded-lg p-4 text-sm w-full max-w-xl">
          <h3 className="text-lg font-semibold mb-2 text-white">Block #123456 Info</h3>
          <p><span className="font-semibold">Hash:</span> {blockInfo.hash}</p>
          <p><span className="font-semibold">Timestamp:</span> {new Date(Number(blockInfo.timestamp) * 1000).toLocaleString()}</p>
          <p><span className="font-semibold">Transactions:</span> {blockInfo.transactions.length}</p>
        </div>
      )}
    </div>
  );
}

export default Page;
