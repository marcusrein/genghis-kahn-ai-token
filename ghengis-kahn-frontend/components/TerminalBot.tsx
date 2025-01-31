"use client";

import React, { useState } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';


export default function TerminalBot() {
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput key="initial">Welcome to the Genghis Kahn AI Bot!</TerminalOutput>,
  ]);

  const handleInput = async (terminalInput: string) => {
    console.log('[TerminalBot] User input:', terminalInput);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`, // Ensure your API key is set in your environment
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: terminalInput }],
        }),
      });

      console.log('[TerminalBot] API response status:', response.status);

      const data = await response.json();
      console.log('[TerminalBot] API response data:', data);

      if (data.choices && data.choices.length > 0) {
        setTerminalLineData((prev) => [
          ...prev,
          <TerminalOutput key={`input-${Date.now()}`}>{`> ${terminalInput}`}</TerminalOutput>,
          <TerminalOutput key={`output-${Date.now()}`}>{data.choices[0].message.content}</TerminalOutput>,
        ]);
      } else {
        setTerminalLineData((prev) => [
          ...prev,
          <TerminalOutput key={`input-${Date.now()}`}>{`> ${terminalInput}`}</TerminalOutput>,
          <TerminalOutput key={`output-${Date.now()}`}>No response from OpenAI</TerminalOutput>,
        ]);
      }
    } catch (error) {
      console.error('[TerminalBot] Error executing command:', error);
      setTerminalLineData((prev) => [
        ...prev,
        <TerminalOutput key={`error-${Date.now()}`}>Error executing command</TerminalOutput>,
      ]);
    }
  };

  return (
    <div className="container">
      <Terminal
        name="Genghis Kahn AI Bot"
        colorMode={ColorMode.Dark}
        onInput={handleInput}
      >
        {terminalLineData}
      </Terminal>
    </div>
  );
} 