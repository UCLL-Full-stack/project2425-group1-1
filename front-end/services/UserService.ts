import { AuthRequest, User } from "@types";

const login = (data: AuthRequest) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const signup = (data: User) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const UserService = {
  login,
  signup,
};

export default UserService;
