const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  // Extract the token from Authorization header or request body
  let token = req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    // If no token is provided, return a 403 error
    return res.status(403).send({ message: "A token is required for authentication" });
  }

  try {
    // Remove 'Bearer ' prefix if it's included in the token
    token = token.replace(/^Bearer\s+/, "");

    // Verify the token with the secret key from the environment variables
    const decoded = jwt.verify(token, config.TOKEN_KEY);

    // Attach the decoded user information to the request object
    req.user = decoded;

  } catch (err) {
    // Log the error to the console for debugging purposes
    console.error("Token verification failed:", err);

    // Return a 401 error if the token is invalid
    return res.status(401).send({ message: "Invalid Token" });
  }

  // Continue to the next middleware or route handler
  return next();
};

module.exports = verifyToken;
