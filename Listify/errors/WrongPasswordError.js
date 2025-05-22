class WrongPasswordError extends Error {
    constructor(message = 'Wrong Password !') {
        super(message);
        this.name = 'WrongPasswordError';
        this.statusCode = 404;
      }
}

export default WrongPasswordError;