import { registerUser, loginUser } from "./auth.service.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    return res.status(201).json({
      message: "Registration successful",
      user,
    });
  } catch (err) {
    console.error(err);

    if (err.message === "USERNAME_TAKEN") {
      return res.status(400).json({ message: "Username already exists" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    const { token, ...user } = result;

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error(err);

    if (err.message === "INVALID_CREDENTIALS") {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};
