import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { searchMovies } from "@/store/movieSlice";
import { AppDispatch } from "@/store/store";

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim()) {
      dispatch(searchMovies(query));
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form className="relative" onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a movie"
        className="py-2 pr-8 pl-4 rounded-full border-2 border-gray-200 focus:outline-none focus:border-blue-500"
      />
      <button type="submit" className="absolute right-0 top-0 mt-2 mr-2">
        <FaSearch className="inline-block text-gray-200" />
      </button>
    </form>
  );
};

export default SearchBar;
