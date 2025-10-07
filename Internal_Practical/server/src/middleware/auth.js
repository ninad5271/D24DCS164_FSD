const jwt = require('jsonwebtoken');

function verifyJwt(req, res, next) {
	const authHeader = req.headers.authorization || '';
	const tokenFromHeader = authHeader.startsWith('Bearer ')
		? authHeader.substring('Bearer '.length)
		: null;
	const token = tokenFromHeader || req.cookies?.token;
	if (!token) {
		return res.status(401).json({ message: 'Authentication required' });
	}
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
		req.user = payload;
		return next();
	} catch (error) {
		return res.status(401).json({ message: 'Invalid or expired token' });
	}
}

module.exports = { verifyJwt };
