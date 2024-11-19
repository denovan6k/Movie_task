import { create } from 'zustand';
import { persist, createJSONStorage, } from 'zustand/middleware';


//Movie type
type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

// Movie Store type
type MovieStore = {
  Movies: Movie[];
  favourite: Movie[];
  count: number;

  query: string;
  movie:any //movie type specifically for addMovie function
  movieList: number[]
  CurrentMovie: any;

  isClicked: boolean;
  setIsClicked: (isClicked: boolean) => void;
  setCount: () => void;
  setCurrentMovie: (currentMovie: number) => void,
  resetMovie: () => void;
  setMovie: (movie: any) => void;
  genre:any;
  setGenre: (genre: any) => Promise<void>;
  setMovies: (Movies: Movie[]) => Promise<void>;
 
  setQuery: (query: string) => Promise<void>;
  addMovie: (movie: Movie, isCorrect: boolean) => Promise<void>;
  removeMovie: (movieId: number) => Promise<void>;
};

export const useMovieStore = create<MovieStore>()(
  persist(
    (set,get) => ({
      Movies: [],
      favourite: [],
      query: '',
      movie:[],
      isClicked: false,
      count: 0,
      CurrentMovie:[],
      movieList: [],
      genre: [],
      setMovie: (movie: any) => {
        set({ movie });
      },
      //add Movie to Favourite list, if it is not already in the list
      addMovie: async (movie: Movie, isCorrect: boolean): Promise<void> => {
        const {favourite } = get();
        if (favourite.includes(movie)) {
          return;
      }
        if (isCorrect) {
          set({favourite: [...favourite, movie]}) 
       
        console.log(movie);
        
      }},
      // Set the genre state
      setGenre: async (genre: any) => {
        set({ genre });
      },
      
     setCount: ()=>{
      set((state) => ({count: state.count + 1}))
     },
      setIsClicked: (isClicked) => set({ isClicked }),



    // Set the current movie state and reset the movie state after 5 seconds
      setCurrentMovie: (CurrentMovie) => set({CurrentMovie}), 
        // Reset movie state
  resetMovie: () => set({ movie: []}),
      removeMovie: async (movieId: number): Promise<void> => {
        set((state) => ({
          favourite: state.favourite.filter((movie) => movie.id !== movieId),
        }));
        // console.log(get().favourite); 
        // Logs the updated favourite array after removal
      },



    //set Movie state
      setMovies: async (Movies: Movie[]) => {
        set({ Movies });
      },

     
     // Set the query state
      setQuery: async (query: string) => {
        set({ query });
      },
    }),
    {
      name: 'movie-storage',
      storage: createJSONStorage(() => localStorage), // uses localStorage for persistence
    }
  )
);
