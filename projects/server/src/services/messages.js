function success(message, data) {
    console.log();
    return {
        status: 200,
        message,
        data,
    };
}

function errorClient(message) {
    return {
        status: 400,
        message,
    };
}

function errorServer(message) {
    return {
        status: 500,
        message,
    };
}

function response({ message, data }) {
    if (!data) return { message };
    if (message === "") return { data };
    return { message, data };
}

module.exports = {
    success,
    errorClient,
    errorServer,
    response,
};
