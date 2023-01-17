class ErrorModel {
    
    constructor(error) { 
        this.code = error.code;
        this.message = error.message;
        this.description = error.description;
    }

    errorMessage() {
        return `${this.code} ${this.message} ${this.description}`;
    }
}

module.exports = ErrorModel;