import React, { FC } from "react";
import Link from "next/link";
import logo from "../assets/logo.png";
import Image from "next/image";
import { FaHeart, FaSearch } from "react-icons/fa";
interface SearchProps {
  children: React.ReactNode;
}

const Header: FC<SearchProps> = ({ children }) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center py-4 px-6 bg-white shadow-md">
      <div className="flex items-center">
        <Link href="/">
          <Image src={logo} alt="Logo" className="w-8 h-8 md:mr-4" />
        </Link>
        <h1 className="text-xl font-bold">Movie Dashboard</h1>
      </div>
      <div className="flex items-center mt-4 md:mt-0">
        {children}
        <div className="ml-4 md:ml-8">
          <Link href="/favorites" className="flex items-center">
            <FaHeart className="text-red-500 mr-2" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
