<template>
	<div>
		<div v-if="load" class="loading">
			<v-progress-circular
				:size="70"
				:width="7"
				color="black"
				indeterminate
			></v-progress-circular>
		</div>

		<div v-if="error" class="error">
			{{ alert("Error") }}
		</div>

		<div v-if="fetched" class="">
			<v-app id="inspire">
				<v-app-bar app color="white" flat>
					<v-container class="py-0 fill-height">
						<v-avatar class="mr-5" color="grey darken-1" size="32"></v-avatar>
						<p class="mr-10">{{ userFullName }}</p>
						<v-btn text :to="'/user'" class="v-btn--active">
							Dashboard
						</v-btn>

						<v-spacer></v-spacer>
						<v-btn text :to="'/logout'">
							Log Out
						</v-btn>
					</v-container>
				</v-app-bar>

				<v-main class="grey lighten-2 mt-10">
					<v-container>
						<v-row>
							<v-col cols="3">
								<v-sheet rounded="lg">
									<v-list color="transparent">
										<v-list-item
											v-for="(nav, index) in navs"
											:key="index"
											:to="nav.link"
											link
										>
											<v-list-item-content>
												<v-list-item-title>
													<p class="navs">{{ nav.name }}</p>
												</v-list-item-title>
											</v-list-item-content>
										</v-list-item>

										<v-divider class="my-2"></v-divider>

										<v-list-item>
											<v-list-item-content>
												<v-list-item-title>
													<v-dialog v-model="dialog" max-width="500px">
														<template v-slot:activator="{ on, attrs }">
															<div class="buttonCreate">
																<v-btn
																	color="dark"
																	dark
																	v-bind="attrs"
																	v-on="on"
																>
																	Create Event</v-btn
																>
															</div>
														</template>
														<v-card light>
															<form
																action=""
																enctype="multipart/form-data"
																@submit.prevent="createEvent"
															>
																<v-card-title>
																	<div class="div">
																		<h1>Create Event</h1>
																	</div>
																</v-card-title>
																<v-card-text>
																	<v-container>
																		<v-row>
																			<v-col cols="12">
																				<v-text-field
																					label="Event Name*"
																					required
																					v-model="event.event_name"
																					dense
																					outlined
																				></v-text-field>
																			</v-col>

																			<v-col cols="12">
																				<v-text-field
																					label="Event Budget*"
																					outlined
																					v-model="event.event_budget"
																					dense
																					required
																					type="number"
																				></v-text-field>
																			</v-col>

																			<v-col cols="12">
																				<v-text-field
																					label="Event Location*"
																					v-model="event.event_location"
																					required
																					dense
																					outlined
																				></v-text-field>
																			</v-col>

																			<!--  -->

																			<v-col cols="12">
																				<v-menu
																					ref="menu"
																					v-model="menu"
																					:close-on-content-click="false"
																					:return-value.sync="event.event_date"
																					transition="scale-transition"
																					offset-y
																					min-width="auto"
																					light
																				>
																					<template
																						v-slot:activator="{ on, attrs }"
																					>
																						<v-text-field
																							v-model="event.event_date"
																							label="Date Purchased"
																							prepend-icon="mdi-calendar"
																							readonly
																							v-bind="attrs"
																							v-on="on"
																						></v-text-field>
																					</template>
																					<v-date-picker
																						v-model="event.event_date"
																						no-title
																						scrollable
																					>
																						<v-spacer></v-spacer>
																						<v-btn
																							text
																							color="primary"
																							@click="menu = false"
																						>
																							Cancel
																						</v-btn>
																						<v-btn
																							text
																							color="primary"
																							@click="
																								$refs.menu.save(
																									event.event_date
																								)
																							"
																						>
																							OK
																						</v-btn>
																					</v-date-picker>
																				</v-menu>
																			</v-col>

																			<!--  -->

																			<v-col cols="12">
																				<v-textarea
																					outlined
																					name="input-7-4"
																					label="Event Description*"
																					placeholder="Add description"
																					required
																					v-model="event.event_description"
																				></v-textarea>
																			</v-col>
																		</v-row>
																	</v-container>
																	<small>*indicates required field</small>
																</v-card-text>
																<v-card-actions>
																	<v-spacer></v-spacer>
																	<v-btn
																		color="black darken-4"
																		text
																		@click="dialog = false"
																	>
																		Cancel
																	</v-btn>
																	<!-- <v-btn color="white darken-4" text type="submit">
								Add Product
							</v-btn> -->

																	<v-btn
																		:disabled="dialog2"
																		:loading="dialog2"
																		class="white--text"
																		color="black darken-4"
																		type="submit"
																		light
																	>
																		Create Event
																	</v-btn>
																	<v-dialog
																		v-model="dialog2"
																		hide-overlay
																		persistent
																		width="300"
																	>
																		<v-card color="white" light>
																			<v-card-text>
																				<p mt-5>Adding event. Please wait.</p>
																				<v-progress-linear
																					indeterminate
																					color="black"
																					class="mb-0 mt-5"
																				></v-progress-linear>
																			</v-card-text>
																		</v-card>
																	</v-dialog>
																</v-card-actions>
															</form>
														</v-card>
													</v-dialog>
												</v-list-item-title>
											</v-list-item-content>
										</v-list-item>
									</v-list>
								</v-sheet>
							</v-col>

							<v-col>
								<v-sheet
									max-height="80vh"
									min-height="80vh"
									rounded="lg"
									class="con"
								>
									<router-view />
								</v-sheet>
							</v-col>
						</v-row>
					</v-container>
				</v-main>
			</v-app>
		</div>
	</div>
</template>

<script>
	import userAPI from "../api/userAPI";
	import eventsAPI from "../api/eventsAPI";

	export default {
		data: () => ({
			links: ["Dashboard", "Log Out"],
			navs: [
				{ name: "Approved Events", link: "/user" },
				{ name: "Declined Events", link: "/declined" },
				{ name: "Pending Events", link: "/pending" },
			],
			dialog: false,
			dialog2: false,
			menu: false,
			events: [],
			userFullName: "",
			event: {
				event_name: "",
				event_budget: 0,
				event_location: "",
				event_date: new Date().toISOString().substr(0, 10),
				event_description: "",
				event_status: "Pending",
			},
			load: false,
			fetched: null,
			error: null,
		}),

		methods: {
			async getUser() {
				try {
					this.load = true;
					const user = await userAPI.prototype.getSpecificUser();
					this.userFullName = user.data.fullname;
					this.fetched = user;
					this.load = false;
				} catch (error) {
					this.error = error;
					this.loading = false;
				}
			},

			async createEvent() {
				try {
					this.dialog2 = true;
					const event = await eventsAPI.prototype.createEvent(this.event);
					this.dialog2 = false;
					this.dialog = false;
					this.$router.push("/");
				} catch (error) {
					this.dialog2 = false;
					alert(error.message);
				}
			},
		},

		created() {
			if (localStorage.getItem("token")) {
				if (
					localStorage.getItem("historyRoute") == "/admin" ||
					localStorage.getItem("historyRoute") == "/users" ||
					localStorage.getItem("historyRoute") == "/reports"
				) {
					this.$router.push("/admin");
				}
			}

			this.getUser();
			localStorage.setItem("historyRoute", this.$route.fullPath);
		},
	};
</script>

<style scoped>
	.con {
		overflow-y: scroll;
	}

	p {
		margin: auto;
		padding: auto;
	}

	.navs,
	.buttonCreate {
		margin: auto;
		text-align: center;
	}

	.navs {
		font-weight: 500;
		font-size: 18px;
	}

	.div {
		text-align: center;

		margin: auto;
	}

	.v-card {
		padding: 20px;
	}

	.v-text-field {
		margin-top: 0px;
		margin-bottom: 0px;
	}

	.loading {
		font-weight: bold;
		text-align: center;
		font-size: 20px;
		padding: 20px;
		margin: auto;
	}
</style>
