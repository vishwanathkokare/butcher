import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHouse } from "@fortawesome/free-solid-svg-icons";



const Header: React.FC = () => {
  return (
    <header className="bg-slate-50 text-black py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl ml-5 md:ml-0 font-bold">
          <Link to="/">Butcher</Link>
        </div>
        <nav className="space-x-4 hidden md:block">
          <Link to="/" className="hover:text-gray-400">
          <FontAwesomeIcon className="mr-1" icon={faHouse} size="lg" />
            Home
          </Link>
          <Link to="/cart" className="hover:text-gray-400">
            Cart
          <FontAwesomeIcon className="ml-1" icon={faShoppingCart} size="lg" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
