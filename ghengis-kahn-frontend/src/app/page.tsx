"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	useQuery,
	gql,
} from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import EventsDashboard from "../../components/EventsDashboard";
import siteInfo from "../../data/siteInfo.json";

// Create the Apollo Client instance
const client = new ApolloClient({
	uri: "https://api.studio.thegraph.com/query/45871/genghis-kahn-ai-token/version/latest",
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

	if (loading)
		return <p className="text-lg text-white py-4">Loading Chart...</p>;
	if (error)
		return (
			<p className="text-lg text-red-400 py-4">
				Error loading chart data: {error.message}
			</p>
		);
	if (!data?.subscribeds?.length)
		return (
			<p className="text-lg text-white py-4">No subscribed events found.</p>
		);

	type SubscribedEvent = {
		id: string;
		account: string;
		ak: number;
		blockTimestamp: number;
	};
	// Transform data for the chart
	const chartData = data.subscribeds.map((event: SubscribedEvent) => ({
		blockTimestamp: new Date(event.blockTimestamp * 1000).toLocaleString(),
		account: event.account,
		ak: Number(event.ak),
	}));

	return (
		<div className="bg-black/70 text-white rounded-lg shadow-lg p-8 max-w-4xl">
			<div className="mt-6">
				<EventsDashboard />
			</div>
		</div>
	);
}

export default function Home() {
	const [lastUpdated, setLastUpdated] = useState("");

	useEffect(() => {
		// Set the last updated date from the JSON file
		setLastUpdated(new Date(siteInfo.lastUpdated).toLocaleString());
	}, []);

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
				<div className="absolute inset-0 bg-black/50 z-0"></div>

				{/* Content */}
				<div className="relative z-10">
					<header className="text-center space-y-4 mb-10">
						<h1 className="text-5xl sm:text-7xl font-bold text-white">
							Genghis Kahn AI
						</h1>
						<p className="text-lg sm:text-xl max-w-2xl mx-auto text-white">
							Join Genghis Kahn AI and become part of the future of AI Tokens
						</p>
						<p className="text-sm text-gray-300">Last updated: {lastUpdated}</p>
					</header>

					<main className="flex flex-col items-center space-y-8">
						<section className="bg-black/70 text-white rounded-lg shadow-lg p-8 max-w-4xl">
							<iframe
								width="560"
								height="315"
								src="https://www.youtube.com/embed/dwNoImzJuUs?si=ugP3563wsqudUMTe"
								title="YouTube video player"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								referrerPolicy="strict-origin-when-cross-origin"
								allowFullScreen
							></iframe>
						</section>
						<section className="bg-black/70 text-white rounded-lg shadow-lg p-8 max-w-4xl">
							<Image
								src="/roadmap.png"
								alt="Roadmap"
								width={800}
								height={600}
								className="rounded-lg shadow-lg"
							/>
						</section>
						{/* <section className="bg-black/70 text-white rounded-lg shadow-lg p-8 max-w-4xl">
							<h2 className="text-3xl font-semibold mb-6 text-center text-white">
								Roadmap (Q1 2025)
							</h2>

							<ol className="list-decimal list-inside space-y-4 text-base text-white">
								<li>
									Phase 1: Initial{" "}
									<a
										href="https://creator.bid/agents/678e4b71970206e12577fcf4"
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-400 hover:underline"
									>
										Launch
									</a>
								</li>
								<li>
									Phase 2: Website and Communities Launched{" "}
									<a
										href="https://twitter.com/GenghisKahnAI"
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-400 hover:underline"
										aria-label="Twitter"
									>
										<FontAwesomeIcon
											icon={faTwitter}
											size="sm"
											className="inline-block w-4 h-4"
										/>
									</a>{" "}
									<a
										href="https://www.t.me/GenghisKahnAI"
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-400 hover:underline"
										aria-label="Telegram"
									>
										<FontAwesomeIcon
											icon={faTelegram}
											size="sm"
											className="inline-block w-4 h-4"
										/>
									</a>
								</li>
								<li>Phase 3: Global Domination</li>
							</ol>
						</section> */}
						{/* Added consistent spacing for sections */}

						<section className="mt-10 w-full">
							<ChartSection />
						</section>
					</main>

					<footer className="mt-16 text-center space-y-6">
						{/* Buttons */}
						<div className="flex justify-center gap-4">
							<a
								href="https://twitter.com/GenghisKahnAI"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 w-10 h-10 transition-colors"
								aria-label="Twitter"
							>
								<FontAwesomeIcon
									icon={faTwitter}
									size="lg"
									className="w-6 h-6"
								/>
							</a>
							<a
								href="https://www.t.me/GenghisKahnAI"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-center bg-blue-400 hover:bg-blue-500 text-white rounded-full p-3 w-10 h-10 transition-colors"
								aria-label="Telegram"
							>
								<FontAwesomeIcon
									icon={faTelegram}
									size="lg"
									className="w-6 h-6"
								/>
							</a>
							<a
								href="https://creator.bid/agents/678e4b71970206e12577fcf4"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-center bg-gray-500 hover:bg-gray-600 text-white rounded-full p-3 w-10 h-10 transition-colors"
								aria-label="Website"
							>
								<FontAwesomeIcon icon={faGlobe} size="lg" className="w-6 h-6" />
							</a>
							<a
								href="https://thegraph.com"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white rounded-full p-3 w-10 h-10 transition-colors"
								aria-label="The Graph"
							>
								<Image
									src="/the-graph-logo.png"
									alt="The Graph"
									width={40}
									height={40}
								/>
							</a>
						</div>
					</footer>
				</div>
			</div>
		</ApolloProvider>
	);
}
