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
				<v-card class="activity" dark v-for="n in 5" :key="n">
					<div class="actHeader">
						<h1>TEAM BUILDING</h1>
						<v-chip class="ma-2" color="grey darken-3" dark>
							Mark Rey Ronolo
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

			<div class="mainContent" v-if="!undone">
				<v-card class="activity" dark v-for="n in 5" :key="n">
					<div class="actHeader">
						<h1>TEAM BUILDING</h1>
						<v-chip class="ma-2" color="grey darken-3" dark>
							Mark Rey Ronolo
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
			undone: true,
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

	.active {
		background-color: #1e1e1e;
		color: #e1e1e1;
	}
</style>
