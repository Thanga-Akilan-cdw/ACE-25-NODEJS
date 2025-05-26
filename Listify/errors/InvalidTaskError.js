class InvalidTaskError extends Error {
    constructor(message = 'Invalid Task') {
        super(message);
        this.name = 'InvalidTaskError';
        this.statusCode = 404;
      }
}

export default InvalidTaskError;