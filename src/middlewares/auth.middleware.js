const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (decoded.role !== "artist") {
      return res.status(403).json({ error: "Forbidden" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function authUser(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { authArtist, authUser };
