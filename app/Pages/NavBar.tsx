"use client";

import { Button } from '@/components/ui/button';
import { log } from 'console';
import { Antenna, Blocks, Twitter } from 'lucide-react';
import React from 'react';

function NavBar() {
  return (
    <nav className='border-b border-border/40 backdrop-blur-sm fixed w-full h-[70px] text-white'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <div className='flex items-center gap-5'>
          <Blocks className='h-12 w-12' />
          <span className='text-2xl'>TwitBlock</span>
        </div>

        {/* connect wallet and go to twitter */}

        <div className='flex gap-4'>
            <Button onClick={() => console.log("Button Pressed")} className='text-xl cursor-pointer'>
                <Twitter></Twitter>
                <span>Visit Twitter</span>
            </Button>
            <Button className='text-xl cursor-pointer'>
                <Antenna></Antenna>
                <span>Connect Wallet</span>
            </Button>
        </div>

      </div>
    </nav>
  );
}

export default NavBar;
