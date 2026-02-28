/**
 * Centralized Error Handler
 * This function catches any errors thrown in the routes or controllers
 * and sends a clean error message to the client.
 */
const errorHandler = (err, req, res, next) => {
    // 1. Log the error to the server console for the developer to see
    console.error("--- SERVER ERROR ---");
    console.error(err.stack);
    console.error("--------------------");

    // 2. Determine the status code (default to 500 Internal Server Error)
    const statusCode = err.status || 500;

    // 3. Send the error response in JSON format
    res.status(statusCode).json({
        error: err.message || "An unexpected error occurred on the server.",
        // Only show the stack trace in development mode if needed
        // (Hidden here for security)
    });
};

module.exports = errorHandler;