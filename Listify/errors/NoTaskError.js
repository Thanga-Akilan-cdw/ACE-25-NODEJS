class NoTaskError extends Error{
    constructor(message = 'There is no task to display') {
        super(message);
        this.name = 'NoTaskError';
        this.statusCode = 404;
      }
    
}

export default NoTaskError;