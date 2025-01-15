import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart ,faHouse} from '@fortawesome/free-solid-svg-icons';

const Navbar = () =>{
    return(
        <nav className="flex flex-row  justify-evenly items-center  border border-1 border-black fixed bottom-0 w-full bg-white h-16">
            <a className='border-r border-black w-full h-full flex items-center justify-center' href='/'><FontAwesomeIcon icon={faHouse} size="xl" /></a>
            <a className='w-full h-full flex items-center justify-center' href='/cart'><FontAwesomeIcon icon={faShoppingCart} size="xl" /></a>
        </nav>
    )
}

export default Navbar