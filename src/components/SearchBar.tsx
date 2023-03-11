import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <form className="relative">
      <input
        type="text"
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
