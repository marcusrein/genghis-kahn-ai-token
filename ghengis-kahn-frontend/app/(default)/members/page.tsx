"use client";

import Header from "../../../components/ui/header";
import TerminalBot from "../../../components/TerminalBot";

export default function MembersPage() {
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


