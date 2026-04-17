const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "lumen_secret_2026";

const auth = (roles = []) => {
  // sécurise si string est passé
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token manquant" });
    }

    // format attendu: Bearer token
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ message: "Format token invalide" });
    }

    const token = parts[1];

    try {
      const decoded = jwt.verify(token, SECRET_KEY);

      req.user = decoded;

      // 🔥 vérification des rôles
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Accès refusé" });
      }

      next();

    } catch (err) {
      console.error("JWT ERROR:", err.message);
      return res.status(401).json({ message: "Token invalide" });
    }
  };
};

module.exports = auth;