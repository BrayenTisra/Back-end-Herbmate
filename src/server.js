require('dotenv').config()
const port = process.env.PORT || 5000;
const express = require('express');

const logGoogle = require('./controller/oauth.js')
const routesUsers = require('./routes/index.js');
const middlewareLogReq = require('./middleware/logs.js');
const questions = require('./controller/question.js');


const app = express();
app.use(middlewareLogReq);
app.use(express.json());
app.use('/images', express.static('public/images'));

app.use('/users', routesUsers);
app.use('/', logGoogle);

app.get('/api/questions/', (req, res) => {
    const parentId = req.query.parent_id || null;
    const filteredQuestions = questions.filter(q => q.parent_id == parentId);
    res.json(filteredQuestions);
});

//ENDPOINT GET by ID untuk mendapatkan detail jawaban
app.get('/api/answer/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const question = questions.find(q => q.id === id);
    if (question) {
        res.json({ answer: question.answer });
    } else {
        res.status(404).json({ error: "Question not found" });
    }
});

// Endpoint GET by ID untuk mendapatkan detail pertanyaan
app.get('/api/questions/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const question = questions.find(q => q.id === id);
    if (question) {
        res.json(question);
    } else {
        res.status(404).json({ error: "Question not found" });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message,
    });
});


app.listen(port, () => {
    console.log(`server berhasil berjalan di port ${port}`)
});