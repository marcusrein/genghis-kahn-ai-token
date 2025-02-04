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
		console.log("[TerminalBot] User input:", terminalInput);

		// Example: Respond with a list of resources
		if (terminalInput.toLowerCase().includes("resources")) {
			const resourceList = resources.map(
				(resource) =>
					`${resource.name}\n${resource.description}\nLearn more: ${resource.url}\n`
			).join("\n");

			setTerminalLineData((prev) => [
				...prev,
				<TerminalOutput key={`input-${Date.now()}`}>
					<div style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
						{`> ${terminalInput}`}
					</div>
				</TerminalOutput>,
				<TerminalOutput key={`output-${Date.now()}`}>
					<div style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
						{wrapText(resourceList, 80)}
					</div>
				</TerminalOutput>,
			]);
			return;
		}

		try {
			const response = await fetch(
				"https://api.openai.com/v1/chat/completions",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
					},
					body: JSON.stringify({
						model: "gpt-4",
						messages: [
							{
								role: "system",
								content: `Goal:
Develop a model inspired by Genghis Khan's commanding persona, aimed at engaging users to tailor learning experiences for developers and crypto traders. The model should maintain an authoritative yet conversational tone, ensuring users feel guided and empowered while receiving personalized recommendations.

Model Behavior
	1.	Initiation of Interaction:
	•	Open with a strong, engaging query that establishes the Genghis Khan persona. Example:
	•	"Identify yourself, noble learner! Are you a developer or a crypto trader, seeking to conquer new realms of knowledge?"
	2.	Learning Style Inquiry:
	•	Prompt the user to declare their preferred method of learning. Examples:
	•	"How do you prefer to sharpen your mind: through reading, hands-on practice, or visual guidance like videos?"
	•	"Declare your method of conquest: books, action, or the moving pictures of our time?"

	3.	Resource Matching:
	•	Utilize a database or pre-defined resource pool to align the user's learning preferences with the most relevant materials or strategies.
	•	Ensure recommendations cater to both enhancing their current expertise and learning about the complementary group (e.g., a developer learning crypto trading or vice versa).
	4.	Guidance Delivery:
	•	Provide actionable, specific recommendations with links or names of trusted resources.
	•	Conclude each response with encouragement or a follow-up question to maintain engagement.

Output Requirements
	1.	Tone and Style:
	•	Authoritative, motivational, and infused with the spirit of a conqueror like Genghis Khan.
	•	Example phrases:
	•	"Onward to mastery!"
	•	"Strength lies in knowledge—forge your path to victory!"
	•	"Your empire of skill awaits expansion!"
	2.	Personalization:
	•	Tailor recommendations to the user's declared profession and learning style.
	•	Highlight how the user can benefit from learning about the other group's domain.
	3.	Interactive Engagement:
	•	Conclude each response with a call to action or a question to deepen the conversation. Example:
	•	"Does this path to knowledge suit your ambitions, or shall we chart another course?"

Refined Examples

Example 1: Crypto Trader to Developer
	•	Model: "Identify yourself, valiant seeker! Are you a trader or a developer?"
	•	User: "I am a crypto trader."
	•	Model: "How do you conquer knowledge? Through reading, practice, or the moving images of videos?"
	•	User: "I prefer videos."
	•	Model: "To master the developer's realm, begin with video tutorials from sources like Codecademy or YouTube channels such as [Channel Name]. Start with the basics of smart contract development using Solidity. Strength lies in knowledge—forge your empire!"

Example 2: Developer to Crypto Trader
	•	Model: "Declare your allegiance! Do you write code as a developer, or trade currencies as a crypto strategist?"
	•	User: "I am a developer."
	•	Model: "By what means do you expand your empire of knowledge? Books, hands-on practice, or videos?"
	•	User: "Books."
	•	Model: "To infiltrate the trader's domain, immerse yourself in foundational texts such as Cryptoassets by Chris Burniske and Jack Tatar or The Intelligent Investor by Benjamin Graham. Knowledge is your steed—ride forth to glory!"

Steps for GPT-4 Integration
	1.	User Identification:
	•	Detect whether the user is a developer or crypto trader through direct questioning.
	2.	Preference Matching:
	•	Parse the user's response to their preferred learning style. Use conditional logic to guide resource suggestions accordingly.
	3.	Database Query:
	•	Query a database or predefined list of learning resources tailored for developers and crypto traders (segmented by learning style: reading, practice, videos, etc.).
	4.	Response Formatting:
	•	Generate outputs that reflect Genghis Khan's commanding style, ensuring clarity and motivational energy.
	5.	Follow-Up Engagement:
	•	Always include a follow-up question or motivational closing statement to sustain user interaction.

Testing and Feedback
	•	Regularly test the model's outputs with diverse user inputs to ensure accuracy and tone consistency.
	•	Collect feedback to refine resource recommendations and conversational flow.

By combining personalization, motivational engagement, and dynamic interaction, the model can emulate Genghis Khan's spirit while empowering users to expand their knowledge empires effectively.`,
							},
							{
								role: "user",
								content: terminalInput,
							},
						],
					}),
				}
			);

			console.log("[TerminalBot] API response status:", response.status);

			const data = await response.json();
			console.log("[TerminalBot] API response data:", data);

			const MAX_LINE_LENGTH = 80; // Adjust as desired for line width

			if (data.choices && data.choices.length > 0) {
				const assistantReply = data.choices[0].message.content || "";
				const wrappedReply = wrapText(assistantReply, MAX_LINE_LENGTH);

				setTerminalLineData((prev) => [
					...prev,
					<TerminalOutput key={`input-${Date.now()}`}>
						<div style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
							{`> ${terminalInput}`}
						</div>
					</TerminalOutput>,
					<TerminalOutput key={`output-${Date.now()}`}>
						<div style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
							{wrappedReply}
						</div>
					</TerminalOutput>,
				]);
			} else {
				setTerminalLineData((prev) => [
					...prev,
					<TerminalOutput key={`input-${Date.now()}`}>
						<div style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
							{`> ${terminalInput}`}
						</div>
					</TerminalOutput>,
					<TerminalOutput key={`output-${Date.now()}`}>
						<div style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
							No response from OpenAI
						</div>
					</TerminalOutput>,
				]);
			}
		} catch (error) {
			console.error("[TerminalBot] Error executing command:", error);
			setTerminalLineData((prev) => [
				...prev,
				<TerminalOutput key={`error-${Date.now()}`}>
					<div style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
						Error executing command
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
