import { useMovieStore } from '../store';
import Image from 'next/image';
import { Trash2  } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SkeletonCard from './SkeletonCard';

const Fave = () => {
  const { removeMovie, favourite } = useMovieStore();
  const [currentFavourites, setCurrentFavourites] = useState(favourite);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    // Listen for changes to favourite and update the local state
    setCurrentFavourites(favourite);
    console.log(favourite);
    const timeout = setTimeout(() => {
      setIsLoading(false); // Stop showing skeleton after a delay
    }, 1000); // Set delay to 1 second (you can adjust the time)

    return () => clearTimeout(timeout); // Cleanup on unmount
    
  }, [favourite]); // Runs whenever `favourite` changes

  const handleClick = (movie: any) => {
    try {
      removeMovie(movie.id);
      console.log('Movie removed:', movie);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading || !currentFavourites) return <div><SkeletonCard/></div>;

  return (
    <>
    <div className='flex flex-col'> 
        <section className='flex justify-center items-center'> 


        {currentFavourites.length === 0 && (
        <div className='p-4 '>
          <Image
            src={'/assets/EmptyWishlist.svg'}
            alt=''
            width={100}
            height={100}
            className='w-full'
          />
        </div>
      )}
        </section>
    <div className='grid grid-cols-2 md:grid-cols-3 md:p-8 lg:grid-cols-4 lg:p-12 gap-8 lg:gap-12 p-4 '>
     

      {currentFavourites.map((movie, index) => (
        <ul key={index} className='flex flex-col gap-2 text-white p-4 border-2 rounded-2xl border-white  '>
          <li className='flex justify-center '>
            <Link href={`/search/${movie.title}`}>
              <div className='text-[#FF8700] flex gap-2 items-center'>
                <Image src={`/assets/star1.svg`} alt='' width={16} height={16} />
                {movie.vote_average}
              </div>
            </Link>
          </li>
          <li>
            <Link href={`/search/${movie.title}`}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt=''
                width={100}
                height={100}
                className='w-full rounded-2xl '
              />
            </Link>
          </li>
          <Link href={`/search/${movie.title}`}>
            <li className='md:text-2xl'>{movie.title}</li>
          </Link>

          <li className='flex flex-col'>
            <div className='text-sm flex items-center justify-between text-[#92929D]'>
              <Link href={`/search/${movie.title}`}>
                <p>{movie.release_date}</p>
              </Link>
              <Button onClick={() => handleClick(movie)}>
                <Trash2  size={16} />
              </Button>
            </div>
          </li>
        </ul>
      ))}
    </div>
    </div>
    </>
  );
};

export default Fave;
