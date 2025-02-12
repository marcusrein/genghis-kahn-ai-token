"use client";

import React, { useState } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";

// Helper function that forcibly wraps text at 'maxLen' characters.
// This ensures lines never exceed your chosen limit (e.g. 80 chars).
function wrapText(text: string, maxLen: number): string {
	// Split on whitespace to get individual words/tokens
	const words = text.split(/\s+/);
	let wrapped = "";
	let currentLineLength = 0;

	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		// If adding this word would exceed the line length, start a new line
		if (currentLineLength + word.length > maxLen) {
			wrapped += "\n" + word;
			currentLineLength = word.length;
		} else {
			// If it's the first word in a line, just add it
			if (currentLineLength === 0) {
				wrapped += word;
				currentLineLength = word.length;
			} else {
				// Otherwise, add a space + the word
				wrapped += " " + word;
				currentLineLength += word.length + 1;
			}
		}
	}

	// Next, handle any truly extra-long words that might still exceed maxLen
	// We'll split them forcibly if needed.
	const finalLines = wrapped.split("\n").flatMap((line) => {
		// If line is within limit, keep it
		if (line.length <= maxLen) {
			return [line];
		}
		// Otherwise, split forcibly into chunks
		const chunks: string[] = [];
		let start = 0;
		while (start < line.length) {
			chunks.push(line.slice(start, start + maxLen));
			start += maxLen;
		}
		return chunks;
	});

	return finalLines.join("\n");
}

const resources = [
	{
		name: "Mastering Bitcoin by Andreas M. Antonopoulos",
		url: "https://bitcoinbook.info/",
		description:
			"A comprehensive guide to understanding Bitcoin's protocol and its applications.",
	},
	{
		name: "Mastering Ethereum by Andreas M. Antonopoulos and Gavin Wood",
		url: "https://github.com/ethereumbook/ethereumbook",
		description:
			"An in-depth exploration of Ethereum's architecture and smart contract development.",
	},
	{
		name: "CryptoZombies",
		url: "https://cryptozombies.io/",
		description:
			"An interactive platform that teaches smart contract development through building games on Ethereum.",
	},
	{
		name: "Ethernaut",
		url: "https://ethernaut.openzeppelin.com/",
		description:
			"A Web3/Solidity-based wargame by OpenZeppelin, offering challenges to enhance smart contract security skills.",
	},
	{
		name: "Dapp University",
		url: "https://www.youtube.com/c/DappUniversity",
		description:
			"A YouTube channel providing tutorials on blockchain development and decentralized applications.",
	},
	{
		name: "EatTheBlocks",
		url: "https://www.youtube.com/c/EatTheBlocks",
		description:
			"Offers video content focused on Ethereum and smart contract development.",
	},
	{
		name: "The Bitcoin Standard by Saifedean Ammous",
		url: "https://saifedean.com/the-bitcoin-standard/",
		description:
			"An analysis of the historical context and economic implications of Bitcoin.",
	},
	{
		name: "Cryptoassets: The Innovative Investor's Guide to Bitcoin and Beyond by Chris Burniske and Jack Tatar",
		url: "https://www.amazon.com/Cryptoassets-Innovative-Investors-Bitcoin-Beyond/dp/1260026671",
		description:
			"A guide to understanding and investing in diverse crypto assets.",
	},
	{
		name: "TradingSim",
		url: "https://tradingsim.com/",
		description:
			"A platform that allows users to practice crypto trading with real-time market data.",
	},
	{
		name: "Cryptohopper",
		url: "https://www.cryptohopper.com/",
		description:
			"Offers a free paper trading feature to simulate trading strategies without financial risk.",
	},
];

export default function TerminalBot() {
	const [terminalLineData, setTerminalLineData] = useState([
		<TerminalOutput key="initial">
			<div style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
				Welcome to the Genghis Khan AI Bot!
			</div>
		</TerminalOutput>,
	]);

	const handleInput = async (terminalInput: string) => {
		console.log("[TerminalBot] Environment variables:", {
			apiUrl: process.env.NEXT_PUBLIC_GRAPH_AI_URL,
			hasApiKey: !!process.env.NEXT_PUBLIC_THE_GRAPH_AI_API
		});

		if (!process.env.NEXT_PUBLIC_GRAPH_AI_URL) {
			console.error("[TerminalBot] Missing API URL environment variable");
			setTerminalLineData((prev) => [
				...prev,
				<TerminalOutput key={`error-${Date.now()}`}>
					<div style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
						Configuration error: API URL not set
					</div>
				</TerminalOutput>,
			]);
			return;
		}

		if (terminalInput.toLowerCase().includes("resources")) {
			// Resources handling remains the same
			return;
		}

		try {
			const requestBody = {
				inputs: {},
				query: terminalInput,
				response_mode: "streaming",
				conversation_id: "",
				user: "terminal-user"
			};

			const response = await fetch(
				process.env.NEXT_PUBLIC_GRAPH_AI_URL,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${process.env.NEXT_PUBLIC_THE_GRAPH_AI_API}`,
					},
					body: JSON.stringify(requestBody),
				}
			);

			if (!response.ok) {
				const errorText = await response.text();
				console.error("[TerminalBot] Error response body:", errorText);
				setTerminalLineData((prev) => [
					...prev,
					<TerminalOutput key={`input-${Date.now()}`}>
						<div style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
							{`> ${terminalInput}`}
						</div>
					</TerminalOutput>,
					<TerminalOutput key={`error-${Date.now()}`}>
						<div style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere", color: "red" }}>
							Error: Unable to process request. Please try again.
						</div>
					</TerminalOutput>,
				]);
				return;
			}

			// Show user input immediately
			setTerminalLineData((prev) => [
				...prev,
				<TerminalOutput key={`input-${Date.now()}`}>
					<div style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
						{`> ${terminalInput}`}
					</div>
				</TerminalOutput>,
			]);

			const reader = response.body?.getReader();
			const decoder = new TextDecoder();

			if (reader) {
				let currentMessage = '';
				
				while (true) {
					const { done, value } = await reader.read();
					if (done) {
						console.log("[TerminalBot] Stream complete");
						break;
					}

					const chunk = decoder.decode(value);
					const lines = chunk.split('\n');

					for (const line of lines) {
						if (line.startsWith('data: ')) {
							try {
								const jsonStr = line.slice(6); // Remove 'data: ' prefix
								const jsonData = JSON.parse(jsonStr);
								
								if (jsonData.event === 'agent_message' && jsonData.answer) {
									currentMessage += jsonData.answer;
									
									// Update the terminal with the current message
									setTerminalLineData((prev) => [
										...prev.slice(0, -1), // Remove previous response
										<TerminalOutput key={`output-${Date.now()}`}>
											<div style={{ 
												whiteSpace: "pre-wrap", 
												overflowWrap: "anywhere",
												color: "#a8b5d1" // Light blue color for bot responses
											}}>
												{`Assistant: ${currentMessage}`}
											</div>
										</TerminalOutput>,
									]);
								}
							} catch (e) {
								console.error("[TerminalBot] Error processing chunk:", e);
							}
						}
					}
				}
			}
		} catch (error) {
			console.error("[TerminalBot] Error executing command:", error);
			setTerminalLineData((prev) => [
				...prev,
				<TerminalOutput key={`error-${Date.now()}`}>
					<div style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere", color: "red" }}>
						{`Error: ${error.message}`}
					</div>
				</TerminalOutput>,
			]);
		}
	};
	return (
		<div className="container max-w-[1000px]">
			<Terminal
				name="Genghis Khan AI Bot"
				colorMode={ColorMode.Dark}
				onInput={handleInput}
			>
				{terminalLineData}
			</Terminal>
		</div>
	);
}
