'use client'
import React from 'react'

import Link from 'next/link'
import {  ChevronLeft } from 'lucide-react'

import { Suspense ,lazy} from 'react'
import SkeletonCard from '@/app/components/SkeletonCard'
// Lazy load Fave component
const Fave = lazy(() => import('@/app/components/Fave'));
const Wishlist = () => {
  return (
    <div className='flex flex-col gap-8 bg-[#242A32] min-h-screen'>
          <header className="flex justify-between  items-center p-4">
        <Link href={'/search'}>
          <ChevronLeft className="" />
        </Link>

        <span>
          <p className="text-2xl lg:text-4xl">Wishlist</p>
        </span>
        
        <p></p>
        
      </header>
      <Suspense fallback={<div><SkeletonCard/></div>}>
      <Fave/>
      </Suspense>
    
    </div>
  )
}

export default Wishlist