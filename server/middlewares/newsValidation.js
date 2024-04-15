export const newsAddValidation = async (req, res, next) => {
  const { category, title, target, desc, date, image } = req.body;

  if (!category || !title || !target || !desc || !date || !image) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  if (!category) {
    return res.status(400).json({ error: "Please enter category" });
  }

  if (!title) {
    return res.status(400).json({ error: "Please enter title" });
  }

  if (!target) {
    return res.status(400).json({ error: "Please enter target" });
  }

  if (!desc) {
    return res.status(400).json({ error: "Please enter desc" });
  }

  if (!date) {
    return res.status(400).json({ error: "Please enter date" });
  }

  if (!image) {
    return res.status(400).json({ error: "Please enter image" });
  }

  next();
};

export const newsUpdateValidation = async (req, res, next) => {
  const { newsId } = req.params;
  const { category, title, target, desc, date, image } = req.body;

  if (!category || !title || !target || !desc || !date || !image) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  if (!newsId) {
    return res.status(400).json({ error: "Please enter newsId" });
  }

  if (!category) {
    return res.status(400).json({ error: "Please enter category" });
  }

  if (!title) {
    return res.status(400).json({ error: "Please enter title" });
  }

  if (!target) {
    return res.status(400).json({ error: "Please enter target" });
  }

  if (!desc) {
    return res.status(400).json({ error: "Please enter desc" });
  }

  if (!date) {
    return res.status(400).json({ error: "Please enter date" });
  }

  if (!image) {
    return res.status(400).json({ error: "Please enter image" });
  }

  next();
};
