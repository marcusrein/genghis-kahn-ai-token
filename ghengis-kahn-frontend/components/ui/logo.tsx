import LogoKhan from "@/public/images/branding/khan2.png";
import LogoTelegram from "@/public/images/branding/telegram.png";
import Image from "next/image";
import Link from "next/link";

export default function Logo({
  width = 50,
  height = 50, 
  logo = "khan",
}: {
  width?: number;
  height?: number;
  logo?: "khan" | "marcus";
}) {
  return (
    <Link className="inline-flex pt-2" href="/" aria-label="Khan">
      <div className="inline-flex relative before:absolute before:inset-0 before:bg-purple-500 before:blur-md before:rounded-full">
        <div className="rounded-full text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.purple.500),_theme(colors.purple.500))_padding-box,_linear-gradient(theme(colors.purple.500),_theme(colors.purple.200)_75%,_theme(colors.transparent)_100%)_border-box] relative  before:rounded-full before:pointer-events-none shadow">
          <Image
            className="max-w-none rounded-full "
            src={logo === "khan" ? LogoKhan : LogoTelegram}
            width={width}
            height={height}
            priority
            alt="Khan"
          />
        </div>
      </div>
    </Link>
  );
}
