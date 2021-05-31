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

		<div v-if="true" class="main">
			<div class="headings">
				<h1>Pending Events</h1>
			</div>
			<div class="mainContent">
				<v-card class="activity" dark v-for="n in 5" :key="n">
					<div class="actHeader">
						<h1>TEAM BUILDING</h1>
						<h3 class="warning--text"><i>Pending</i></h3>
						<v-spacer></v-spacer>

						<div class="buttons">
							<v-dialog transition="dialog-bottom-transition" max-width="500px">
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
										<form action="" enctype="multipart/form-data">
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
															></v-text-field>
														</v-col>

														<v-col cols="12">
															<v-text-field
																label="Event Budget*"
																outlined
																dense
																required
																type="number"
															></v-text-field>
														</v-col>

														<v-col cols="12">
															<v-text-field
																label="Event Location*"
																required
																dense
																outlined
															></v-text-field>
														</v-col>

														<v-col cols="12">
															<v-menu
																ref="menu2"
																:close-on-content-click="false"
																transition="scale-transition"
																offset-y
																min-width="auto"
																light
																outlined
															>
																<template v-slot:activator="{ on, attrs }">
																	<v-text-field
																		label="Event Date*"
																		prepend-icon="mdi-calendar"
																		readonly
																		v-bind="attrs"
																		v-on="on"
																	></v-text-field>
																</template>
																<v-date-picker no-title scrollable>
																	<v-spacer></v-spacer>
																	<v-btn
																		text
																		color="primary"
																		@click="menu2 = false"
																	>
																		Cancel
																	</v-btn>
																	<v-btn text color="primary">
																		OK
																	</v-btn>
																</v-date-picker>
															</v-menu>
														</v-col>

														<v-col cols="12">
															<v-textarea
																outlined
																name="input-7-4"
																label="Event Description*"
																placeholder="Add description"
																required
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
										><v-icon> mdi-cancel</v-icon></v-btn
									>
								</template>
								<span>Cancel submission</span>

								<template v-slot:default="dialog">
									<v-card light class="deleteCon">
										<v-card-title class="headline">
											Cancel Submission?
										</v-card-title>
										<v-card-text
											>Cancelling this submission will delete this event and the
											request you have made to the admin.</v-card-text
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
												type="submit"
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
							The Human Resource Department of ABC Company will conduct a team
							building in order to boost chemistry among workers in order to
							boost their performance. Moreover, this aims to promote peace in
							the workplace
						</p>
					</div>

					<div class="actFooter">
						<v-chip class="ma-2" color="grey darken-3" dark>
							<v-icon left>
								mdi-map-marker
							</v-icon>
							ALMENDRAS GYM, DAVAO CITY
						</v-chip>

						<v-chip class="ma-2" color="grey darken-3" dark>
							<v-icon left>
								mdi-calendar
							</v-icon>
							MAY 30, 2020
						</v-chip>

						<v-chip class="ma-2" color="grey darken-3" dark>
							<v-icon left>
								mdi-cash
							</v-icon>
							P 20,000.00
						</v-chip>
					</div>
				</v-card>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "DeclinedEvents",
		data: () => ({
			load: false,
			error: null,
			fetched: null,
			creatingEvent: false,
			menu2: false,
			deleingEvent: false,
		}),
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
</style>
