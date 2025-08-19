import express from 'express';
import { PORT } from './config/allConfig.js';
import { connectDB } from './config/dbConfig.js';
import { errorHandler } from './middlewares/errorHandler.js';
import userRouter from './routes/userRoute.js';
import postRouter from './routes/postRoute.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter); 


app.get('/', (req, res) => {
    res.send('Welcome to ImageGram API');
});

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    connectDB()
})

