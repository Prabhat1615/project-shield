const securityHeaders = (req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
};

const requestLog = (req, res, next) => {
  const startedAt = Date.now();
  res.on("finish", () => {
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - startedAt}ms`);
  });
  next();
};

const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
};

const errorHandler = (error, req, res, next) => {
  if (res.headersSent) return next(error);

  const isMulterError = error.name === "MulterError";
  const status = error.status || (isMulterError ? 400 : 500);

  if (status >= 500) console.error(error);

  return res.status(status).json({
    success: false,
    message: status >= 500 ? "An unexpected server error occurred" : error.message,
  });
};

module.exports = {
  securityHeaders,
  requestLog,
  notFound,
  errorHandler,
};
