import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { Movie, selectMovie } from "@/store/movieSlice";
import { RootState } from "@/store/store";
import { isValidImageUrl } from "@/utils/imageUrlValidation";

export interface MovieListProps {
  searchResults: Movie[];
}

const MovieList: FC<MovieListProps> = ({ searchResults }) => {
  const { status } = useSelector((state: RootState) => state.movie);
  const dispatch = useDispatch();

  const handleMovieClick = (movie: Movie) => {
    dispatch(selectMovie(movie));
  };

  if (status === "loading") {
    return <p>Loading search results...</p>;
  }

  if (!searchResults) {
    return null;
  }

  return (
    <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {searchResults.map((movie) => (
        <div key={movie.imdbID} className="bg-white rounded-lg shadow-lg">
          <Link href={`/movie/${movie.imdbID}`}>
            <div
              onClick={() => handleMovieClick(movie)}
              className="w-full h-48 overflow-hidden"
            >
              {isValidImageUrl(movie.poster) ? (
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-full object-contain"
                  src={movie.poster}
                  alt={movie.title}
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <p className="text-gray-400">Image not found</p>
                </div>
              )}
            </div>
          </Link>
          <div className="flex justify-between items-center">
            <div className="p-4">
              <Link href={`/movie/${movie.imdbID}`}>
                <h2 className="text-lg font-medium mb-2">{movie.title}</h2>
              </Link>
              <p className="text-gray-400">{movie.year}</p>
            </div>
            <div className="p-4">
              <button className="w-4 h-4">
                <FaHeart className="text-black-500 mr-2" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
