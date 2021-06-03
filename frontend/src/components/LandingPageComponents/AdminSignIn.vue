<template>
	<div class="adminSignIn">
		<div class="con">
			<v-card dark max-width="400">
				<form action="" enctype="multipart/form-data" @submit.prevent="signIn">
					<v-card-title>
						<div class="div">
							<h1>Sign in Admin</h1>
						</div>
					</v-card-title>
					<v-card-text>
						<v-container>
							<v-row>
								<v-col cols="12">
									<v-text-field
										label="Username*"
										required
										v-model="admin.username"
										dense
										outlined
									></v-text-field>
								</v-col>

								<v-col cols="12">
									<v-text-field
										label="Password*"
										required
										v-model="admin.password"
										dense
										type="password"
										outlined
									></v-text-field>
								</v-col>
							</v-row>
						</v-container>
						<small>*indicates required field</small>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="white" :to="'/'" text>
							User Sign-In
						</v-btn>

						<v-btn
							class="white--text"
							color="black darken-4"
							type="submit"
							light
						>
							Sign-In
						</v-btn>
						<v-dialog hide-overlay persistent width="300" v-model="dialog2">
							<v-card color="white" light>
								<v-card-text>
									<p mt-5>Signing in. Please wait.</p>
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
	import adminSignIn from "../../api/adminSignInAPI";

	export default {
		data: () => ({
			admin: {
				username: "",
				password: "",
			},
			dialog2: false,
		}),
		methods: {
			async signIn() {
				try {
					this.dialog2 = true;
					const admin = await adminSignIn.prototype.logIn(this.admin);
					this.dialog2 = false;

					localStorage.setItem("token", admin.data.admin.token);
					this.$router.push("/admin");
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
	.adminSignIn {
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
