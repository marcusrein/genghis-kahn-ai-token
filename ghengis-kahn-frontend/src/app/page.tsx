"use client"; // If you're using Next.js 13+ with the new app router, you might still need "use client".

import { gql, useQuery } from "@apollo/client";
import {
  Animated,
  Animator,
  BleepsOnAnimator,
  Text,
  useBleeps,
} from "@arwes/react";
import { faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import EventsDashboard from "../../components/EventsDashboard";
import siteInfo from "../../data/siteInfo.json";

// Your GraphQL queries
const GET_SUBSCRIBED_EVENTS = gql`
  query {
    subscribeds(first: 5, orderBy: blockTimestamp, orderDirection: desc) {
      id
      account
      ak
      blockTimestamp
    }
  }
`;

const GET_ACTIVE_MEMBERS = gql`
  {
    activeMembers(first: 1000) {
      id
      account
    }
  }
`;

// A small "card" frame wrapper using Arwes frames
function Card({ children }: React.PropsWithChildren) {
  const bleeps = useBleeps();

  return (
    <Animator merge combine manager="stagger">
      {/* Optional: play an intro bleep for each card on appear */}
      <BleepsOnAnimator transitions={{ entering: "intro" }} continuous />

      <Animated
        className="card"
        onClick={() => bleeps.click?.play()}
        style={{
          position: "relative",
          display: "block",
          margin: "1rem auto",
          padding: "2rem",
          maxWidth: 800,
          textAlign: "center",
        }}
      >
        {/* Some CSS to define corner frames color */}
        <style>{`
          .card .arwes-react-frames-framesvg [data-name=bg] {
            color: rgba(255,255,255,0.04);
          }
          .card .arwes-react-frames-framesvg [data-name=line] {
            color: rgba(80, 200, 250, 0.7);
          }
        `}</style>

        <Animator>{children}</Animator>
      </Animated>
    </Animator>
  );
}

// Chart Section
function ChartSection() {
  const { loading, error, data } = useQuery(GET_SUBSCRIBED_EVENTS);

  if (loading) return <Text as="p">Loading Chart...</Text>;
  if (error)
    return <Text as="p">Error loading chart data: {error.message}</Text>;
  if (!data?.subscribeds?.length)
    return <Text as="p">No subscribed events found.</Text>;

  // Existing transformation
  const chartData = data.subscribeds.map((event: any) => ({
    blockTimestamp: new Date(event.blockTimestamp * 1000).toLocaleString(),
    account: event.account,
    ak: Number(event.ak),
  }));

  return (
    <Card>
      <EventsDashboard />
    </Card>
  );
}

// Active Members Section
function ActiveMembersSection({ account }: { account: string }) {
  const { loading, error, data } = useQuery(GET_ACTIVE_MEMBERS);

  if (loading) return <Text as="p">Loading Active Members...</Text>;
  if (error)
    return <Text as="p">Error loading active members: {error.message}</Text>;
  if (!data?.activeMembers?.length)
    return <Text as="p">No active members found.</Text>;

  const isActiveMember = data.activeMembers.some(
    (member: { account: string }) =>
      member.account.toLowerCase() === account.toLowerCase()
  );

  return (
    <>
      {isActiveMember ? (
        <Text as="p" style={{ color: "lime" }}>
          Greetings, loyal Member! My generals and I are forging powerful new
          weapons for my trusted army. Ready your horses!
        </Text>
      ) : (
        <Text as="p">
          You are not recognized as an active member. Are you ready to join the
          horde?
        </Text>
      )}
    </>
  );
}

export default function Home() {
  const [lastUpdated, setLastUpdated] = useState("");
  const [account, setAccount] = useState("");

  useEffect(() => {
    setLastUpdated(new Date(siteInfo.lastUpdated).toLocaleString());
  }, []);

  const connectWallet = async () => {
    if ((window as any).ethereum) {
      const web3 = new Web3((window as any).ethereum);
      try {
        await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      console.error("No Ethereum provider found");
    }
  };

  return (
    <Animator>
      {/* Page Container */}
      <Animated
        style={{ margin: "2rem auto", maxWidth: 1200, padding: "1rem" }}
      >
        {/* Title + lastUpdated info */}
        <Card>
          <Text as="h1" style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
            Genghis Kahn AI
          </Text>
          <Text as="p" style={{ marginBottom: "1rem" }}>
            Join Genghis Kahn AI and become part of the future of AI Tokens
          </Text>
          <Text as="p" style={{ fontSize: "0.875rem", opacity: 0.8 }}>
            Last updated: {lastUpdated}
          </Text>
        </Card>

        {/* Connect Wallet Button */}
        <Card>
          <button
            onClick={connectWallet}
            style={{
              cursor: "pointer",
              padding: "0.5rem 1rem",
              backgroundColor: "teal",
              border: "none",
              borderRadius: "6px",
              color: "#FFF",
              fontWeight: "bold",
            }}
          >
            {account ? `Connected: ${account}` : "Connect Wallet"}
          </button>
        </Card>

        {/* Active Members Section */}
        <Card>
          <ActiveMembersSection account={account} />
        </Card>

        {/* Example YouTube Iframe */}
        <Card>
          <div
            style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
          >
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/dwNoImzJuUs?si=ugP3563wsqudUMTe"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </Card>

        {/* Roadmap Image */}
        <Card>
          <div style={{ textAlign: "center" }}>
            <Image
              src="/roadmap.png"
              alt="Roadmap"
              width={800}
              height={600}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </Card>

        {/* Chart Section */}
        <ChartSection />

        {/* Footer Social Icons */}
        <Card>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
          >
            <a
              href="https://twitter.com/GenghisKahnAI"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2.5rem",
                height: "2.5rem",
                backgroundColor: "#1DA1F2",
                borderRadius: "50%",
                color: "#fff",
              }}
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>

            <a
              href="https://www.t.me/GenghisKahnAI"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2.5rem",
                height: "2.5rem",
                backgroundColor: "#0088cc",
                borderRadius: "50%",
                color: "#fff",
              }}
            >
              <FontAwesomeIcon icon={faTelegram} />
            </a>

            <a
              href="https://creator.bid/agents/678e4b71970206e12577fcf4"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2.5rem",
                height: "2.5rem",
                backgroundColor: "#555",
                borderRadius: "50%",
                color: "#fff",
              }}
            >
              <FontAwesomeIcon icon={faGlobe} />
            </a>
          </div>
        </Card>
      </Animated>
    </Animator>
  );
}
