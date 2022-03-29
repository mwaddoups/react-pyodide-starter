export async function loadPyodide() {
  if (!window.pyodide?.runPython) {
    console.log('Loading pyodide...')
    window.pyodide = await window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.19.1/full/" });
    await window.pyodide.loadPackage(['micropip', 'numpy', 'nltk']);
    console.log('Loaded pyodide, now loading custom library...');

    await window.pyodide.runPythonAsync(`
      import micropip
    `);
    console.log('Loaded custom libary.');
  } else {
    console.log('Pyodide already loaded.');
  }
}

export async function runPython(code: string, input: string) {
  window.textInput = input;
  await window.pyodide.runPythonAsync(code);
  return window.textOutput;
}

declare global {
  interface Window {
      pyodide: any,
      loadPyodide: any,
      textInput: string,
      textOutput: string,
  }
};