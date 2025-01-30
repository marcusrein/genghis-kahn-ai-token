"use client";

import { useState } from "react";

interface NetworkErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  networkError: string | null;
}

export default function NetworkErrorModal({
  isOpen,
  onClose,
  networkError,
}: NetworkErrorModalProps) {
  if (!isOpen || !networkError) return null;

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
          Network Error
        </h1>
        <div className="text-red-500 mb-4">
          <p>{networkError}</p>
          <ul className="list-disc list-inside mt-2 text-slate-300">
            <li>Open MetaMask (or your wallet).</li>
            <li>Select "Networks" and click "Add network".</li>
            <li>Enter Base Mainnet with Chain ID 8453.</li>
            <li>Switch to your newly added network.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
