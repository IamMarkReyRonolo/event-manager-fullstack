import axios from "axios";
const url = "https://event-manager-serverside.herokuapp.com/api/admin";
axios.defaults.headers.common["auth-token"] =
	"Bearer " + localStorage.getItem("token");

export default class API {
	async logIn(credentials) {
		const admin = await axios.post(url + "/signIn", credentials);
		return admin;
	}
}
