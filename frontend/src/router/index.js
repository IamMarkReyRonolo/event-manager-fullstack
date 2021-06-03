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

import LandingPage from "../views/LandingPageView.vue";
import UserSignIn from "../components/LandingPageComponents/UserSignIn.vue";
import AdminSignIn from "../components/LandingPageComponents/AdminSignIn.vue";

import LogOut from "../views/LogOut.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		component: LandingPage,
		children: [
			{
				path: "/",
				name: "UserSignIn",
				component: UserSignIn,
			},
			{
				path: "/adminSign",
				name: "AdminSignIn",
				component: AdminSignIn,
			},
		],
	},
	{ path: "/logout", name: "LogOut", component: LogOut },
	{
		path: "/user",
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
