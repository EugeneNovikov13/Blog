const mongoose = require('mongoose');
const { USER } = require('../constants/roles');

const UserSchema = mongoose.Schema({
	login: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: Number,
		default: USER,
	},
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;
