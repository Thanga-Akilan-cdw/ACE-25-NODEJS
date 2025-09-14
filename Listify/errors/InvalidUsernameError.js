class InvalidUsernameError extends Error {
    constructor(message = 'Invalid username') {
        super(message);
        this.name = 'InvalidUsernameError';
        this.statusCode = 404;
      }
}

export default InvalidUsernameError;