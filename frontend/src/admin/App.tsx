import Home from "./Home.tsx";
import LogIn from "./LogIn.tsx";
import Market from "./Market.tsx";
import { useAdminAuth } from "@/contexts/AdminAuthContext.tsx";

const App: React.FC = () => {
  const { isAuthenticated } = useAdminAuth();
  return (
    <>
      {isAuthenticated ? (
        <>
          <Home /> <Market />
        </>
      ) : (
        <LogIn />
      )}
    </>
  );
};

export default App;
