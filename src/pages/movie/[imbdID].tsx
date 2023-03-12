import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { TiArrowBack } from "react-icons/ti";
import { RootState } from "@/store/store";
import Header from "@/components/Header";

const MovieDetails = () => {
  const movie = useSelector((state: RootState) => state.movie.selectedMovie);

  if (!movie) {
    return <div>Loading movie details...</div>;
  }

  return (
    <>
      <Header>
        <button>
          <Link href="/">
            <TiArrowBack className="text-black-500 mr-2 w-8 h-8" />
          </Link>
        </button>
      </Header>

      <div className="flex flex-col items-center my-4 sm:flex-row sm:items-start sm:justify-center">
        <Image
          width="0"
          height="0"
          sizes="100vw"
          src={movie.poster}
          alt={`${movie.title} poster`}
          className="w-48 h-72 object-cover rounded-lg shadow-lg mr-4"
        />
        <div className="flex flex-col pt-2">
          <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-500 mb-2">Year: {movie.year}</p>
          <p className="text-gray-500 mb-2">IMDb ID: {movie.imdbID}</p>
          <p className="text-gray-500">{movie.plot}</p>
        </div>
      </div>

      <div className="flex flex-col items-center sm:flex-row sm:justify-center">
        <div className="flex flex-col items-center sm:mr-8">
          <h2 className="text-lg font-bold mb-2">Actors</h2>
          <p className="text-gray-500">{movie.actors}</p>
        </div>
        <div className="flex flex-col items-center sm:mr-8">
          <h2 className="text-lg font-bold mb-2">Director</h2>
          <p className="text-gray-500">{movie.director}</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold mb-2">Ratings</h2>
          <p className="text-gray-500">{movie.ratings}</p>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
