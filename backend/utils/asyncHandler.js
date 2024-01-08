const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
      Promise.resolve(requestHandler(req, res, next))
        .catch(next)
        .catch((err) => next(err));
    };
  };

  export { asyncHandler };