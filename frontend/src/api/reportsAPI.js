import axios from "axios";
const url = "http://localhost:3000/api/report";
axios.defaults.headers.common["auth-token"] =
	"Bearer " + localStorage.getItem("token");

export default class API {
	async getReports() {
		axios.defaults.headers.common["auth-token"] =
			"Bearer " + localStorage.getItem("token");
		const reports = await axios.get(url + "/all");
		return reports;
	}

	async addReport(id, report) {
		const reports = await axios.post(url + "/" + id, report);
		return reports;
	}
}
