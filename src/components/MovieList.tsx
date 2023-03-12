import { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";
import Image from "next/image";
import { FaHeart, FaCheck } from "react-icons/fa";
import { Movie, selectMovie } from "@/store/movieSlice";
import { addFavorite } from "@/store/favoriteSlice";
import { isValidImageUrl } from "@/utils/imageUrlValidation";
import Pagination from "@/components/Pagination";

export interface MovieListProps {
  searchResults: Movie[];
}

const MovieList: FC<MovieListProps> = ({ searchResults }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [addedMovieId, setAddedMovieId] = useState<string>("");
  const { status } = useSelector((state: RootState) => state.movie);
  const favorites = useSelector((state: RootState) => state.favorite.movies);

  const dispatch = useDispatch();

  const handleMovieClick = (movie: Movie) => {
    dispatch(selectMovie(movie));
  };

  const handleAddFavorite = (movie: Movie) => {
    dispatch(addFavorite(movie));
    setAddedMovieId(movie.imdbID);
  };

  const isFavorite = (movie: Movie) =>
    favorites.some((favorite) => favorite.imdbID === movie.imdbID);

  const searchResultsPerPage = 6;
  const lastResultIndex = currentPage * searchResultsPerPage;
  const firstResultIndex = lastResultIndex - searchResultsPerPage;
  const currentResults = searchResults.slice(firstResultIndex, lastResultIndex);
  const totalPages = Math.ceil(searchResults.length / searchResultsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (status === "loading") {
    return (
      <p className="text-center my-4 text-lg text-gray-500">
        Loading search results...
      </p>
    );
  }

  if (!searchResults || searchResults.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500">No results found.</p>
      </div>
    );
  }

  return (
    <div className="pt-8">
      <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentResults.map((movie) => (
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
                {isFavorite(movie) ? (
                  <FaCheck className="text-red-500 mr-2" />
                ) : (
                  <button
                    className="w-4 h-4"
                    onClick={() => handleAddFavorite(movie)}
                  >
                    {addedMovieId === movie.imdbID ? (
                      <FaCheck className="text-red-500 mr-2" />
                    ) : (
                      <FaHeart className="text-black-500 mr-2" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        className="inline-flex"
      />
    </div>
  );
};

export default MovieList;
