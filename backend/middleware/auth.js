const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_ADMIN;

function verifyAdmin(req, res, next) {
  const token = req.cookies.adminToken;

  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin") throw new Error();
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
}

module.exports = verifyAdmin;
