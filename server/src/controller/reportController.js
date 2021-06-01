const models = require("../models");

const getAllReports = async (req, res, next) => {
	try {
		const reports = await models.Report.findAll({
			include: {
				model: models.Event,
				attributes: ["event_name"],
				include: { model: models.User, attributes: ["fullname"] },
			},
		});

		res.status(200).json(reports);
	} catch (error) {
		next(error);
	}
};

const addReport = async (req, res, next) => {
	try {
		const createReport = await models.Report.create({
			report_content: req.body.report,
			eventId: req.params.eventId,
		});
		if (!createReport) {
			const error = new Error("Not found");
			error.status = 404;
			next(error);
		} else {
			const update = await models.Event.update(
				{ event_status: req.body.event_status },
				{
					where: {
						id: req.params.eventId,
					},
				}
			);
			if (update) {
				res.status(200).json({ message: "Successfully created report" });
			} else {
				const error = new Error("Not found");
				error.status = 404;
				next(error);
			}
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllReports,
	addReport,
};
