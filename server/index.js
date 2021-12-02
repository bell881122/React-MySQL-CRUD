const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const db = mysql.createPool({
    host: 'rds-mysql-10mintutorial.c4biag33tebm.ap-northeast-1.rds.amazonaws.com',
    user: 'bell881122',
    password: 'mypassword',
    database: 'CRUDDataBase',
})

// app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM movieReview;"
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})

app.post("/api/insert", (req, res) => {
    const { movieName, movieReview } = req.body;
    const sqlInsert = "INSERT INTO movieReview (movieName, movieReview) VALUES (?,?);"
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log("result", result)
        console.log("err", err)
        res.send('Hello World');
    })
})

app.listen(3001, () => {
    console.log('running on port 3001');
})