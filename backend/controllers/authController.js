import { login, register } from "../services/authService.js";

export const registerUser = async (req, res) => {
  try {
    const result = await register(req.body);
    res.json({
      message: "Register success",
      user: {
        id: result.user._id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
      },
      token: result.token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const result = await login(req.body);
    res.json({
      message: "Login success",
      user: {
        id: result.user._id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
      },
      token: result.token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
