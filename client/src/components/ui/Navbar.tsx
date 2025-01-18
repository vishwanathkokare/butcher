import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHouse } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="text-black dark:text-white block md:hidden flex flex-row bg-gray-200 dark:bg-zinc-900 justify-evenly items-center  border border-1 border-black dark:border-white fixed bottom-0 w-full bg-white h-16">
      <a
        className="border-r border-black dark:border-white w-full h-full flex items-center justify-center"
        href="/"
      >
        <FontAwesomeIcon icon={faHouse} size="xl" />
      </a>
      <a
        className="w-full h-full flex items-center justify-center"
        href="/cart"
      >
        <FontAwesomeIcon icon={faShoppingCart} size="xl" />
      </a>
    </nav>
  );
};

export default Navbar;
