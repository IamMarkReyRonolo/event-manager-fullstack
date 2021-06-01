<template>
	<div class="landingPage">
		<v-app-bar app>
			<h1>Event Manager App</h1>
		</v-app-bar>
		<div class="main">
			<router-view> </router-view>
		</div>
	</div>
</template>

<script>
	export default {
		data: () => ({}),
	};
</script>

<style scoped>
	h1 {
		margin: auto;
		color: #1e1e1e;
		font-weight: lighter;
	}

	.main {
		margin: 150px auto;
	}
</style>
