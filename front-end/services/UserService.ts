import { AuthRequest } from "@types";

const login = (auth: AuthRequest) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(auth),
  });
};

const UserService = {
  login,
};

export default UserService;
