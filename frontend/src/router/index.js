import Vue from "vue";
import VueRouter from "vue-router";
import UserView from "../views/UserView.vue";
import ApprovedEvents from "../components/UserComponents/ApprovedEvents.vue";
import DeclinedEvents from "../components/UserComponents/DeclinedEvents.vue";
import PendingEvents from "../components/UserComponents/PendingEvents.vue";

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
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
