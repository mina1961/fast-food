// Utility functions for error parsing, etc.
function parseError(err) {
    if (Array.isArray(err)) {
        return err.map(e => e.msg || e.message);
    } else if (err instanceof Error) {
        return [err.message];
    } else if (typeof err === 'string') {
        return [err];
    }
    return ['Unknown error'];
}

module.exports = { parseError };