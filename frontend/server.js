const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <h2>Enter Details</h2>
        <form method="POST" action="/submit">
            Name: <input type="text" name="name"><br><br>
            Age: <input type="number" name="age"><br><br>
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/submit', async (req, res) => {
    try {
        const { name, age } = req.body;

        const response = await fetch('http://backend:5000/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, age })
        });

        const data = await response.json();

        res.send(`<h3>${data.message}</h3>`);
    } catch (error) {
        console.error(error);
        res.send("Error connecting to backend");
    }
});

app.listen(4000, () => {
    console.log("Frontend running on http://localhost:4000");
})