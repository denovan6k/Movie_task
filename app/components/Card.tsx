'use client'
import {  useEffect, useState  } from 'react';
import { toast } from "sonner"
import { useMovieStore } from '../store';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SkeletonCard from './SkeletonCard';


const Card = ({query}:{query:string}) => {
  //destructuring components from useMovieStore
   const {Movies,setMovies, addMovie,setCurrentMovie ,favourite,setCount ,isClicked } =useMovieStore()
     // Local state to manage the loading timeout
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
       const response = await fetch('/api/fetchdata');
       const data = await response.json();
        setMovies(data.results)
       
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    const timeout = setTimeout(() => {
      setIsLoading(false); // Stop showing skeleton after a delay
    }, 1000); // Set delay to 1 second (you can adjust the time)

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, [setMovies]);


  const handleClick = (movie: any) => {
          try{
            setCurrentMovie(movie)
            addMovie(movie,true)
            setCount()

            
             
             
             console.log('Movie added:', favourite)
             toast("Movie added", {
              description: "Movie added to favourites successfully",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })



          }catch(err){console.error(err)}
  }

 // Ensure that the Movies array contains the correct movie data
 const filteredMovies = Movies
 ? Movies.filter((movie) =>
     movie.title?.toLowerCase().includes(query.toLowerCase())
   )
 : [];


  if (isLoading || !Movies) return <div><SkeletonCard/></div>;

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 md:p-8 lg:grid-cols-4 lg:p-12 gap-8 lg:gap-12 p-4 '>
      { isClicked && filteredMovies.length === 0 && <div className='flex justify-center items-center text-2xl'> no results</div>}
      
      {/* Filter the movies based on the query */}
      {Movies && filteredMovies.map((movie) => (
        
        <ul key={movie.id} className=' flex flex-col gap-2 text-white p-4 border-2 border-white rounded-2xl '>
         
          <li className='flex justify-center '>
          <Link href={`/${movie.title}`}>
          <div className='text-[#FF8700] flex gap-2 items-center' >
            
              <Image src={`/assets/star1.svg`} alt='' width={16} height={16} /> 
              
              {movie.vote_average} 
             
              </div>
             
              </Link>
          </li>
            <li>
            <Link href={`/${movie.title}`}>
            <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='' width={100} height={100} className='w-full rounded-2xl ' />
            </Link>
            </li>
            <Link href={`/${movie.title}`}>
            <li className='md:text-2xl'>{movie.title}</li>
            </Link>
            
            <li className='flex flex-col'> 
          
            <div className='text-sm flex items-center justify-between text-[#92929D]'>
            <Link href={`/${movie.title}`}>
              <p >{movie.release_date}</p>
              </Link>
             <Button onClick={() => handleClick(movie)} > <Heart size={16} /> </Button> 
                </div></li>
              
        </ul>
       
      ))}
    
    </div>

  );
};

export default Card;
