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

		<div v-if="fetched" class="nain">
			<div class="headings">
				<h1>Declined Events</h1>
			</div>
			<div class="mainContent">
				<div v-if="getDeclinedEvents.length > 0">
					<v-card
						class="activity"
						dark
						v-for="event in getDeclinedEvents"
						:key="event.id"
					>
						<div class="actHeader">
							<h1>{{ event.event_name }}</h1>
							<h3 class="error--text">
								<i>{{ event.event_status }}</i>
							</h3>
							<v-spacer></v-spacer>
							<div class="buttons">
								<v-dialog
									transition="dialog-bottom-transition"
									max-width="500px"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-btn
											class="primary"
											fab
											x-small
											dark
											v-bind="attrs"
											v-on="on"
											><v-icon>mdi-update</v-icon></v-btn
										>
									</template>

									<template v-slot:default="dialog">
										<v-card light>
											<form
												action=""
												enctype="multipart/form-data"
												@submit.prevent="updateEvent(event, dialog)"
											>
												<v-card-title>
													<div class="div">
														<h1>Update Event</h1>
													</div>
												</v-card-title>
												<v-card-text>
													<v-container>
														<v-row>
															<v-col cols="12">
																<v-text-field
																	label="Event Name*"
																	required
																	dense
																	outlined
																	v-model="event.event_name"
																></v-text-field>
															</v-col>

															<v-col cols="12">
																<v-text-field
																	label="Event Budget*"
																	outlined
																	dense
																	required
																	v-model="event.event_budget"
																	type="number"
																></v-text-field>
															</v-col>

															<v-col cols="12">
																<v-text-field
																	label="Event Location*"
																	required
																	dense
																	v-model="event.event_location"
																	outlined
																></v-text-field>
															</v-col>

															<!--  -->

															<v-col cols="6">
																<p>Date Expires</p>
																<input
																	type="date"
																	name=""
																	id=""
																	v-model="event.event_date"
																	class="dateInput"
																	required
																/>
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
														@click="dialog.value = false"
													>
														Cancel
													</v-btn>
													<!-- <v-btn color="white darken-4" text type="submit">
								Add Product
							</v-btn> -->

													<v-btn
														:disabled="creatingEvent"
														:loading="creatingEvent"
														class="white--text"
														color="black darken-4"
														type="submit"
														light
													>
														Resubmit Event
													</v-btn>
													<v-dialog
														v-model="creatingEvent"
														hide-overlay
														persistent
														width="300"
													>
														<v-card color="white" light>
															<v-card-text>
																<p mt-5>Resubmitting event. Please wait.</p>
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
											><v-icon> mdi-trash-can-outline</v-icon></v-btn
										>
									</template>

									<template v-slot:default="dialog">
										<v-card light class="deleteCon">
											<v-card-title class="headline">
												Delete Event?
											</v-card-title>
											<v-card-text>This action can't be undone.</v-card-text>
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

				<div class="empty" v-if="getDeclinedEvents.length == 0">
					<h2>Empty</h2>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import eventsAPI from "../../api/eventsAPI";

	export default {
		name: "DeclinedEvents",
		data: () => ({
			load: false,
			error: null,
			fetched: null,
			creatingEvent: false,
			menu2: false,
			deleingEvent: false,
			declinedEvents: [],
			events: [],
		}),

		methods: {
			async getEvents() {
				try {
					this.load = true;
					const events = await eventsAPI.prototype.getEventsAsUser();
					this.events = events.data.events;
					this.fetched = this.events;
					this.load = false;
				} catch (error) {
					this.error = error;
					this.loading = false;
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

			async updateEvent(event, dialog) {
				try {
					this.creatingEvent = true;

					const data = {
						id: event.id,
						event_name: event.event_name,
						event_date: event.event_date,
						event_location: event.event_location,
						event_budget: event.event_budget,
						event_description: event.event_description,
						event_status: "Pending",
					};

					const ev = await eventsAPI.prototype.updateEvent(data);

					this.creatingEvent = false;
					dialog.value = false;

					if (ev.data.message == "Successfully updated event.") {
						event.event_status = "Pending";
					}
				} catch (error) {
					this.error = error;
					this.creatingEvent = false;
				}
			},
		},

		computed: {
			getDeclinedEvents() {
				return this.events
					.filter((event) => {
						if (event.event_status == "Declined") {
							return event;
						}
					})
					.sort((a, b) => {
						return b.id - a.id;
					});
			},
		},

		created() {
			this.getEvents();
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

	.dateInput {
		padding: 5px 10px;
		font-size: 18px;
		cursor: pointer;
		border: 1px solid grey;
		color: #1e1e1e;
		border-radius: 5px;
	}

	::-webkit-calendar-picker-indicator {
		background-color: white;
		cursor: pointer;
	}

	.empty {
		text-align: center;
	}

	.empty h2 {
		margin: 20px;
	}
</style>
