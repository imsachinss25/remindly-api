const User = require("../models/user");

exports.findUserByEmail = async ({ email }) => {
	return await User.findOne({ email });
}

exports.createUser = async ({ name, email, hashedPassword }) => {
	return await User.create({
		name,
		email,
		password: hashedPassword,
	});
}

exports.updateUserById = async ({ userId, name }) => {
	return await User.findByIdAndUpdate(
		userId,
		{ name },
		{ new: true }
	);
}