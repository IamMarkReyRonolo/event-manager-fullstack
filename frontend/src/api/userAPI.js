import axios from "axios";
const url = "https://event-manager-serverside.herokuapp.com/api/user";
axios.defaults.headers.common["auth-token"] =
	"Bearer " + localStorage.getItem("token");

export default class API {
	async getUsers() {
		axios.defaults.headers.common["auth-token"] =
			"Bearer " + localStorage.getItem("token");
		const users = await axios.get(url + "/all");
		console.log(users);
		return users;
	}

	async getSpecificUser() {
		axios.defaults.headers.common["auth-token"] =
			"Bearer " + localStorage.getItem("token");
		const user = await axios.get(url + "/specific");
		return user;
	}

	async signInUser(credentials) {
		const user = await axios.post(url + "/signIn", credentials);
		return user;
	}

	async createUser(newUser) {
		const user = await axios.post(url + "/signUp", newUser);
		console.log(user);
		return user;
	}

	async updateUser(userId, updatedUser) {
		const user = await axios.patch(url + "/" + userId, updatedUser);
		return user;
	}

	async deleteUser(userId) {
		const user = await axios.delete(url + "/" + userId);
		return user;
	}
}
