"use client";

import { useState } from "react";

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMember: boolean;
  address?: string | null;
  networkError?: string | null;
}

export default function MembershipModal({
  isOpen,
  onClose,
  isMember,
  address,
  networkError,
}: MembershipModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-slate-900 rounded-lg w-full max-w-sm p-6 relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-slate-300 hover:text-white"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Modal content */}
        <h1 className="text-2xl font-semibold text-slate-200 mb-4 underline">
          Membership Information
        </h1>

        {/* Show networkError if present */}
        {networkError ? (
          <div className="text-red-500 mb-4">
            <p>{networkError}</p>
            <ul className="list-disc list-inside mt-2 text-slate-300">
              <li>Open MetaMask (or your wallet).</li>
              <li>Select "Networks" and click "Add network".</li>
              <li>Enter Base Mainnet with Chain ID 8453.</li>
              <li>Switch to your newly added network.</li>
            </ul>
          </div>
        ) : (
          <>
            {isMember ? (
              <>
                <p className="text-slate-300">
                  Welcome Member!
                  <br />
                  <br />
                  Join the
                  <a
                    href="https://discord.gg/FckzFjK9jR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline ml-1"
                  >
                    Membership Discord
                  </a>
                  !
                </p>
                {/* Link to the new Members page */}
                <div className="mt-4">
                  
                  <a
                    href="/members"
                    className="underline text-blue-400 hover:text-blue-200"
                    onClick={onClose}
                  >
                    Try out Genghis Kahn AI v0.1 (updated 1.30.2025)
                  </a>
                </div>
              </>
            ) : (
              <p className="text-slate-300">
                You are <span className="font-bold text-red-500">NOT</span> a Member.
                <br />
                <br />
                Join the Horde!
                <br />
                <br />
                Stake $KAHN on
                <a
                  href="https://creator.bid/agents/678e4b71970206e12577fcf4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline ml-1"
                >
                  CreatorBid
                </a>{" "}
                to become a Member.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
