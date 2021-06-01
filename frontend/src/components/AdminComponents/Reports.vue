<template>
	<div class="users">
		<v-card-title>
			<div class="headings">
				Reports
				<div class="inner">
					<v-text-field
						v-model="search"
						append-icon="mdi-magnify"
						label="Search"
						single-line
						hide-details
					></v-text-field>
					<v-spacer></v-spacer>
				</div>
			</div>
		</v-card-title>
		<v-data-table
			v-model="selected"
			:headers="headers"
			:items="users"
			item-key="user"
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
				search: "",
				headers: [
					{
						text: "User",
						align: "start",
						sortable: true,
						value: "user",
					},
					{ text: "Event Title", value: "eventTitle" },
					{ text: "Date Reported", value: "date" },
					{ text: "Report", value: "report" },
				],
				users: [
					{
						user: "Mark Rey Ronolos",
						eventTitle: "Team Building",
						date: "06-01-21",
						report:
							"Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident" +
							"optio mollitia nemo odio vitae vero iusto unde, harum recusandae" +
							"placeat aliquam facilis tempore sequi minus, earum modi, quae impedit" +
							"ullam quaerat rem maxime. Numquam nemo, odio molestiae inventore quia " +
							"praesentium?",
					},
					{
						user: "Mark Rey Ronolod",
						eventTitle: "Team Building",
						date: "06-01-21",
						report:
							"Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident" +
							"optio mollitia nemo odio vitae vero iusto unde, harum recusandae" +
							"placeat aliquam facilis tempore sequi minus, earum modi, quae impedit" +
							"ullam quaerat rem maxime. Numquam nemo, odio molestiae inventore quia " +
							"praesentium?",
					},
					{
						user: "Mark Rey Ronolof",
						eventTitle: "Team Building",
						date: "06-01-21",
						report:
							"Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident" +
							"optio mollitia nemo odio vitae vero iusto unde, harum recusandae" +
							"placeat aliquam facilis tempore sequi minus, earum modi, quae impedit" +
							"ullam quaerat rem maxime. Numquam nemo, odio molestiae inventore quia " +
							"praesentium?",
					},
					{
						user: "Mark Rey Ronolog",
						eventTitle: "Team Building",
						date: "06-01-21",
						report:
							"Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident" +
							"optio mollitia nemo odio vitae vero iusto unde, harum recusandae" +
							"placeat aliquam facilis tempore sequi minus, earum modi, quae impedit" +
							"ullam quaerat rem maxime. Numquam nemo, odio molestiae inventore quia " +
							"praesentium?",
					},
					{
						user: "Mark Rey Ronoloq",
						eventTitle: "Team Building",
						date: "06-01-21",
						report:
							"Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident" +
							"optio mollitia nemo odio vitae vero iusto unde, harum recusandae" +
							"placeat aliquam facilis tempore sequi minus, earum modi, quae impedit" +
							"ullam quaerat rem maxime. Numquam nemo, odio molestiae inventore quia " +
							"praesentium?",
					},
					{
						user: "Mark Rey Ronolow",
						eventTitle: "Team Building",
						date: "06-01-21",
						report:
							"Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident" +
							"optio mollitia nemo odio vitae vero iusto unde, harum recusandae" +
							"placeat aliquam facilis tempore sequi minus, earum modi, quae impedit" +
							"ullam quaerat rem maxime. Numquam nemo, odio molestiae inventore quia " +
							"praesentium?",
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
	}

	.v-btn {
		margin: 0px 10px;
	}
</style>
