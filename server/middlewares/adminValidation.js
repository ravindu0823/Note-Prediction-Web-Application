export const validateAdminAdd = (req, res, next) => {
  const { fullName, email, userName, password } = req.body;

  if (!userName && !password && !fullName && !email) {
    return res.status(400).json({ error: "Please enter all fields" });
  }

  if (!fullName) {
    return res.status(400).json({ error: "Please enter your fullName" });
  }

  if (!userName) {
    return res.status(400).json({ error: "Please enter your userName" });
  }

  if (!password) {
    return res.status(400).json({ error: "Please enter your password" });
  }

  if (!email) {
    return res.status(400).json({ error: "Please enter your email" });
  }

  next();
};

export const validateAdminLogin = (req, res, next) => {
  const { userName, password } = req.body;

  if (!userName && !password) {
    return res.status(400).json({ error: "Please enter all fields" });
  }

  if (!userName) {
    return res.status(400).json({ error: "Please enter your userName" });
  }

  if (!password) {
    return res.status(400).json({ error: "Please enter your password" });
  }

  next();
};
