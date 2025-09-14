class UserLoginError extends Error{
    constructor(message = 'Login to access this API') {
        super(message);
        this.name = 'UserLoginError';
        this.statusCode = 404;
      }
}

export default UserLoginError;