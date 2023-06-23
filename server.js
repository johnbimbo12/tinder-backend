import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js'
import Cors from 'cors'

// App Config
const app = express();
const port = process.env.port || 8001
const connection_url = 'mongodb+srv://admin:k2b74JWgXEjnFP5N@cluster0.fnlwsx3.mongodb.net/tinderdb?retryWrites=true&w=majority'

// Middlewares
app.use(express.json());
app.use(Cors());

// DB Config
mongoose.connect(connection_url, {})
.then(() => console.log('MongoDB connection established.'))
.catch((error) => console.error("MongoDB connection failed: ", error.message))


// API Endpoints
app.get('/', (req, res) => res.status(200).send('Hello Clever Programmers'));

app.post('/tinder/cards', async (req, res) => {
    const dbCard = req.body;

    var cards = await Cards.create(dbCard)
    .then(() => {
        res.status(201).send(cards)
    }).catch((error) => {
        res.status(500).send(error)
        console.error("Failed to post cards: ", error.message);
        process.exit(0);
    })
});

app.get('/tinder/cards', async (req, res) => {
    const dbCard = req.body;

    // var cards = [];
    await Cards.find()
    .then((result) => {
        res.status(200).send(result)
    }).catch((error) => {
        res.status(500).send(error)
        console.error("Failed to fetch cards: ", error.message);
        process.exit(0);
    });
    // res.status(200).send({
    //     status: 'Success',
    //     data: cards
    // });
    // res.status(500).send({
    //     status: 'Failed'
    // })

    // Cards.find().then((err, data) => {
    //     if (err){
    //         res.status(500).send(err)
    //     }
    //     else{
    //         res.status(200).send(data)
    //     }
    // })
});

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));