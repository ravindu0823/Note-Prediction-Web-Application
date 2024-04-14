export const validateUserAdd = (req, res, next) => {
  const { userData } = req.body;

  if (
    !userData.userName &&
    !userData.password &&
    !userData.fullName &&
    !userData.email
  ) {
    return res.status(400).json({ error: "Please enter all fields" });
  }

  if (!userData.fullName) {
    return res.status(400).json({ error: "Please enter your fullName" });
  }

  if (!userData.userName) {
    return res.status(400).json({ error: "Please enter your userName" });
  }

  if (!userData.password) {
    return res.status(400).json({ error: "Please enter your password" });
  }

  if (!userData.email) {
    return res.status(400).json({ error: "Please enter your email" });
  }

  next();
};

export const validateUserLogin = (req, res, next) => {
  const { userData } = req.body;

  if (!userData.userName && !userData.password) {
    return res.status(400).json({ error: "Please enter all fields" });
  }

  if (!userData.userName) {
    return res.status(400).json({ error: "Please enter your userName" });
  }

  if (!userData.password) {
    return res.status(400).json({ error: "Please enter your password" });
  }

  next();
};

export const validateUserUpdate = (req, res, next) => {
  const { userId } = req.params;
  const { userData } = req.body;

  if (!userData.fullName && userData.email) {
    return res.status(400).json({ error: "Please enter all fields" });
  }

  if (!userId) {
    return res.status(400).json({ error: "Please enter your userId" });
  }

  if (!userData.fullName) {
    return res.status(400).json({ error: "Please enter your fullName" });
  }

  if (!userData.email) {
    return res.status(400).json({ error: "Please enter your email" });
  }

  next();
};
