import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { loadPyodide, runPython } from "./api";
import Loading from "./Loading";

function App() {
  const [loadingText, setLoadingText] = useState('');
  const [textInput, setTextInput] = useState<string>('Hello, my name is Mark!')
  const [textOutput, setTextOutput] = useState<string>('No output.')
  const [python, setPython] = useState<string>(`# For the demo I've downloaded
# The text input is stored in js.textInput
import js # Pyodide exposes this
input = js.textInput

# Any code goes here
import re
output = re.sub(r'Mark', r'{{NAME}}', input)

# The output then gets saved to js.textOutput
js.textOutput = output`)

  useEffect(() => {
    setLoadingText("Loading pyodide...");
    (async () => {
      await loadPyodide();

      setLoadingText("");
    })();
  }, [])

  const runCode = useCallback(async () => {
    setLoadingText("Running code...");
    try { 
      const output = await runPython(python, textInput);
      setTextOutput(output);
    } catch (err) {
      setTextOutput((err as any).toString());
    }
    setLoadingText("");
  }, [python, textInput])

  return (
    <Loading loading={loadingText}>
      <div className="w-full mx-auto p-4">
        <h1 className="text-3xl mb-2">Pyodide Example</h1>
        <div className="flex">
          <div className="p-2 m-2 w-1/2">
            <h2 className="text-xl mb-2">Input Data</h2>
            <textarea className="text-sm px-2 py-1 rounded border resize-none h-48 w-full" value={textInput} onChange={e => setTextInput(e.target.value)} />
          </div>
          <div className="p-2 m-2 w-1/2">
            <h2 className="text-xl mb-2">Output Data</h2>
            <p className="text-sm h-48 w-full rounded px-2 py-1 whitespace-pre-line overflow-scroll">{textOutput}</p>
          </div>
        </div>
        <div className="p-2 m-2 w-full">
          <h2 className="text-xl mb-2">Python Script</h2>
          <textarea className="text-xs font-mono px-2 py-1 rounded border resize-none h-48 w-full" id="python" value={python} onChange={e => setPython(e.target.value)} />
          <button className="mt-2 px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded" onClick={runCode}>Run Python</button>
        </div>
      </div>
    </Loading>
  );
}

export default App;

