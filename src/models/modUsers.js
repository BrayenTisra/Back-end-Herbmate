const pool = require('../config/database.js');
const bcrypt = require('bcrypt');

const getAllUsers = () => {
    const SQLQuery = 'SELECT * FROM users'
    
    return pool.execute(SQLQuery);
}

const login = async (email) => {
    const SQLQuery = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await pool.execute(SQLQuery, [email]);
    return rows;
};

const createUser = async(body) => {
    const hashedPW = await bcrypt.hash(body.password, 10);
    const SQLQuery = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    const params = [body.username, body.email, hashedPW];
    const [rows] = await pool.execute(SQLQuery, params);
    return rows;
}

const updateUser = async(body, email) => {
    const hashedPW = await bcrypt.hash(body.password, 10);
    const SQLQuery = `UPDATE users SET username= '${body.username}', password= '${hashedPW}' WHERE email= ?`; 

    const [row] = await pool.execute(SQLQuery, [email]);

    return row;
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    login
}