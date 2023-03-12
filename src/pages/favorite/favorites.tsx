import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removeFavorite } from "@/store/favoriteSlice";
import { TiArrowBack } from "react-icons/ti";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";


type Movie = {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
};

const FavoriteMovies = () => {
  const favorites = useSelector((state: RootState) => state.favorite.movies);

  const dispatch = useDispatch();

  const handleRemoveFavorite = (imdbID: any) => {
    dispatch(removeFavorite(imdbID));
  };

  return (
    <>
      <Header>
        <button>
          <Link href="/">
            <TiArrowBack className="text-black-500 mr-2 w-8 h-8" />
          </Link>
        </button>
      </Header>
      <div className="flex flex-col items-center py-6">
        <h2 className="text-2xl font-bold mb-4">Favorite Movies</h2>
        {favorites.length > 0 ? (
          <ul className="w-full max-w-lg">
            {favorites.map((movie: Movie) => (
              <li
                key={movie.imdbID}
                className="flex items-center py-2 border-b border-gray-200 last:border-b-0"
              >
                <Link
                  href={`/movies/${movie.imdbID}`}
                  className="flex items-center w-full"
                >
                  <div className="mr-4">
                    <Image
                      width="72"
                      height="108"
                      sizes="100vw"
                      src={movie.poster}
                      alt={`${movie.title} poster`}
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <h1 className="text-lg font-bold hover:text-blue-500 transition-colors duration-300 ease-in-out">
                    {movie.title}
                  </h1>
                </Link>
                <div className="flex justify-center">
                  <button
                    className="px-4 py-2 text-white bg-red-500 rounded-md shadow-lg hover:bg-red-600 transition-colors duration-300 ease-in-out"
                    onClick={() => {
                      handleRemoveFavorite(movie.imdbID);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-500">No favorite movies added yet!</p>
        )}
      </div>
    </>
  );
};

export default FavoriteMovies;
