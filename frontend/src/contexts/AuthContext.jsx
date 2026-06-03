import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";

import {
  getMe,
  login as loginRequest,
  signup as signupRequest,
} from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => getMe(token),
    enabled: Boolean(token),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const user = data?.user || null;

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [token]);

  async function login(credentials) {
    const payload = await loginRequest(credentials);
    setToken(payload.token);
    queryClient.setQueryData(["auth", "me"], payload);
    return payload;
  }

  async function signup(credentials) {
    const payload = await signupRequest(credentials);
    setToken(payload.token);
    queryClient.setQueryData(["auth", "me"], payload);
    return payload;
  }

  function logout() {
    setToken(null);
    queryClient.clear();
  }

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      signup,
      logout,
      authLoading: isLoading,
      authError: error,
    }),
    [user, token, isLoading, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
