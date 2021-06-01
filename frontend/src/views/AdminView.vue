<template>
	<v-app id="inspire">
		<v-app-bar app color="white" flat>
			<v-container class="py-0 fill-height">
				<v-avatar class="mr-5" color="grey darken-1" size="32"></v-avatar>
				<p class="mr-10">Admin</p>
				<v-btn text :to="'/user'" class="v-btn--active">
					Dashboard
				</v-btn>

				<v-spacer></v-spacer>
				<v-btn text>
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
								<v-list-item v-for="nav in navs" :key="nav" :to="nav.link" link>
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
														<v-btn color="dark" dark v-bind="attrs" v-on="on">
															Create User</v-btn
														>
													</div>
												</template>
												<v-card light>
													<form action="" enctype="multipart/form-data">
														<v-card-title>
															<div class="div">
																<h1>Create User</h1>
															</div>
														</v-card-title>
														<v-card-text>
															<v-container>
																<v-row>
																	<v-col cols="12">
																		<v-text-field
																			label="Fullname*"
																			required
																			dense
																			outlined
																		></v-text-field>
																	</v-col>

																	<v-col cols="12">
																		<v-text-field
																			label="Username*"
																			required
																			dense
																			outlined
																		></v-text-field>
																	</v-col>

																	<v-col cols="12">
																		<v-text-field
																			label="Password*"
																			required
																			dense
																			outlined
																		></v-text-field>
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
																Create User
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
</template>

<script>
	export default {
		data: () => ({
			links: ["Dashboard", "Log Out"],
			navs: [
				{ name: " Event Requests", link: "/admin" },
				{ name: "Reports", link: "/reports" },
				{ name: "Users", link: "/users" },
			],
			dialog: false,
			dialog2: false,
			menu: false,
		}),
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
</style>
