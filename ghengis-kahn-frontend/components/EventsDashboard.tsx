import React from "react";
import { useQuery, gql } from "@apollo/client";

// GraphQL Query
const GET_EVENTS = gql`
	query {
		subscribeds(first: 5, orderBy: blockTimestamp, orderDirection: desc) {
			id
			account
			ak
			blockTimestamp
		}
		unsubscribeds(first: 5, orderBy: blockTimestamp, orderDirection: desc) {
			id
			account
			cooldownIndex
			cooldown_amount
			cooldown_claimableAt
			blockTimestamp
		}
		transfers(first: 5, orderBy: blockTimestamp, orderDirection: desc) {
			id
			from
			to
			value
			blockTimestamp
		}
	}
`;

// Helper Function for Date Formatting
const formatDate = (timestamp) => {
	const date = new Date(timestamp * 1000);
	return date.toLocaleString();
};

// Component
export default function EventsDashboard() {
	const { loading, error, data } = useQuery(GET_EVENTS);

	if (loading) return <p className="text-center text-gray-700">Loading events...</p>;
	if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

	const { subscribeds, unsubscribeds, transfers } = data;

	return (
		<div className="container mx-auto p-6 bg-white rounded-lg shadow-md space-y-8">
			<h1 className="text-3xl font-bold text-gray-800 text-center">AgentKey Event Dashboard</h1>

			{/* Subscribed Events */}
			<section>
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Subscribed Events</h2>
				{subscribeds.length === 0 ? (
					<p className="text-gray-500">No subscribed events found.</p>
				) : (
					<div className="overflow-x-auto">
						<table className="table-auto w-full border border-gray-300 rounded-lg">
							<thead className="bg-gray-200 text-gray-700">
								<tr>
									<th className="px-4 py-2">Account</th>
									<th className="px-4 py-2">AK Amount</th>
									<th className="px-4 py-2">Timestamp</th>
								</tr>
							</thead>
							<tbody>
								{subscribeds.map((event) => (
									<tr
										key={event.id}
										className="bg-white border-b hover:bg-gray-100 transition-all"
									>
										<td className="px-4 py-2">{event.account}</td>
										<td className="px-4 py-2">{event.ak}</td>
										<td className="px-4 py-2">{formatDate(event.blockTimestamp)}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</section>

			

			{/* Transfer Events */}
		
		</div>
	);
}