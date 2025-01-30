import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./logo";
import ConnectWalletButton from "./ConnectWalletButton";
import MembershipModal from "./MembershipModal";
import NetworkErrorModal from "./NetworkErrorModal";
import { useMembers } from "../../hooks/useMembers";

export default function Header() {
	const [isConnected, setIsConnected] = useState(false);
	const [showMembershipModal, setShowMembershipModal] = useState(false);
	const [showNetworkErrorModal, setShowNetworkErrorModal] = useState(false);
	const [address, setAddress] = useState<string | null>(null);
	const [networkError, setNetworkError] = useState<string | null>(null);
	const [isMember, setIsMember] = useState(false);

	const { members } = useMembers();

	useEffect(() => {
		if (address) {
			const memberExists = members.some(
				(member) => member.account.toLowerCase() === address.toLowerCase()
			);
			setIsMember(memberExists);
		}
	}, [address, members]);

	const handleOpenMembershipModal = () => setShowMembershipModal(true);
	const handleCloseMembershipModal = () => setShowMembershipModal(false);
	const handleCloseNetworkErrorModal = () => setShowNetworkErrorModal(false);

	return (
		<header className="absolute w-full z-30">
			<div className="max-w-6xl mx-auto px-4 sm:px-6">
				<div className="flex items-center justify-between h-16 md:h-20">
					<div className="flex-1">
						<Logo logo="telegram" />
					</div>
					{/* <nav>…</nav> can remain commented out or updated as needed */}
					<ul className="flex-1 flex justify-end items-center">
						{isConnected && (
							<li className="ml-4">
								<button
									onClick={handleOpenMembershipModal}
									className="btn-sm text-slate-300 hover:text-white transition duration-150 ease-in-out"
								>
									Membership Info
								</button>
							</li>
						)}
						<li className="ml-6">
							<ConnectWalletButton
								onConnect={(walletAddress: string) => {
									setIsConnected(true);
									setAddress(walletAddress);
									setNetworkError(null);
								}}
								onDisconnect={() => {
									setIsConnected(false);
									setAddress(null);
								}}
								onNetworkError={(error: string) => {
									setNetworkError(error);
									setShowNetworkErrorModal(true);
								}}
							/>
						</li>
					</ul>
				</div>
			</div>

			<MembershipModal
				isOpen={showMembershipModal}
				onClose={handleCloseMembershipModal}
				address={address}
				networkError={networkError}
				isMember={isMember}
			/>

			<NetworkErrorModal
				isOpen={showNetworkErrorModal}
				onClose={handleCloseNetworkErrorModal}
				networkError={networkError}
			/>
		</header>
	);
}
