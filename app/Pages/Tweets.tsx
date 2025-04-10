"use client";

import { Button } from '@/components/ui/button';
import { Blocks } from 'lucide-react';
import React from 'react';
import { useWallet } from '../context/WalletContext';

function Tweets() {
  const { wallet } = useWallet();

  return (
    <div className='p-4'>
      {wallet ? (
        <Button size="lg" className="text-2xl px-6 py-6 border flex items-center bg-black">
          Start Posting
          <Blocks className="ml-2 h-5 w-5" />
        </Button>
      ) : (
        <Button disabled size="lg" className="text-xl px-6 py-6 border flex items-center bg-gray-800 text-gray-400">
          Connect Wallet to Post
        </Button>
      )}
    </div>
  );
}

export default Tweets;
