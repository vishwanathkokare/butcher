import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { toast } from "react-hot-toast";
import Loading from "@/components/ui/Loading";

const LogIn: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Local loading state
  const { login } = useAdminAuth();

  const validatePassword = (password: string): string | null => {
    if (!password) {
      return "Password is required.";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must contain at least one special character.";
    }
    return null;
  };

  const handleLogin = async () => {
    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    setIsLoading(true); // Show loading spinner
    try {
      await login(password);
      toast.success("Login successful!");
      setError(null);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your password.");
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-zinc-800  flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <Button
            onClick={handleLogin}
            disabled={!password}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;