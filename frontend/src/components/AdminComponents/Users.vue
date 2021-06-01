<template>
	<div class="users">
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
									<form action="" enctype="multipart/form-data">
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
	</div>
</template>

<script>
	export default {
		data() {
			return {
				singleSelect: true,
				selected: [],
				search: "",
				dialog: false,
				dialog2: false,
				headers: [
					{
						text: "Full Name",
						align: "start",
						sortable: true,
						value: "name",
					},
					{ text: "Username", value: "username" },
					{ text: "Password", value: "password" },
					{ text: "Date Created", value: "dateCreated" },
				],
				users: [
					{
						name: "Mark Reysd",
						username: "iamhere111",
						password: "123123",
						dateCreated: "06-01-21",
					},
					{
						name: "Mark Rey12",
						username: "iamhere111",
						password: "123123",
						dateCreated: "06-01-21",
					},
					{
						name: "Mark Reyqwe",
						username: "iamhere111",
						password: "123123",
						dateCreated: "06-01-21",
					},
					{
						name: "Mark Reyzxc",
						username: "iamhere111",
						password: "123123",
						dateCreated: "06-01-21",
					},
				],
			};
		},

		computed: {
			getSelected() {
				console.log(this.selected);
			},
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
</style>
