import axiosInstance from "./axiosInstance";

// Calls POST /api/auth/login on the .NET backend.
// Matches the LoginDto shape: { username, password }
export async function login(username, password) {
  const response = await axiosInstance.post("/auth/login", {
    username,
    password,
  });
  // Backend returns { token: "..." }
  return response.data.token;
}
