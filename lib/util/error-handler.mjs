import logger from './logger.mjs';

export default (err, res) => {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    logger.error(err);
    return res.status(500).json({ message: 'Technical Error, please try again.' });
}
