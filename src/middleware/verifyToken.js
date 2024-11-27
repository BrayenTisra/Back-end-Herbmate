const jwt = require('jsonwebtoken');

const accessValidations = (req, res, next) => { 
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({
            message: 'Authorization header diperlukan',
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message: 'Token tidak ditemukan dalam header Authorization',
        });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error('JWT_SECRET tidak didefinisikan di environment variables');
        return res.status(500).json({
            message: 'Kesalahan server: JWT_SECRET tidak ditemukan',
        });
    }

    try {
        const jwtDecode = jwt.verify(token, secret);
        req.userData = jwtDecode;
    } catch (error) {
        let errorMessage = 'Unauthorized';
        if (error.name === 'TokenExpiredError') {
            errorMessage = 'Token telah kadaluarsa';
        } else if (error.name === 'JsonWebTokenError') {
            errorMessage = 'Token tidak valid';
        }

        return res.status(401).json({
            message: errorMessage,
        });
    }

    next();
};

module.exports = { accessValidations };
