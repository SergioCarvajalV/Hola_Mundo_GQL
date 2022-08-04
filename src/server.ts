import express from 'express';
import compression from 'compression';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(compression());
app.use('/', (re,res) => {
    res.send('Hola mundo');
})

const PORT = 5000
app.listen(
    { port: PORT},
    ()=> console.log(`Hola mundo API GQL http://localhost:${PORT}`)
);