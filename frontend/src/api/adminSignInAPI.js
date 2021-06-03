import axios from "axios";
const url = "http://localhost:3000/api/admin";
axios.defaults.headers.common["auth-token"] =
	"Bearer " + localStorage.getItem("token");

export default class API {
	async logIn(credentials) {
		const admin = await axios.post(url + "/signIn", credentials);
		return admin;
	}
}
