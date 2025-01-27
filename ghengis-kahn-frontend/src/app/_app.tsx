import {
  Animator,
  AnimatorGeneralProvider,
  BleepsProvider,
  Dots,
  GridLines,
  MovingLines,
} from "@arwes/react";
import { AppProps } from "next/app";
import "../app/globals.css";

// 2) Animator settings for global durations, etc.
const animatorsSettings = {
  duration: {
    enter: 0.2,
    exit: 0.2,
    stagger: 0.04,
  },
};

// 3) Define global bleep sound effects (optional).
const bleepsSettings = {
  master: {
    volume: 0.9,
  },
  bleeps: {
    intro: {
      sources: [
        {
          src: "https://arwes.dev/assets/sounds/intro.mp3",
          type: "audio/mpeg",
        },
      ],
    },
    click: {
      sources: [
        {
          src: "https://arwes.dev/assets/sounds/click.mp3",
          type: "audio/mpeg",
        },
      ],
    },
  },
};

function Background() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1, // behind everything
      }}
    >
      <GridLines lineColor="#000" />
      <Dots color="#000" />
      <MovingLines lineColor="#000" />
    </div>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  // Using a common pattern to have a client that can be shared across pages

  return (
    <>
      <AnimatorGeneralProvider {...animatorsSettings}>
        <BleepsProvider {...bleepsSettings}>
          {/* Animator wrapper to control animations across the app */}
          <Animator combine manager="stagger" active={true}>
            {/* Arwes background effect */}
            <Background />

            {/* The actual page content */}
            <Component {...pageProps} />
          </Animator>
        </BleepsProvider>
      </AnimatorGeneralProvider>
    </>
  );
}
