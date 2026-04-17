module.exports = function (roles = []) {
  return (req, res, next) => {

    // 🔐 sécurité : auth middleware obligatoire avant
    if (!req.user) {
      return res.status(401).json({ message: "Non authentifié" });
    }

    const userRole = req.user.role;

    // 🔥 sécuriser roles (string → array)
    if (typeof roles === "string") {
      roles = [roles];
    }

    // 🔥 si aucun rôle défini → accès libre
    if (roles.length > 0 && !roles.includes(userRole)) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    next();
  };
};