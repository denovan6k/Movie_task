
// Home.tsx or your server component
import Card from '@/app/components/Card';
import Search from '@/app/components/search';
import { Suspense } from 'react';
import Header from '@/app/components/Header';
import SkeletonCard from '@/app/components/SkeletonCard';




const SearchPage = async (props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  } ) => {
  const searchParams = await props.searchParams; 
  const query = searchParams?.query || ''; // Default to an empty string if no query param

  console.log(query); // Optional: log the query to the console

  return (
    <div className='flex flex-col gap-8 bg-[#242A32] min-h-screen'>
     <Header/>
      
      <Search />
      <Suspense 
     key={query} fallback={<div ><SkeletonCard /></div>}>
   <Card query={query} /> {/* Pass the query to the Card component */}
      </Suspense>
   
    </div>
  );
}

export default SearchPage;
