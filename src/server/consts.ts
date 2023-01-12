export const enum StatusCodes {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500
}

export const enum StatusMessages {
    OK = 'The request is OK',
    CREATED = 'The request has been fulfilled, User is created',
    NO_CONTENT = 'The request has been successfully processed, User is deleted',
    BAD_REQUEST = 'The request cannot be fulfilled due to bad syntax',
    NOT_FOUND = 'The requested page could not be found',
    INTERNAL_SERVER = 'Internal Server Error but it may be available again in the future'
}
