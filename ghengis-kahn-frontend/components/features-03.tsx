// import Image from "next/image";
// import Highlighter, { HighlighterItem } from "./highlighter";

// import FeatureImg04 from "@/public/images/feature-image-04.png";

export default function Features03() {
  return (
    <section className="relative">
      {/* Blurred shape */}
      <div
        className="absolute top-0 -translate-y-1/4 left-1/2 -translate-x-1/2 blur-2xl opacity-50 pointer-events-none -z-10"
        aria-hidden="true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
          <defs>
            <linearGradient
              id="bs3-a"
              x1="19.609%"
              x2="50%"
              y1="14.544%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            fill="url(#bs3-a)"
            fillRule="evenodd"
            d="m410 0 461 369-284 58z"
            transform="matrix(1 0 0 -1 -410 427)"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div>
          {/* Section header */}
          {/* 
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
              More than a meme coin
            </h2>
            <p className="text-lg text-slate-400">
              $KAHN is a community-driven project
              that aims to provide a secure and decentralized platform for users
              to interact with the blockchain.
            </p>
          </div>
          */}
        </div>
      </div>
    </section>
  );
}
