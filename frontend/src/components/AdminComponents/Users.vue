<template>
	<div class="users">
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
			<v-card-title>
				<div class="headings">
					Users
					<div class="inner">
						<v-text-field
							v-model="search"
							append-icon="mdi-magnify"
							label="Search"
							single-line
							hide-details
						></v-text-field>
						<v-spacer></v-spacer>
						<div v-show="selected.length == 1" class="buttons">
							<div>
								<v-dialog v-model="dialog" max-width="500px">
									<template v-slot:activator="{ on, attrs }">
										<div class="buttonCreate">
											<v-btn color="dark" dark v-bind="attrs" v-on="on">
												Edit</v-btn
											>
										</div>
									</template>
									<v-card light>
										<form
											action=""
											enctype="multipart/form-data"
											@submit.prevent="updateUser"
										>
											<v-card-title>
												<div class="div">
													<h1>Edit User</h1>
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
													Done
												</v-btn>
												<v-dialog
													v-model="dialog2"
													hide-overlay
													persistent
													width="300"
												>
													<v-card color="white" light>
														<v-card-text>
															<p mt-5>Updating user. Please wait.</p>
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
							</div>

							<div>
								<v-dialog persistent max-width="290">
									<template v-slot:activator="{ on, attrs }">
										<v-btn class="error" dark v-bind="attrs" v-on="on" outlined
											>Delete</v-btn
										>
									</template>

									<template v-slot:default="dialog">
										<v-card light class="deleteCon">
											<v-card-title class="headline">
												Delete User?
											</v-card-title>
											<v-card-text
												>Are you really sure you want to delete this user?
												Deleting this user will also delete all events that the
												user created.</v-card-text
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
													@click="deleteUser(dialog)"
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
					</div>
				</div>
			</v-card-title>
			<v-data-table
				v-model="selected"
				:headers="headers"
				:items="users"
				:single-select="singleSelect"
				item-key="name"
				show-select
				class="elevation-1"
				:search="search"
			>
			</v-data-table>

			{{ getSelected }}
		</div>
	</div>
</template>

<script>
	import userAPI from "../../api/userAPI";

	export default {
		data() {
			return {
				singleSelect: true,
				selected: [],
				search: "",
				dialog: false,
				dialog2: false,
				deleingEvent: false,
				headers: [
					{ text: "id", value: "id", align: " d-none" },
					{
						text: "Full Name",
						align: "center",
						sortable: true,
						value: "name",
						width: "20%",
					},
					{
						text: "Username",
						value: "username",
						width: "20%",
						align: "center",
					},
					{
						text: "Password",
						value: "password",
						align: "center",
						width: "20%",
					},
					{
						text: "Date Created",
						value: "dateCreated",
						width: "20%",
						align: "center",
					},
				],
				users: [],
				user: {
					fullname: this.selected ? this.selected[0].name : "",
					username: this.selected ? this.selected[0].username : "",
					password: this.selected ? this.selected[0].password : "",
				},
				load: false,
				error: null,
				fetched: null,
			};
		},

		methods: {
			async getUsers() {
				try {
					this.load = true;
					const users = await userAPI.prototype.getUsers();

					this.users = users.data.map((user) => {
						return {
							id: user.id,
							name: user.fullname,
							username: user.username,
							password: user.password,
							dateCreated:
								new Date(user.createdAt).toString().split(" ")[1] +
								" " +
								new Date(user.createdAt).toString().split(" ")[2] +
								", " +
								new Date(user.createdAt).toString().split(" ")[3],
						};
					});

					this.users.sort((a, b) => {
						return b.id - a.id;
					});

					this.fetched = this.users;
					this.load = false;
				} catch (error) {
					this.error = error;
					this.loading = false;
				}
			},

			async updateUser() {
				try {
					this.dialog2 = true;
					this.dialog = true;

					const updatedUser = await userAPI.prototype.updateUser(
						this.selected[0].id,
						this.user
					);
					this.dialog2 = false;
					this.dialog = false;
					this.getUsers();
				} catch (error) {
					alert(error.message);
				}
			},

			async deleteUser(dialog) {
				try {
					this.deleingEvent = true;

					const deleted = await userAPI.prototype.deleteUser(
						this.selected[0].id
					);

					this.deleingEvent = false;
					dialog.value = false;
					this.getUsers();
				} catch (error) {
					alert(error.message);
				}
			},
		},

		computed: {
			getSelected() {
				this.user = {
					fullname: this.selected.length == 1 ? this.selected[0].name : "",
					username: this.selected.length == 1 ? this.selected[0].username : "",
					password: this.selected.length == 1 ? this.selected[0].password : "",
				};
			},
		},

		created() {
			this.getUsers();
		},
	};
</script>

<style scoped>
	.headings {
		display: flex;
		align-items: center;
		justify-content: space-between;

		width: 100%;
	}

	.inner {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.buttons {
		width: 200px;
		text-align: center;
		margin-left: 20px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.v-btn {
		margin: 0px 10px;
	}

	.div {
		text-align: center;

		margin: auto;
	}

	.v-card {
		padding: 20px;
	}

	.loading {
		font-weight: bold;
		text-align: center;
		font-size: 20px;
		padding: 20px;
		margin: auto;
	}
</style>
