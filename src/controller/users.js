const usersMod = require('../models/modUsers.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAllUsers = async(req, res) => {
    try {
        const [data] = await usersMod.getAllUsers();
        res.json({
            message: 'GET all users successfully',
            data: data
        });    
    } catch (error) {
        res.status(500).json({
            message: 'Database Error',
            serverMessage: error
        })
    }
}

const login = async(req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({
            message: 'Email tidak ditemukan',
            data: null
        });
    }

    if (!password) {
        return res.status(400).json({
            message: 'Mohon isi password',
            data: null
        });
    }

    try {
        const [data] = await usersMod.login(email);

        if (!data) {
            return res.status(404).json({
                message: 'Email tidak terdaftar',
                data: null
            });
        }

        const isPWValid = await bcrypt.compare(password, data.password);
        if (isPWValid) {
            const { password, ...userData } = data;
            const payload = {userData}
            const secret = process.env.JWT_SECRET;
            const exp = 60 * 60 * 2;
            const token = jwt.sign(payload, secret, {expiresIn: exp});
            return res.json({
                message: 'Login berhasil',
                data: userData,
                token: token
            });
        } else {
            return res.status(403).json({
                message: 'Password salah',
                data: null
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Terjadi kesalahan pada server',
            serverMessage: error.message
        });
    }
    
}

const createUser = async(req, res) => {
    const {body} = req;

    if(!body.username || !body.email || !body.password){
        return res.status(400).json({
            message: 'Invalid Data',
            data: null
        })
    }
    const [cekEmail] = await usersMod.login(body.email);
    if(cekEmail != undefined){
        return res.status(400).json({
            message: 'Email already in use',
            data: null
        })
    }

    try {
        await usersMod.createUser(body);
        const [data] = await usersMod.login(body.email);
        const { password, ...userData } = data;
        res.status(201).json({
            message: 'Create user successfully',
            data: userData
        })
    } catch (error) {
        res.status(500).json({
            message: 'Database Error',
            serverMessage: error
        })
    }
}

const updateUser = async(req, res) => {
    const { email } = req.params;
    const {body} = req;
    try {
        await usersMod.updateUser(body, email);
        res.json({
            message: 'Update user successfully',
            data: {
                body,
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Database Error',
            serverMessage: error
        })
    }
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    login
}