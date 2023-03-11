import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Movie } from "@/store/movieSlice";
import { RootState } from "@/store/store";
import { isValidImageUrl } from "@/utils/imageUrlValidation";
import Image from "next/image";

export interface MovieListProps {
  searchResults: Movie[];
}

const MovieList: FC<MovieListProps> = ({ searchResults }) => {
  const { status } = useSelector((state: RootState) => state.movie);

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
          <div className="w-full h-48 overflow-hidden">
            {isValidImageUrl(movie.poster) ? (
              <Image
                width={300}
                height={450}
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
          <div className="p-4">
            <h2 className="text-lg font-medium mb-2">{movie.title}</h2>
            <p className="text-gray-400">{movie.year}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
