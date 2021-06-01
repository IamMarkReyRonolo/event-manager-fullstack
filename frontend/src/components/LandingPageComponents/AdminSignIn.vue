<template>
	<div class="adminSignIn">
		<div class="con">
			<v-card light max-width="400">
				<form action="" enctype="multipart/form-data">
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
										dense
										outlined
									></v-text-field>
								</v-col>

								<v-col cols="12">
									<v-text-field
										label="Password*"
										required
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
						<v-btn color="black darken-4" :to="'/'" text>
							User Sign-In
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
	export default {
		data: () => ({}),
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
