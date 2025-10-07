const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyJwt } = require('../middleware/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res.status(400).json({ message: 'Name, email and password are required' });
		}
		const existing = await User.findOne({ email });
		if (existing) {
			return res.status(409).json({ message: 'Email already registered' });
		}
		const passwordHash = await bcrypt.hash(password, 10);
		const user = await User.create({ name, email, passwordHash });
		return res.status(201).json({ user });
	} catch (error) {
		return res.status(500).json({ message: 'Registration failed', error: error.message });
	}
});

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: 'Email and password are required' });
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}
		const valid = await bcrypt.compare(password, user.passwordHash);
		if (!valid) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}
		const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'dev_secret', {
			expiresIn: '7d',
		});
		res.cookie('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});
		return res.json({ user, token });
	} catch (error) {
		return res.status(500).json({ message: 'Login failed', error: error.message });
	}
});

router.post('/logout', (req, res) => {
	res.clearCookie('token');
	return res.json({ message: 'Logged out' });
});

router.get('/me', verifyJwt, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		return res.json({ user });
	} catch (error) {
		return res.status(500).json({ message: 'Failed to fetch current user' });
	}
});

module.exports = router;
