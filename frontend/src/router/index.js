import Vue from "vue";
import VueRouter from "vue-router";
import UserView from "../views/UserView.vue";
import ApprovedEvents from "../components/UserComponents/ApprovedEvents.vue";
import DeclinedEvents from "../components/UserComponents/DeclinedEvents.vue";
import PendingEvents from "../components/UserComponents/PendingEvents.vue";

import AdminView from "../views/AdminView.vue";
import Requests from "../components/AdminComponents/Requests.vue";
import Reports from "../components/AdminComponents/Reports.vue";
import Users from "../components/AdminComponents/Users.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/user",
		name: "UserView",
		component: UserView,

		children: [
			{
				path: "/",
				name: "ApprovedEvents",
				component: ApprovedEvents,
			},
			{
				path: "/declined",
				name: "DeclinedEvents",
				component: DeclinedEvents,
			},
			{
				path: "/pending",
				name: "PendingEvents",
				component: PendingEvents,
			},
		],
	},
	{
		path: "/admin",
		name: "AdminView",
		component: AdminView,
		children: [
			{
				path: "/",
				name: "Requests",
				component: Requests,
			},
			{
				path: "/reports",
				name: "Reports",
				component: Reports,
			},
			{
				path: "/users",
				name: "Users",
				component: Users,
			},
		],
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
