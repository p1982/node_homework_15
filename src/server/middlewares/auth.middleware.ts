import * as jwt from "jsonwebtoken";
import * as express from "express";

// Define a custom interface that extends the Express Request interface
interface RequestWithAuth extends express.Request {
  auth?: any; // Define the 'auth' property here
}

export function verifyToken(
  req: RequestWithAuth, // Use your custom interface here
  res: express.Response,
  next: express.NextFunction
) {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, "QWE123");
    req.auth = decoded; // Use req.auth to set the 'auth' property
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}
