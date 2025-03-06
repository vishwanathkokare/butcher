import Home from "./Home.tsx";
import LogIn from "./LogIn.tsx";
import Market from "./Market.tsx";
import { useAdminAuth } from "@/contexts/AdminAuthContext.tsx";

const App: React.FC = () => {
  const { isAuthenticated } = useAdminAuth();
  return (
    <div className="min-h-screen bg-gray-200 dark:bg-zinc-800">
      {isAuthenticated ? (
        <>
          <Home /> <Market />
        </>
      ) : (
        <LogIn />
      )}
    </div>
  );
};

export default App;
