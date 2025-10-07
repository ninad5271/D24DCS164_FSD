const { Schema, model } = require('mongoose');

const userSchema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, lowercase: true, trim: true },
		passwordHash: { type: String, required: true },
	},
	{ timestamps: true }
);

userSchema.methods.toJSON = function toJSON() {
	const obj = this.toObject();
	delete obj.passwordHash;
	return obj;
};

const User = model('User', userSchema);

module.exports = User;
