export const validateFeedback = (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, feedback } = req.body;

  if (!firstName && !lastName && !email && !phoneNumber && !feedback) {
    return res.status(400).json({ error: "Please enter all fields" });
  }

  if (!firstName) {
    return res.status(400).json({ error: "Please enter your firstName" });
  }

  if (!lastName) {
    return res.status(400).json({ error: "Please enter your lastName" });
  }

  if (!email) {
    return res.status(400).json({ error: "Please enter your email" });
  }

  if (!phoneNumber) {
    return res.status(400).json({ error: "Please enter your phoneNumber" });
  }

  if (!feedback) {
    return res.status(400).json({ error: "Please enter your feedback" });
  }

  next();
};
