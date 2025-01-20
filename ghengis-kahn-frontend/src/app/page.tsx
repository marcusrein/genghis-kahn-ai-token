"use client";

import React from "react";
import Image from "next/image";
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from "recharts";
import EventsDashboard from "../../components/EventsDashboard";


// Create the Apollo Client instance
const client = new ApolloClient({
	uri: "https://api.studio.thegraph.com/query/45871/ghengis-kahn-ai-token/version/latest",
	cache: new InMemoryCache(),
});

// GraphQL query for recent subscribed events
const GET_SUBSCRIBED_EVENTS = gql`
	query {
		subscribeds(first: 5, orderBy: blockTimestamp, orderDirection: desc) {
			id
			account
			ak
			blockTimestamp
		}
	}
`;

function ChartSection() {
	const { loading, error, data } = useQuery(GET_SUBSCRIBED_EVENTS);

	if (loading) return <p>Loading Chart...</p>;
	if (error) return <p>Error loading chart data: {error.message}</p>;
	if (!data?.subscribeds?.length) return <p>No subscribed events found.</p>;

	// Transform data for the chart
	const chartData = data.subscribeds.map((event: any) => ({
		blockTimestamp: new Date(event.blockTimestamp * 1000).toLocaleString(),
		account: event.account,
		ak: Number(event.ak),
	}));

	return (
		<div className="bg-black/70 text-white rounded-lg shadow-lg p-8 w-full max-w-2xl mt-10">
		
			<div className="mt-10">
				<EventsDashboard />
			</div>
		</div>
	);
}

export default function Home() {
	return (
		<ApolloProvider client={client}>
			<div
				className="relative flex flex-col items-center justify-center min-h-screen text-white p-8"
				style={{
					backgroundImage: 'url("/backdrop.png")',
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					filter: "brightness(70%) contrast(1.1)",
				}}
			>
				{/* Overlay for better text contrast */}
				<div className="absolute inset-0 bg-black/50"></div>

				{/* Content */}
				<header className="relative text-center mb-16 z-10">
					<h1 className="text-5xl sm:text-7xl font-bold mb-4">
						Ghengis Kahn: The Digital Conqueror
					</h1>
					<p className="text-lg sm:text-xl max-w-2xl mx-auto">
						Embark on a journey through the digital frontier and shape the future of innovation.
					</p>
				</header>

				<main className="relative flex flex-col items-center gap-16 z-10">
					
					<section className="bg-black/70 text-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
						<h2 className="text-3xl font-semibold mb-4">Roadmap</h2>
						<ol className="list-decimal list-inside space-y-2">
							<li>Phase 1: Initial Launch</li>
							<li>Phase 2: Feature Expansion</li>
							<li>Phase 3: Community Building</li>
							<li>Phase 4: Global Domination</li>
						</ol>
					</section>

					<ChartSection />

					<div className="flex gap-4 items-center flex-col sm:flex-row">
						<a
							className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-800 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
							href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								className="dark:invert"
								src="/vercel.svg"
								alt="Vercel logomark"
								width={20}
								height={20}
							/>
							Deploy now
						</a>
						<a
							className="rounded-full border border-solid border-white/20 transition-colors flex items-center justify-center hover:bg-white/10 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
							href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
							target="_blank"
							rel="noopener noreferrer"
						>
							Read our docs
						</a>
					</div>
				</main>

				<footer className="relative mt-16 text-center z-10">
					<p className="text-sm">© 2023 Ghengis Kahn. All rights reserved.</p>
				</footer>
			</div>
		</ApolloProvider>
	);
}