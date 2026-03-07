const throwAxiosError = (error) => {
    console.log(error);
    const errorMessage = error.response?.data?.message || error.message || 'An unknown API error occurred.';
    throw new Error(errorMessage);
};

const asyncWrapper = (fn) => async (...args) => {
    try {
        return await fn(...args);
    } catch (error) {
        throwAxiosError(error);
    }
};

export {
    throwAxiosError,
    asyncWrapper,
};
