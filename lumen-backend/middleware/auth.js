const jwt = require('jsonwebtoken');
module.exports = auth;
const jwt = require("jsonwebtoken");


//Authorisation de entrer
function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: "Token manquant" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalide" });
    req.user = user;
    next();
  });
}

//SEcurisation
module.exports = function (req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token manquant" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], "SECRETKEY");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide" });
  }
};


// backend/middleware/auth.js
const jwt = require("jsonwebtoken");

const auth = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token manquant" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Si roles précisés, vérifier l'accès
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Accès refusé" });
      }

      next();
    } catch (err) {
      res.status(401).json({ message: "Token invalide" });
    }
  };
};

module.exports = auth;