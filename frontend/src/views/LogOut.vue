<template>
	<v-app id="inspire">
		<div v-if="true" class="loading">
			<v-progress-circular
				:size="70"
				:width="7"
				color="black"
				indeterminate
			></v-progress-circular>
		</div>
	</v-app>
</template>

<script>
	export default {
		name: "App",

		data: () => ({
			load: false,
		}),
		methods: {
			async logOut() {
				this.load = true;
				setTimeout(() => {
					localStorage.removeItem("token");
					this.load = false;

					if (
						localStorage.getItem("historyRoute") == "/admin" ||
						localStorage.getItem("historyRoute") == "/users" ||
						localStorage.getItem("historyRoute") == "/reports"
					) {
						this.$router.push("/adminSign");
					} else if (
						localStorage.getItem("historyRoute") == "/user" ||
						localStorage.getItem("historyRoute") == "/declined" ||
						localStorage.getItem("historyRoute") == "/pending"
					) {
						this.$router.push("/");
					}
				}, 1000);
			},
		},

		async created() {
			await this.logOut();
		},
	};
</script>

<style scoped>
	.loading {
		font-weight: bold;
		text-align: center;
		font-size: 20px;
		padding: 20px;
		margin: auto;
		width: 300px;
	}
</style>
