const express = require('express');
const { google } = require('googleapis');
const router = express.Router();
const usersMod = require('../models/modUsers.js');
const jwt = require('jsonwebtoken');
const pool = require('../config/database.js');

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'http://localhost:8000/auth/google/callback'
);

const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
];

const authorizationURL = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true
});

router.get('/auth/google', (req, res) => {
    res.redirect(authorizationURL);
});

router.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;

    try {
        const { tokens } = await oauth2Client.getToken(code);

        oauth2Client.setCredentials(tokens);

        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2',
        });

        const { data } = await oauth2.userinfo.get();

        if (!data.email || !data.name) {
            return res.status(400).json({
                message: 'Data Google tidak valid',
            });
        }

        // const profile = data.picture;
        let [user] = await usersMod.login(data.email);

        if (!user) {
            const SQLQuery = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
            const params = [data.name, data.email, null];

            try {
                await pool.execute(SQLQuery, params);
                let [user] = await usersMod.login(data.email);

                const payload = {
                    id: user?.idUser,
                    username: user?.username,
                    email: user?.email
                };
                const secret = process.env.JWT_SECRET;
                const exp = 60 * 60 * 2;
                const token = jwt.sign(payload, secret, { expiresIn: exp });
        
                return res.json({
                    message: 'Login berhasil',
                    data: {
                        id: user.idUser,
                        username: user.username,
                        email: user.email
                    },
                    token: token,
                });
            } catch (error) {
                return res.status(500).json({
                    message: 'Kesalahan database',
                    serverMessage: error.message,
                });
            }
        }

        const payload = {
            id: user?.idUser,
            username: user?.username,
            email: user?.email
        };
        const secret = process.env.JWT_SECRET;
        const exp = 60 * 60 * 2;
        const token = jwt.sign(payload, secret, { expiresIn: exp });

        return res.json({
            message: 'Login berhasil',
            data: {
                id: user.idUser,
                username: user.username,
                email: user.email,
                // picture: user.profile
            },
            token: token,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Kesalahan server',
            serverMessage: error.message,
        });
    }
});

module.exports = router;
