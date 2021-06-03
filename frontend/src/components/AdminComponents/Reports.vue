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
				:headers="headers"
				:items="reports"
				item-key="id"
				class="elevation-1"
				:search="search"
			>
			</v-data-table>
		</div>
	</div>
</template>

<script>
	import reportsAPI from "../../api/reportsAPI";

	export default {
		data() {
			return {
				singleSelect: true,
				search: "",
				headers: [
					{
						text: "User",
						sortable: true,
						value: "user",
						width: "20%",
						align: "center",
					},
					{
						text: "Event Title",
						value: "eventTitle",
						sortable: true,
						width: "20%",
						align: "center",
					},
					{
						text: "Date Reported",
						value: "date",
						sortable: true,
						width: "20%",
						align: "center",
					},
					{ text: "Report", value: "report" },
					{ text: "Report Id", value: "id", align: " d-none" },
				],
				reports: [],
				load: false,
				fetched: null,
				error: null,
			};
		},

		methods: {
			async getReports() {
				try {
					this.load = true;
					const reports = await reportsAPI.prototype.getReports();
					this.reports = reports.data.map((report, index) => {
						return {
							user: report.event.user.fullname,
							eventTitle: report.event.event_name,
							date:
								new Date(report.createdAt).toString().split(" ")[1] +
								" " +
								new Date(report.createdAt).toString().split(" ")[2] +
								", " +
								new Date(report.createdAt).toString().split(" ")[3],
							report: report.report_content,
							id: index,
						};
					});
					this.fetched = this.reports;
					this.load = false;
				} catch (error) {
					this.error = error;
					this.loading = false;
				}
			},
		},

		created() {
			this.getReports();
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

	.loading {
		font-weight: bold;
		text-align: center;
		font-size: 20px;
		padding: 20px;
		margin: auto;
	}
</style>
