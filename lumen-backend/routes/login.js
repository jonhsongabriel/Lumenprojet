const jwt = require("jsonwebtoken");

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Login incorrect" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    "SECRETKEY",
    { expiresIn: "1d" }
  );

  res.json({
    token: token,
    role: user.role,
  });
});