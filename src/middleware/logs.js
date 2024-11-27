const logReq = (req, res, next) => {
    console.log('Terjadi request ke Path : ', req.path);
    next();
}


module.exports = logReq;