const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signInUser = async (req, res, next) => {
	try {
		const exist = await models.User.findOne({
			where: { username: req.body.username },
		});

		if (!exist) {
			const error = new Error("Username does not exist");
			error.status = 400;
			next(error);
		}

		const pass = await bcrypt.compare(req.body.password, exist.password);
		if (!pass) {
			const error = new Error("Password is wrong");
			error.status = 400;
			next(error);
		}

		const token = await jwt.sign(exist.id, process.env.TOKEN_SECRET);
		res.header("auth-token", token);

		res.status(200).json({
			success_message: "You are logged in",
			user: {
				id: exist.id,
				name: exist.fullname,
				username: exist.username,
				token: token,
			},
		});
	} catch (error) {
		next(error);
	}
};

const signUpUser = async (req, res, next) => {
	try {
		const adminExist = await models.Admin.findByPk(req.user);
		if (!adminExist) {
			const error = new Error("Admin not found");
			error.status = 404;
			next(error);
		}
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		const exist = await models.User.findOne({
			where: { username: req.body.username },
		});

		if (exist) {
			const error = new Error("Username already exists");
			error.status = 401;
			next(error);
		} else {
			const user = await models.User.create({
				fullname: req.body.fullname,
				username: req.body.username,
				password: hashPassword,
				adminId: req.user,
			});

			res.status(200).json({
				success_message: "Successfully created!",
				user,
			});
		}
	} catch (error) {
		next(error);
	}
};

const getAllUsers = async (req, res, next) => {
	try {
		const users = await models.User.findAll({ where: { adminId: req.user } });
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

const updateUser = async (req, res, next) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		const data = {
			fullname: req.body.fullname,
			username: req.body.username,
			password: hashPassword,
		};

		const update = await models.User.update(data, {
			where: {
				id: req.params.userId,
				adminId: req.user,
			},
		});

		if (!update) {
			const error = new Error("Not found");
			error.status = 404;
			next(error);
		} else {
			res.status(200).json({ message: "Successfully updated user." });
		}
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		const data = {
			fullname: req.body.fullname,
			username: req.body.username,
			password: req.body.password,
		};
		const deleted = await models.User.destroy({
			where: {
				id: req.params.userId,
				adminId: req.user,
			},
		});

		if (!deleted) {
			const error = new Error("Not found");
			error.status = 404;
			next(error);
		} else {
			res.status(200).json({ message: "Successfully deleted user." });
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllUsers,
	updateUser,
	deleteUser,
	signInUser,
	signUpUser,
};
