"use client";

import { useEffect, useState } from "react";
import BoringAvatar from "boring-avatars";

// GraphQL query for ActiveMembers and Subscribeds
const GET_MEMBERS = `
  {
    activeMembers(first: 1000) {
      id
      account
    }
    subscribeds(first: 1000) {
      id
      account
      ak
    }
  }
`;

interface KahnMember {
	id: string;
	account: string;
	ak: string;
}

export default function Team() {
	const [members, setMembers] = useState<KahnMember[]>([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await fetch(
					"https://api.studio.thegraph.com/query/45871/genghis-kahn-ai-token/version/latest",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ query: GET_MEMBERS }),
					}
				);
				const { data } = await res.json();

				// Build a Map to unify activeMembers and subscribeds (no duplicates)
				const map = new Map<string, KahnMember>();

				// Add all activeMembers
				data.activeMembers.forEach((am: any) => {
					map.set(am.account.toLowerCase(), {
						id: am.id,
						account: am.account,
						ak: "0", // Default if no matching subscribeds entry
					});
				});

				// Merge or add all subscribeds
				data.subscribeds.forEach((sub: any) => {
					const key = sub.account.toLowerCase();
					if (map.has(key)) {
						const existing = map.get(key)!;
						existing.ak = sub.ak; // Merge the AK amount
						map.set(key, existing);
					} else {
						map.set(key, {
							id: sub.id,
							account: sub.account,
							ak: sub.ak,
						});
					}
				});

				const mergedArray = Array.from(map.values());
				setMembers(mergedArray);
			} catch (error) {
				console.error("Error fetching members:", error);
			}
		}
		fetchData();
	}, []);

	// Helper to shorten addresses
	function shortAddress(addr: string) {
		if (!addr) return "";
		return addr.slice(0, 6) + "..." + addr.slice(-4);
	}

	return (
		<section className="relative">
			{/* Radial gradient */}
			<div
				className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
				aria-hidden="true"
			>
				<div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-1/3 aspect-square">
					<div className="absolute inset-0 translate-z-0 bg-purple-500 rounded-full blur-[120px] opacity-50"></div>
				</div>
			</div>
			<div className="max-w-6xl mx-auto px-4 sm:px-6">
				<div className="py-12 md:py-20">
					{/* Content */}
					<div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
						<h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
							Members of the $KAHN Horde ({members.length})
						</h2>
						<p className="text-lg text-slate-400">
							Members have exclusive access to experienced crypto developers and
							traders.
						</p>
					</div>
					{/* Team members */}
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6">
						{members.map((member) => (
							<div
								key={member.id}
								className="relative flex items-center justify-between py-4 pl-4 pr-3 group before:absolute before:inset-0 before:-z-10 before:border before:border-slate-300 before:bg-slate-700 before:opacity-0 hover:before:opacity-10 focus-within:before:opacity-10 before:rounded-xl before:transition-opacity"
							>
								<div className="flex items-center space-x-4">
									<BoringAvatar size={48} name={member.account} />
									<div className="grow">
										<div className="font-bold text-slate-100 mb-0.5">
											{shortAddress(member.account)}
										</div>
										<div className="text-sm text-purple-500 font-medium">
											{(parseFloat(member.ak) / 1e18).toFixed(0)} $KAHN
										</div>
									</div>
								</div>
								<a
									className="shrink-0 text-slate-500 md:opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100 focus:outline-none group-hover:before:absolute group-hover:before:inset-0"
									href="#0"
									aria-label={`Visit ${shortAddress(
										member.account
									)} on block explorer`}
								>
									<svg
										className="fill-current"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
									>
										<path d="M11.297 13.807 7.424 18H5.276l5.019-5.436L5 6h4.43l3.06 3.836L16.025 6h2.147l-4.688 5.084L19 18h-4.32l-3.383-4.193Zm3.975 2.975h1.19L8.783 7.155H7.507l7.766 9.627Z" />
									</svg>
								</a>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
