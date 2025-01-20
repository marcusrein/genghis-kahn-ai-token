import React from "react";
import { useQuery, gql } from "@apollo/client";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";
import { Table } from "antd";

// GraphQL Query
const GET_EVENTS = gql`
	query {
		subscribeds(first: 5, orderBy: blockTimestamp, orderDirection: desc) {
			id
			account
			ak
			blockTimestamp
		}
	}
`;

// Helper Function for Date Formatting
const formatDate = (timestamp: number) => {
	const date = new Date(timestamp * 1000);
	return date.toLocaleString();
};

// Helper Function for Number Formatting
const formatCryptoAmount = (amount: number) => {
	const formattedAmount = amount / 1e18;
	return formattedAmount.toLocaleString(undefined, {
		maximumFractionDigits: 2,
	});
};

export default function EventsDashboard() {
	const { loading, error, data } = useQuery(GET_EVENTS);

	if (loading) {
		return (
			<p className="text-center text-gray-700 text-lg py-6">
				Loading events...
			</p>
		);
	}
	if (error) {
		return (
			<p className="text-center text-red-500 text-lg py-6">
				Error: {error.message}
			</p>
		);
	}

	const { subscribeds } = data;

	// Transform data for the chart
	const chartData = subscribeds.map((event: any) => ({
		name: formatDate(event.blockTimestamp),
		ak: Number(event.ak),
	}));

	const columns = [
		{
			title: "Account",
			dataIndex: "account",
			key: "account",
			className: "text-gray-700 text-base",
			render: (text: string) => (
				<a
					href={`https://basescan.org/address/${text}`}
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-500 hover:underline"
				>
					{text}
				</a>
			),
		},
		{
			title: "Membership Tokens Purchased",
			dataIndex: "ak",
			key: "ak",
			className: "text-gray-700 text-base",
			render: (text: string | number) => formatCryptoAmount(Number(text)),
		},
		{
			title: "Timestamp",
			dataIndex: "blockTimestamp",
			key: "blockTimestamp",
			className: "text-gray-700 text-base",
			render: (text: number) => formatDate(text),
		},
	];

	return (
		<div className="container mx-auto px-6 py-8 md:px-10 md:py-12 bg-white rounded-lg shadow-md space-y-8">
			<h1 className="text-3xl font-bold text-gray-800 text-center my-10 pb-4">
				Most Recent Members
			</h1>

			{/* Subscribed Events Table */}
			<section className="space-y-6">
				{subscribeds.length === 0 ? (
					<p className="text-gray-500 text-lg">No subscribed events found.</p>
				) : (
					<Table
						columns={columns}
						dataSource={subscribeds}
						rowKey="id"
						pagination={false}
						className="rounded-lg shadow-lg"
					/>
				)}
			</section>

			{/* Example Chart Section (if you still want to display chart data) */}
			{chartData.length > 0 && (
				<section className="pt-8">
					<div className="w-full h-72 rounded-lg overflow-hidden">
						<ResponsiveContainer>
							<LineChart
								data={chartData}
								margin={{ top: 20, right: 30, bottom: 20, left: 0 }}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" tick={{ fontSize: 12 }} />
								<YAxis tick={{ fontSize: 12 }} />
								<Tooltip />
								<Legend />
								<Line
									type="monotone"
									dataKey="ak"
									stroke="#8884d8"
									strokeWidth={3}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</section>
			)}
		</div>
	);
}
