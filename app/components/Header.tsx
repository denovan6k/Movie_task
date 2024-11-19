'use client'
import { CalendarHeart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const Header = () => {
  
  return (
    <div>
        <header className='flex justify-between items-center p-4 lg:p-12'>
      <p className='text-2xl text-white p-4 md:text-3xl '>What do you want to watch?</p>
      <div className='flex'>
      <Link href={`/wishlist`} >
      <CalendarHeart />
      </Link>
      <p className='text-white -mt-2'></p>
      </div>
      
      </header>
    </div>
  )
}
export default Header