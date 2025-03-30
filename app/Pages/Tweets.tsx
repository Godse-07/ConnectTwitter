import { Button } from '@/components/ui/button'
import { Blocks, BlocksIcon } from 'lucide-react'
import React from 'react'

function Tweets() {
  return (
    <div className='p-4'>
        <Button size="lg" className="animate-pulse text-2xl px-6 py-6 border flex items-center bg-black">
            Start Posting
            <Blocks className="ml-2 h-5 w-5" />
        </Button>
    </div>
  )
}

export default Tweets