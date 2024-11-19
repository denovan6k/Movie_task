'use client'
import React, { useEffect,useState } from 'react';
import { ChevronLeft } from 'lucide-react';

import { useParams } from 'next/navigation';
import { useMovieStore } from '@/app/store';
import Image from 'next/image';
import Link from 'next/link';
import SkeletonCard from '@/app/components/SkeletonCard';

const Details = () => {
  const { slug } = useParams();
  const { setMovie, movie, resetMovie, setGenre, genre } = useMovieStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // **First useEffect: Fetch movie details**
  useEffect(() => {
    const fetchMovie = async () => {
      resetMovie(); // Reset movie when slug changes
      const decodedSlug = decodeURIComponent(slug as string);
      try {
        if (decodedSlug) {
          const response = await fetch('/api/fetchdata');
          const data = await response.json();
          const { results } = data;
          const movie = results.find((movie: any) => movie.title === decodedSlug);
          if (movie) {
            setMovie(movie);
          }
        }
      } catch (err) {
        console.error('Error fetching movie:', err);
      }
    };

    fetchMovie();
    const timeout = setTimeout(() => {
      setIsLoading(false); // Stop showing skeleton after a delay
    }, 1000); // Set delay to 1 second (you can adjust the time)

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, [slug, setMovie, resetMovie]); // Dependencies: triggered when slug changes

  // **Second useEffect: Fetch genres**
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const response = await fetch('/api/fetchgenre');
        const data = await response.json();
        const { genres } = data;
        setGenre(genres); // Set genres in state
      } catch (err) {
        console.error('Error fetching genres:', err);
      }
    };

    loadGenres(); // Fetch genres once when the component mounts
  }, [setGenre]); // Dependencies: triggered on initial mount

// Function to map genre IDs to names
const getGenreNames = (genre_ids: number[], genre: { id: number, name: string }[]) => {
  if (!genre || genre.length === 0 || !Array.isArray(genre_ids)) {
    return ['Unknown Genre'];
  }
  return genre_ids.map(id => genre.find(g => g.id === id)?.name || 'Unknown Genre');
};

// Get genre names from movie's genre_ids
const genreNames = movie && movie.genre_ids ? getGenreNames(movie.genre_ids, genre) : [];


if (isLoading || !movie && !genre) return <div><SkeletonCard/></div>;

  return (
    <div className="min-h-screen flex flex-col gap-2 bg-[#242A32] text-white p-4 lg:p-12">
      <header className="flex justify-between items-center p-4">
        <Link href={'/search'}>
          <ChevronLeft className="" />
        </Link>

        <span>
          <p className="text-2xl lg:text-4xl">Details</p>
        </span>

       <p> </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        <section className="flex flex-col items-center justify-center gap-2">
          <p className="text-3xl text-[#92929D] p-4">{movie?.title}</p>
          {movie && (
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt=''
              className="w-full p-4 lg:p-12 max-w-md lg:max-w-2xl rounded-3xl"
              width={100}
              height={100}
            />
          )}
        </section>

        <main className="p-4 flex flex-col gap-4">
          <ul className="flex flex-col gap-2 lg:gap-8">
            <li className="flex lg:flex-col justify-between items-center">
              <p className="text-2xl lg:text-6xl">Overview</p>
              <div className="text-[#FF8700] flex gap-2 items-center">
                <Image src={`/assets/star1.svg`} alt="" width={16} height={16} />
                {movie?.vote_average}
              </div>
            </li>
            <li className="text-[#92929D] lg:text-3xl">
              {movie?.overview}
            </li>
          </ul>
          <ul>
            <li>
              <p className="lg:text-2xl">Genres: {genreNames.join(', ')}</p>
            </li>
          </ul>
        </main>
      </div>
    </div>
  );
};

export default Details;
