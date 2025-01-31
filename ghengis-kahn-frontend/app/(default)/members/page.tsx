"use client";

import { useState } from "react";
import Header from "../../../components/ui/header";
import TerminalBot from "../../../components/TerminalBot";

export default function MembersPage() {
	const [inputValue, setInputValue] = useState("");
	const [authorized, setAuthorized] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (inputValue.trim() === "hello world of kahn") {
			setAuthorized(true);
		} else {
			alert("Incorrect password");
		}
	};

	if (!authorized) {
		return (
			<>
				<Header />
				<main className="pt-32 pb-16 md:pt-52 md:pb-32">
					<div className="max-w-6xl mx-auto px-4 sm:px-6">
						<h1 className="h1 mb-8 text-slate-200">$KAHN Membership</h1>
						<p className="text-lg text-slate-300 mb-4">Enter password to view membership info:</p>
						<form onSubmit={handleSubmit} className="flex items-center space-x-2">
							<input
								type="password"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								className="form-input px-3 py-2 rounded-md text-slate-900"
								placeholder="Password"
							/>
							<button
								type="submit"
								className="btn-sm text-slate-300 hover:text-white border border-green-500 rounded-md px-4 py-2"
							>
								Submit
							</button>
						</form>
					</div>
				</main>
			</>
		);
	}

	// Authorized: show membership content
	return (
		<>
			<Header />
			<main className="pt-32 pb-16 md:pt-52 md:pb-32">
				<div className="max-w-6xl mx-auto px-4 sm:px-6">
					<h1 className="h1 mb-8 text-slate-200">$KAHN Membership</h1>
					<p className="text-lg text-slate-300 mb-6">
						Members have access to the Genghis Kahn AI (updated 1.30.25) v.0.1 and the{" "}
						<a
							href="https://discord.gg/FckzFjK9jR"
							className="text-blue-500 hover:underline"
						>
							Genghis Kahn AI Discord
						</a>
						.
					</p>
					<TerminalBot />
				</div>
			</main>
		</>
	);
}


