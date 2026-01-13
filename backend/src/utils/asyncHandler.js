const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        console.error(err.stack);
        next(err);
    });
};

export default asyncHandler;
