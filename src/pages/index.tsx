import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import MovieList, { MovieListProps } from "@/components/MovieList";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Home = () => {
  const results = useSelector((state: RootState) => state.movie.results);

  const movieListProps: MovieListProps = {
    searchResults: results,
  };

  return (
    <>
      <Header>
        <SearchBar />
      </Header>
      <div>
        <MovieList {...movieListProps} />
      </div>
    </>
  );
};
export default Home;
