import React from "react";
import { useEffect, useState } from "react";
import { loadPyodide } from "./api";

function App() {
  const [loading, setLoading] = useState(true);
  const [textInput, setTextInput] = useState('')
  const [python, setPython] = useState('')

  useEffect(() => {
    (async () => {
      await loadPyodide();
      setLoading(false)
    })();
  }, [])

  return (
    <div className="w-full mx-auto p-4">
      {loading && <h1>Loading Pyodide...</h1>}
      <h1 className="text-3xl mb-2">Pyodide Example</h1>
      <div className="flex">
        <div className="p-2 m-2 w-1/2">
          <h2 className="text-xl mb-2">Input Data</h2>
          <textarea className="text-sm px-2 py-1 rounded border resize-none h-48 w-full" />
        </div>
        <div className="p-2 m-2 w-1/2">
          <h2 className="text-xl mb-2">Output Data</h2>
          <p className="text-sm h-48 w-full rounded px-2 py-1">No output.</p>
        </div>
      </div>
      <div className="p-2 m-2 w-full">
        <h2 className="text-xl mb-2">Python Script</h2>
        <textarea className="text-sm px-2 py-1 rounded border resize-none h-48 w-full" id="python" value={python} onChange={e => setPython(e.target.value)} />
      </div>
    </div>
  );
}

export default App;
