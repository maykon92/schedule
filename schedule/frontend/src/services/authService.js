import { api, requestConfig } from "../utils/config";

// Register a user
const register = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const response = await fetch(api + "/users/register", config);
    const resData = await response.json();

    if (response.ok && resData._id && resData.token) {
      localStorage.setItem("user", JSON.stringify(resData));
    }

    return resData;
  } catch (error) {
    console.log(error);
    return { errors: ["Erro de conexão."] };
  }
};

// Logout a user
const logout = () => {
  localStorage.removeItem("user");
};

// Sign in a user
const login = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const response = await fetch(api + "/users/login", config);
    const resData = await response.json();

    if (response.ok && resData._id && resData.token) {
      localStorage.setItem("user", JSON.stringify(resData));
    }

    return resData;
  } catch (error) {
    return { errors: ["Erro de conexão."] };
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;