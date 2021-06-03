import axios from "axios";
const url = "https://event-manager-serverside.herokuapp.com/api/event";
axios.defaults.headers.common["auth-token"] =
	"Bearer " + localStorage.getItem("token");

export default class API {
	async createEvent(createEvent) {
		const event = await axios.post(url + "/create", createEvent);
		return event;
	}

	async getEventsAsAdmin() {
		axios.defaults.headers.common["auth-token"] =
			"Bearer " + localStorage.getItem("token");
		const events = await axios.get(url + "/admin/all");
		return events;
	}

	async getEventsAsUser() {
		axios.defaults.headers.common["auth-token"] =
			"Bearer " + localStorage.getItem("token");
		const events = await axios.get(url + "/user/all");
		return events;
	}

	async updateEvent(eventUpdate) {
		const event = await axios.patch(url + "/" + eventUpdate.id, eventUpdate);
		return event;
	}

	async deleteEvent(eventId) {
		const event = await axios.delete(url + "/" + eventId);
		return event;
	}
}
