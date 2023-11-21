const express = require('express')
const mongoose = require('mongoose')
const Image = require('./model')
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

MONGOOSE_URI = 'mongodb+srv://adbsr27:adarsh123@cluster0.yzdais4.mongodb.net/?retryWrites=true&w=majority'


mongoose.connect(MONGOOSE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
).then((data) => {
    console.log(`Connected to MongoDB ${data.connection.host}`);
}).catch((err) => {
    console.log(err);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
})

app.post('/upload', async (req, res) => {
    const { image } = req.body;
    try {
        const newimage = await Image.create({
            image: image
        })
        res.status(201).json({
            success: true,
            image: newimage
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        })
    }


})

app.get('/getimages', async (req, res) => {
    const images = await Image.find();
    res.status(200).json({ images });

})