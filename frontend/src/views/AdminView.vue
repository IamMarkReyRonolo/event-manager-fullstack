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
			{{ error }}
		</div>

		<div v-if="fetched" class="">
			<v-app id="inspire">
				<v-app-bar app color="white" flat>
					<v-container class="py-0 fill-height">
						<v-avatar class="mr-5" color="grey darken-1" size="32"></v-avatar>
						<p class="mr-10">Admin</p>
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
																	Create User</v-btn
																>
															</div>
														</template>
														<v-card light>
															<form
																action=""
																enctype="multipart/form-data"
																@submit.prevent="createUser"
															>
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
																					v-model="user.fullname"
																				></v-text-field>
																			</v-col>

																			<v-col cols="12">
																				<v-text-field
																					label="Username*"
																					required
																					dense
																					outlined
																					v-model="user.username"
																				></v-text-field>
																			</v-col>

																			<v-col cols="12">
																				<v-text-field
																					label="Password*"
																					required
																					dense
																					outlined
																					v-model="user.password"
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
		</div>
	</div>
</template>

<script>
	import userAPI from "../api/userAPI";

	export default {
		data: () => ({
			links: ["Dashboard", "Log Out"],
			navs: [
				{ name: " Event Requests", link: "/admin" },
				{ name: "Reports", link: "/reports" },
				{ name: "Users", link: "/users" },
			],
			user: {
				fullname: "",
				username: "",
				password: "",
			},
			dialog: false,
			dialog2: false,
			menu: false,
			load: false,
			fetched: null,
			error: null,
		}),

		methods: {
			async getAdmin() {
				try {
					this.load = true;
					setTimeout(() => {
						this.fetched = true;
						this.load = false;
					}, 1000);
				} catch (error) {
					this.error = error;
					this.loading = false;
				}
			},

			async createUser() {
				try {
					this.dialog2 = true;
					const user = await userAPI.prototype.createUser(this.user);
					this.dialog2 = false;
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
					localStorage.getItem("historyRoute") == "/user" ||
					localStorage.getItem("historyRoute") == "/declined" ||
					localStorage.getItem("historyRoute") == "/pending"
				) {
					this.$router.push("/user");
				}
			}
			localStorage.setItem("historyRoute", this.$route.fullPath);
			this.getAdmin();
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
