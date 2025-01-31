import React, { useState } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';

export default function TerminalBot() {
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput key="initial">Welcome to the Genghis Kahn AI Bot!</TerminalOutput>,
  ]);

  const handleInput = async (terminalInput: string) => {
    console.log('[TerminalBot] User input:', terminalInput);

    try {
      const response = await fetch('/api/run-bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command: terminalInput }),
      });

      console.log('[TerminalBot] API response status:', response.status);

      const data = await response.json();
      console.log('[TerminalBot] API response data:', data);

      setTerminalLineData((prev) => [
        ...prev,
        <TerminalOutput key={`input-${Date.now()}`}>{`> ${terminalInput}`}</TerminalOutput>,
        <TerminalOutput key={`output-${Date.now()}`}>{data.output}</TerminalOutput>,
      ]);
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