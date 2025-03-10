import HomeBox from "./components/ui/HomeBox";
import Chicken from "@/assets/chicken.webp";
import Mutton from "@/assets/goat.png"
import Eggs from "@/assets/egg.png";
import Beef from "@/assets/beef.png";
const Home = () => {
  return (
    <div className="bg-gray-200 dark:bg-zinc-800 h-screen">
    <div className=" container mx-auto p-6 pb-24">
      <div className="grid grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HomeBox Image={Chicken} Name="Chicken" />
        <HomeBox Image={Mutton} Name="Mutton" />
        <HomeBox Image={Eggs} Name="Eggs" />
        <HomeBox Image={Beef} Name="Beef" />
      </div>
    </div>
    </div>
  );
};

export default Home;
