<template>
	<div class="createdEventsContainer">
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
				<h1>Approved Events</h1>
				<div class="options">
					<v-btn text @click="undone = true" :class="undone ? 'active' : ''"
						>Undone</v-btn
					>
					<v-btn text @click="undone = false" :class="!undone ? 'active' : ''"
						>Done</v-btn
					>
				</div>
			</div>
			<div class="mainContent" v-if="undone">
				<div v-if="getUnreportedEvents.length > 0">
					<v-card
						class="activity"
						dark
						v-for="event in getUnreportedEvents"
						:key="event.id"
					>
						<div class="actHeader">
							<h1>{{ event.event_name }}</h1>
							<h3 class="success--text">
								<i>{{ event.event_status }}</i>
							</h3>
							<v-spacer></v-spacer>
							<v-dialog persistent max-width="500">
								<template v-slot:activator="{ on, attrs }">
									<v-btn
										class="success"
										fab
										x-small
										dark
										v-bind="attrs"
										v-on="on"
										outlined
										><v-icon> mdi-check</v-icon></v-btn
									>
								</template>

								<template v-slot:default="dialog">
									<v-card light class="deleteCon">
										<v-card-title class="headline">
											Event Done?
										</v-card-title>
										<v-col cols="12">
											<v-textarea
												outlined
												label="Write a report for the event"
												required
												v-model="report"
											></v-textarea>
										</v-col>
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
												@click="addReport(event.id, event, dialog)"
											>
												Submit Report
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
															Submitting Report. Please wait.
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
				<div class="empty" v-if="getUnreportedEvents.length == 0">
					<h2>Empty</h2>
				</div>
			</div>
			<div class="doneContainer" v-if="!undone">
				<div v-if="getReportedEvents.length > 0">
					<v-card
						class="activity"
						dark
						v-for="event in getReportedEvents"
						:key="event.id"
					>
						<div class="actHeader">
							<h1>{{ event.event_name }}</h1>
							<h3 class="success--text"><i>Done</i></h3>
							<v-spacer></v-spacer>
							<v-dialog max-width="500">
								<template v-slot:activator="{ on, attrs }">
									<v-btn
										class="success"
										fab
										x-small
										dark
										v-bind="attrs"
										v-on="on"
										outlined
										><v-icon>
											mdi-newspaper-variant-multiple-outline</v-icon
										></v-btn
									>
								</template>

								<template v-slot:default="dialog">
									<v-card light class="deleteCon">
										<v-card-title class="headline">
											Event Report
										</v-card-title>
										<v-col cols="12">
											<p class="report">
												{{ event.report.report_content }}
											</p>
										</v-col>
										<v-card-actions>
											<v-spacer></v-spacer>
											<v-btn
												color="black darken-1"
												text
												@click="dialog.value = false"
											>
												Cancel
											</v-btn>
										</v-card-actions>
									</v-card>
								</template>
							</v-dialog>
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

				<div class="empty" v-if="getReportedEvents.length == 0">
					<h2>Empty</h2>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import reportsAPI from "../../api/reportsAPI";
	import eventsAPI from "../../api/eventsAPI";

	export default {
		name: "ApprovedEvents",

		data: () => ({
			load: false,
			error: null,
			fetched: null,
			deleingEvent: false,
			undone: true,
			acceptedEvents: [],
			report: "",
			events: [],
		}),

		computed: {
			getAcceptedEvents() {
				return this.events
					.filter((event) => {
						if (event.event_status == "Accepted") {
							return event;
						}
					})
					.sort((a, b) => {
						return b.id - a.id;
					});
			},

			getUnreportedEvents() {
				return this.getAcceptedEvents
					.filter((event) => {
						if (!event.report) {
							return event;
						}
					})
					.sort((a, b) => {
						return b.id - a.id;
					});
			},

			getReportedEvents() {
				return this.getAcceptedEvents
					.filter((event) => {
						if (event.report) {
							return event;
						}
					})
					.sort((a, b) => {
						return b.id - a.id;
					});
			},
		},

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
			async addReport(eventId, event, dialog) {
				try {
					this.deleingEvent = true;

					const data = {
						report: this.report,
					};

					const report = await reportsAPI.prototype.addReport(eventId, data);

					this.deleingEvent = false;
					dialog.value = false;

					this.getEvents();
				} catch (error) {
					this.error = error;
					this.deleingEvent = false;
				}
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

	.v-card {
		padding: 20px;
	}

	.deleteCon {
		padding: 15px;
	}

	.v-textarea {
		margin: 10px;
	}

	.report {
		margin: 10px;
		text-align: justify;
	}

	.active {
		background-color: #1e1e1e;
		color: #e1e1e1;
	}

	.empty {
		text-align: center;
	}

	.empty h2 {
		margin: 20px;
	}
</style>
