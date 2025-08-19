export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    const success = false;
    const data = err.data || null;

    return res.status(statusCode).json({
        message,
        success,
        data,
        error: err.stack || null
    });
}