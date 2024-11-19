'use client';

import { Input } from '@/components/ui/input';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {useDebouncedCallback} from "use-debounce"
import { useMovieStore } from '../store';
const Search = () => {
  const{setIsClicked}=useMovieStore()
  const searchParams = useSearchParams(); // Retrieve current search params
  const {replace} = useRouter(); // Used to push updates to the URL
  const pathname = usePathname(); // Get current pathname

  const handleSearch =useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams as any); // Convert searchParams to URLSearchParams for manipulation
    console.log(value)

    
    if (value) {
      params.set('query', value); // Set 'query' param if a search term exists
    } else {
      params.delete('query'); // Remove 'query' param if search term is cleared
    }

    // Push the new query to the URL using router.push()
    replace(`${pathname}?${params.toString()}`, {scroll:false});
    (setIsClicked(true)) 
  }, 300);

  return (
    <div className='p-4 flex justify-center'>
      {/* Use 'query' for the default value and onChange for live updates */}
      <Input
        type="text"
        placeholder="Search..."
        defaultValue={searchParams.get('query')?.toString()} // Retrieve current 'query' param
        onChange={(e) => handleSearch(e.target.value)} // Call handleSearch when the input changes
      className='min-w-[331px] lg:max-w-[600px]  text-white rounded-2xl bg-[#3A3F47]'/>
    </div>
  );
};

export default Search;

