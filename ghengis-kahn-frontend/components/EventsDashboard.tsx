import React from "react";
import { useQuery, gql } from "@apollo/client";

/**
 * This query fetches several event types from your subgraph.
 * Feel free to adjust the quantity fetched ("first:") and the fields,
 * or add new queries for other event types defined in your schema.
 */
const GET_EVENTS = gql`
	query {
		# Fetch the 5 most recent Subscribed events
		subscribeds(first: 5, orderBy: blockTimestamp, orderDirection: desc) {
			id
			account
			ak
			blockTimestamp
		}

		# Fetch the 5 most recent Unsubscribed events
		unsubscribeds(first: 5, orderBy: blockTimestamp, orderDirection: desc) {
			id
			account
			cooldownIndex
			cooldown_amount
			cooldown_claimableAt
			blockTimestamp
		}

		# Fetch the 5 most recent Transfer events
		transfers(first: 5, orderBy: blockTimestamp, orderDirection: desc) {
			id
			from
			to
			value
			blockTimestamp
		}
	}
`;

export default function EventsDashboard() {
	const { loading, error, data } = useQuery(GET_EVENTS);

	if (loading) return <p>Loading events...</p>;
	if (error) return <p>Error loading events: {error.message}</p>;

	const { subscribeds, unsubscribeds, transfers } = data;

	return (
		<div style={{ margin: "2rem 0" }}>
			<h2>AgentKey Event Dashboard</h2>

			<section style={{ marginBottom: "2rem" }}>
				<h3>Recent Subscribed Events</h3>
				{subscribeds.length === 0 ? (
					<p>No subscribe events found.</p>
				) : (
					<table>
						<thead>
							<tr>
								<th>Account</th>
								<th>AK Amount</th>
								<th>Timestamp</th>
							</tr>
						</thead>
						<tbody>
							{subscribeds.map((event: any) => (
								<tr key={event.id}>
									<td>{event.account}</td>
									<td>{event.ak}</td>
									<td>{event.blockTimestamp}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</section>

			<section style={{ marginBottom: "2rem" }}>
				<h3>Recent Unsubscribed Events</h3>
				{unsubscribeds.length === 0 ? (
					<p>No unsubscribe events found.</p>
				) : (
					<table>
						<thead>
							<tr>
								<th>Account</th>
								<th>Cooldown Index</th>
								<th>Cooldown Amount</th>
								<th>Claimable At (Unix)</th>
								<th>Timestamp</th>
							</tr>
						</thead>
						<tbody>
							{unsubscribeds.map((event: any) => (
								<tr key={event.id}>
									<td>{event.account}</td>
									<td>{event.cooldownIndex}</td>
									<td>{event.cooldown_amount}</td>
									<td>{event.cooldown_claimableAt}</td>
									<td>{event.blockTimestamp}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</section>

			<section>
				<h3>Recent Transfer Events</h3>
				{transfers.length === 0 ? (
					<p>No transfer events found.</p>
				) : (
					<table>
						<thead>
							<tr>
								<th>From</th>
								<th>To</th>
								<th>Value</th>
								<th>Timestamp</th>
							</tr>
						</thead>
						<tbody>
							{transfers.map((event: any) => (
								<tr key={event.id}>
									<td>{event.from}</td>
									<td>{event.to}</td>
									<td>{event.value}</td>
									<td>{event.blockTimestamp}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</section>
		</div>
	);
}
