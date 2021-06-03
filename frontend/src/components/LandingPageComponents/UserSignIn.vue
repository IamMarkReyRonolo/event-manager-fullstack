<template>
	<div class="userSignIn">
		<div class="con">
			<v-card light max-width="400">
				<form action="" enctype="multipart/form-data" @submit.prevent="signIn">
					<v-card-title>
						<div class="div">
							<h1>Sign in User</h1>
						</div>
					</v-card-title>
					<v-card-text>
						<v-container>
							<v-row>
								<v-col cols="12">
									<v-text-field
										label="Username*"
										required
										v-model="user.username"
										dense
										outlined
									></v-text-field>
								</v-col>

								<v-col cols="12">
									<v-text-field
										label="Password*"
										v-model="user.password"
										required
										type="password"
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
						<v-btn color="black darken-4" :to="'/adminSign'" text>
							Admin Sign-In
						</v-btn>
						<!-- <v-btn color="white darken-4" text type="submit">
								Add Product
							</v-btn> -->

						<v-btn
							class="white--text"
							color="black darken-4"
							type="submit"
							light
						>
							Sign-In
						</v-btn>
						<v-dialog hide-overlay persistent width="300">
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
		</div>
	</div>
</template>

<script>
	import userAPI from "../../api/userAPI";

	export default {
		data: () => ({
			user: {
				username: "",
				password: "",
			},
			dialog2: false,
		}),
		methods: {
			async signIn() {
				try {
					this.dialog2 = true;
					const user = await userAPI.prototype.signInUser(this.user);

					this.dialog2 = false;

					localStorage.setItem("token", user.data.user.token);
					this.$router.push("/user");
				} catch (error) {
					this.dialog2 = false;
					if (error.message == "Network Error") {
						alert(error.message);
					} else {
						alert("Email or Password is incorrect!");
					}
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
				} else if (
					localStorage.getItem("historyRoute") == "/user" ||
					localStorage.getItem("historyRoute") == "/declined" ||
					localStorage.getItem("historyRoute") == "/pending"
				) {
					this.$router.push("/user");
				}
			}
		},
	};
</script>

<style scoped>
	.userSignIn {
		width: 90%;
		margin: auto;
		text-align: center;
	}

	.con {
		display: flex;
		justify-content: center;
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
