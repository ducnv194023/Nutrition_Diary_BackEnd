const RoleApp = {
    ADMIN: 'admin',
    USER: 'user'
}

const StatusCode = {
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400,
    INTERNAL_SERVER: 500,
    OK: 200,
    CREATED: 201,
}

const ReasonStatusCode = {
    UNAUTHORIZED: 'Unauthorized',
    BAD_REQUEST: 'Bad request error',
    INTERNAL_SERVER: 'Internal error',
    OK: 'OK',
    CREATED: 'Created',
}

module.exports = {
    RoleApp,
    StatusCode,
    ReasonStatusCode,
}