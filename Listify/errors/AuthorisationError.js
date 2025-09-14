class AuthorisationError extends Error{
    constructor(message = 'You are not authorised to access the resource') {
        super(message);
        this.name = 'AuthorisationError';
        this.statusCode = 404;
      }
    
}

export default AuthorisationError;