import HomeBox from "./components/ui/HomeBox";
import Chicken from "@/assets/chicken.webp";
import Mutton from "@/assets/goat.jpg";
import Eggs from "@/assets/eggs.webp";
import Navbar from "./components/ui/Navbar";
const Home = () => {
  return (
    <>
    <div className="container mx-auto p-6 pb-24">
      <h1 className="text-4xl font-semibold text-left text-gray-800 mb-8">
        Categories
      </h1>
      <div className="grid grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HomeBox Image={Chicken} Name="Chicken" />
        <HomeBox Image={Mutton} Name="Mutton" />
        <HomeBox Image={Eggs} Name="Eggs" />
      </div>
    </div>
    <Navbar />
    </>
  );
};

export default Home;
