export const enum StatusCodes {
    OK = 200,
    Created = 201,
    NoContent = 204,
    BadRequest = 400,
    NotFound = 404,
    InternalServerError = 500
}

export const enum StatusMessages {
    OK = 'The request is OK',
    Created = 'The request has been fulfilled, and a new resource is created',
    NoContent = 'The request has been successfully processed, but is not returning any content',
    BadRequest = 'The request cannot be fulfilled due to bad syntax',
    NotFound = 'The requested page could not be found but may be available again in the future',
    InternalServerError = 'Internal Server Error but it may be available again in the future'
}
