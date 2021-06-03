<template>
	<div class="declinedEventsContainer">
		<div v-if="load" class="loading">
			<v-progress-circular
				:size="70"
				:width="7"
				color="black"
				indeterminate
			></v-progress-circular>
		</div>

		<div v-if="error" class="error">
			error
		</div>

		<div v-if="fetched" class="main">
			<div class="headings">
				<h1>Event Requests</h1>
				<div class="options">
					<v-btn text @click="undone = true" :class="undone ? 'active' : ''"
						>Pending</v-btn
					>
					<v-btn text @click="undone = false" :class="!undone ? 'active' : ''"
						>Approved</v-btn
					>
				</div>
			</div>
			<div class="mainContent" v-if="undone">
				<div class="penAct" v-if="pendingActivities.length > 0">
					<v-card
						class="activity"
						dark
						v-for="event in pendingActivities"
						:key="event.id"
					>
						<div class="actHeader">
							<h1>{{ event.event_name }}</h1>
							<v-chip class="ma-2" color="grey darken-3" dark>
								{{ event.user.fullname }}
							</v-chip>
							<v-spacer></v-spacer>
							<div class="buttons">
								<v-dialog persistent max-width="290">
									<template v-slot:activator="{ on, attrs }">
										<v-btn
											class="success"
											fab
											x-small
											dark
											v-bind="attrs"
											v-on="on"
											outlined
											><v-icon> mdi-briefcase-upload-outline</v-icon></v-btn
										>
									</template>

									<template v-slot:default="dialog">
										<v-card light class="deleteCon">
											<v-card-title class="headline">
												Approve Event?
											</v-card-title>
											<v-card-text
												>Are you really sure you want to approve this
												proposal?</v-card-text
											>
											<v-card-actions>
												<v-spacer></v-spacer>
												<v-btn
													color="black darken-1"
													text
													@click="dialog.value = false"
												>
													Cancel
												</v-btn>

												<v-btn
													:disabled="deleingEvent"
													:loading="deleingEvent"
													class="white--text"
													color="green darken-1"
													text
													@click="updateEvent(event, dialog, 'Accepted')"
												>
													Agree
												</v-btn>
												<v-dialog
													v-model="deleingEvent"
													hide-overlay
													persistent
													width="300"
												>
													<v-card color="white" light>
														<v-card-text>
															<p mt-5>
																Updating event. Please wait.
															</p>
															<v-progress-linear
																indeterminate
																color="black"
																class="mb-0 mt-5"
															></v-progress-linear>
														</v-card-text>
													</v-card>
												</v-dialog>
											</v-card-actions>
										</v-card>
									</template>
								</v-dialog>

								<v-dialog persistent max-width="290">
									<template v-slot:activator="{ on, attrs }">
										<v-btn
											class="error"
											fab
											x-small
											dark
											v-bind="attrs"
											v-on="on"
											outlined
											><v-icon> mdi-close-outline</v-icon></v-btn
										>
									</template>

									<template v-slot:default="dialog">
										<v-card light class="deleteCon">
											<v-card-title class="headline">
												Decline Event?
											</v-card-title>
											<v-card-text
												>Are you really sure you want to decline this
												proposal?</v-card-text
											>
											<v-card-actions>
												<v-spacer></v-spacer>
												<v-btn
													color="black darken-1"
													text
													@click="dialog.value = false"
												>
													Cancel
												</v-btn>

												<v-btn
													:disabled="deleingEvent"
													:loading="deleingEvent"
													class="white--text"
													color="red darken-1"
													text
													@click="updateEvent(event, dialog, 'Declined')"
												>
													Agree
												</v-btn>
												<v-dialog
													v-model="deleingEvent"
													hide-overlay
													persistent
													width="300"
												>
													<v-card color="white" light>
														<v-card-text>
															<p mt-5>
																Updating event. Please wait.
															</p>
															<v-progress-linear
																indeterminate
																color="black"
																class="mb-0 mt-5"
															></v-progress-linear>
														</v-card-text>
													</v-card>
												</v-dialog>
											</v-card-actions>
										</v-card>
									</template>
								</v-dialog>
							</div>
						</div>
						<div class="actBody">
							<p>
								{{ event.event_description }}
							</p>
						</div>
						<div class="actFooter">
							<v-chip class="ma-2" color="grey darken-3" dark>
								<v-icon left>
									mdi-map-marker
								</v-icon>
								{{ event.event_location }}
							</v-chip>

							<v-chip class="ma-2" color="grey darken-3" dark>
								<v-icon left>
									mdi-calendar
								</v-icon>
								{{ event.event_date }}
							</v-chip>

							<v-chip class="ma-2" color="grey darken-3" dark>
								<v-icon left>
									mdi-cash
								</v-icon>
								P {{ event.event_budget }}
							</v-chip>
						</div>
					</v-card>
				</div>

				<div class="penAct" v-if="pendingActivities.length == 0">
					<h2>Empty</h2>
				</div>
			</div>

			<div class="mainContent" v-if="!undone">
				<div class="accAct" v-if="acceptedActivities.length > 0">
					<v-card
						class="activity"
						dark
						v-for="event in acceptedActivities"
						:key="event.id"
					>
						<div class="actHeader">
							<h1>{{ event.event_name }}</h1>
							<v-chip class="ma-2" color="grey darken-3" dark>
								{{ event.user.fullname }}
							</v-chip>
							<v-spacer></v-spacer>
							<div class="buttons">
								<v-dialog persistent max-width="290">
									<template v-slot:activator="{ on, attrs }">
										<v-btn
											class="error"
											fab
											x-small
											dark
											v-bind="attrs"
											v-on="on"
											outlined
											><v-icon> mdi-trash-can-outline</v-icon></v-btn
										>
									</template>

									<template v-slot:default="dialog">
										<v-card light class="deleteCon">
											<v-card-title class="headline">
												Delete Event?
											</v-card-title>
											<v-card-text
												>Are you really sure you want to delete this
												event?</v-card-text
											>
											<v-card-actions>
												<v-spacer></v-spacer>
												<v-btn
													color="black darken-1"
													text
													@click="dialog.value = false"
												>
													Cancel
												</v-btn>

												<v-btn
													:disabled="deleingEvent"
													:loading="deleingEvent"
													class="white--text"
													color="red darken-1"
													text
													@click="deleteEvent(event, dialog)"
												>
													Agree
												</v-btn>
												<v-dialog
													v-model="deleingEvent"
													hide-overlay
													persistent
													width="300"
												>
													<v-card color="white" light>
														<v-card-text>
															<p mt-5>
																Deleting product. Please wait.
															</p>
															<v-progress-linear
																indeterminate
																color="black"
																class="mb-0 mt-5"
															></v-progress-linear>
														</v-card-text>
													</v-card>
												</v-dialog>
											</v-card-actions>
										</v-card>
									</template>
								</v-dialog>
							</div>
						</div>
						<div class="actBody">
							<p>
								{{ event.event_description }}
							</p>
						</div>
						<div class="actFooter">
							<v-chip class="ma-2" color="grey darken-3" dark>
								<v-icon left>
									mdi-map-marker
								</v-icon>
								{{ event.event_location }}
							</v-chip>

							<v-chip class="ma-2" color="grey darken-3" dark>
								<v-icon left>
									mdi-calendar
								</v-icon>
								{{ event.event_date }}
							</v-chip>

							<v-chip class="ma-2" color="grey darken-3" dark>
								<v-icon left>
									mdi-cash
								</v-icon>
								P {{ event.event_budget }}
							</v-chip>
						</div>
					</v-card>
				</div>
				<div class="accAct" v-if="acceptedActivities.length == 0">
					<h2>Empty</h2>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import eventsAPI from "../../api/eventsAPI";
	export default {
		data: () => ({
			load: false,
			error: null,
			fetched: null,
			creatingEvent: false,
			menu2: false,
			deleingEvent: false,
			undone: true,
			events: [],
		}),

		methods: {
			async getEvents() {
				try {
					this.load = true;
					const events = await eventsAPI.prototype.getEventsAsAdmin();

					this.events = events.data;

					this.fetched = this.events;
					this.load = false;
				} catch (error) {
					this.error = error;
					this.loading = false;
				}
			},

			async updateEvent(event, dialog, status) {
				try {
					this.deleingEvent = true;

					const data = {
						id: event.id,
						event_name: event.event_name,
						event_date: event.event_date,
						event_location: event.event_location,
						event_budget: event.event_budget,
						event_description: event.event_description,
						event_status: status,
					};
					const ev = await eventsAPI.prototype.updateEvent(data);

					this.deleingEvent = false;
					dialog.value = false;

					if (ev.data.message == "Successfully updated event.") {
						event.event_status = status;
					}
				} catch (error) {
					this.error = error;
					this.deleingEvent = false;
				}
			},

			async deleteEvent(event, dialog) {
				try {
					this.deleingEvent = true;
					const ev = await eventsAPI.prototype.deleteEvent(event.id);

					this.deleingEvent = false;
					dialog.value = false;

					if (ev.data.message == "Successfully deleted event.") {
						event.event_status = "Deleted";
					}
				} catch (error) {
					this.error = error;
					this.deleingEvent = false;
				}
			},
		},

		async created() {
			await this.getEvents();
		},

		computed: {
			pendingActivities: function() {
				return this.events.filter((event) => {
					if (event.event_status == "Pending") {
						return event;
					}
				});
			},
			acceptedActivities: function() {
				return this.events.filter((event) => {
					if (event.event_status == "Accepted") {
						return event;
					}
				});
			},
		},
	};
</script>

<style scoped>
	.headings {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 40px;
	}

	.headings .options {
		display: flex;
		justify-content: space-around;
	}
	button {
		margin: 0px 5px;
	}

	/*  */

	.activity {
		margin: 20px 40px;
		padding: 10px 30px;
	}

	.actHeader {
		display: flex;
		align-items: center;
		padding-bottom: 0px;
	}

	.actHeader h1 {
		padding-right: 10px;
	}

	.actHeader h3 {
		font-weight: lighter;
	}

	.actBody p {
		padding: 5px 30px;
		text-align: justify;
	}

	.actFooter {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	/*  */
	.loading {
		font-weight: bold;
		text-align: center;
		font-size: 20px;
		padding: 100px;
		margin: auto;
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

	.deleteCon {
		padding: 10px;
	}

	.active {
		background-color: #1e1e1e;
		color: #e1e1e1;
	}

	.penAct h2 {
		text-align: center;
	}

	.accAct h2 {
		text-align: center;
	}
</style>
