import Link from "next/link";
import Logo from "./logo";
import ConnectWalletButton from "./ConnectWalletButton";

export default function Header() {
	return (
		<header className="absolute w-full z-30">
			<div className="max-w-6xl mx-auto px-4 sm:px-6">
				<div className="flex items-center justify-between h-16 md:h-20">
					<div className="flex-1">
						<Logo logo="telegram" />
					</div>
					{/* <nav>…</nav> can remain commented out or updated as needed */}
					<ul className="flex-1 flex justify-end items-center">
						<li className="ml-6">
							<ConnectWalletButton />
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
}
