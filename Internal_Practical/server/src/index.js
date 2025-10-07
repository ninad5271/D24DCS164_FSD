const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { connectToDatabase } = require('./config/db');
const authRouter = require('./routes/auth');

const app = express();
const port = process.env.PORT || 5000;
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:3000';

app.use(cors({ origin: clientOrigin, credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (_req, res) => {
	return res.json({ status: 'ok', timestamp: Date.now() });
});

app.use('/api/auth', authRouter);

connectToDatabase()
	.then(() => {
		app.listen(port, () => {
			console.log(`Server listening on http://localhost:${port}`);
		});
	})
	.catch((error) => {
		console.error('Failed to start server due to DB error:', error);
		process.exit(1);
	});
