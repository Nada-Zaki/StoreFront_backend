import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

const corsOptions = {
	origin: 'http://someotherdomain.com',
	optionsSuccessStatus: 200
};

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100 // limit each IP to 100 requests per windowMs
});

app.use(bodyParser.json(), helmet(), limiter, cors(corsOptions));
app.use('/', routes);

app.listen(port, () => {
	console.log(`server starts at http://localhost:${port}`);
});

export default app;
