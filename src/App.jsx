import { useState } from 'react';
import './App.css';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('-');
  const [isPending, setIsPending] = useState(false);

  function factorialIterative(num) {
    let factorial = 1;
    for (let i = 2; i <= num; i++) {
      factorial *= i;
    }
    return factorial;
  }

  function factorialRecursive(num) {
    if (num === 0 || num === 1) return 1;
    return num * factorialRecursive(num - 1);
  }

  function factorialServer(num) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(factorialIterative(num));
      }, Math.random() * 2000);
    });
  }

  function handleIterativeFactorial() {
    const num = parseInt(input, 10);
    if (isNaN(num) || num < 0) {
      setResult('Please enter a valid non-negative number.');
      return;
    }
    setResult(factorialIterative(num));
  }

  function handleRecursiveFactorial() {
    const num = parseInt(input, 10);
    if (isNaN(num) || num < 0) {
      setResult('Please enter a valid non-negative number.');
      return;
    }
    setResult(factorialRecursive(num));
  }

  function handleServerFactorial() {
    const number = parseInt(input, 10);
    if (isNaN(number) || number < 0) {
      setResult('Please enter a valid non-negative number.');
      return;
    }
    setIsPending(true);
    factorialServer(number).then((response) => {
      setResult(response);
    }).catch(() => {
      setResult('Error calculating factorial on server.');
    }).finally(() => {
      setIsPending(false);
    });
  }

  async function handleServerCaught() {
    setIsPending(true);
    try {
      throw new Error("Handled - Cannot reach server")
    } catch (err) {
      setResult(`${err.message || err.toString()}`);
    } finally {
      setIsPending(false);
    }
  }

  async function handleServerUncaught() {
    throw new Error("Unhandled rejection")
  }

  function handleInput(e) {
    setInput(e.target.value);
  }

  async function handleTypicodeRequest() {
    setIsPending(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const data = await response.json();
      setResult(`Typicode: ${data.title || 'No title found'}`);
    } catch (e) {
      e; // thank you linter
      setResult('Error fetching Typicode data.');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1>Factorial Debug</h1>
      <form>
        <input
          type="number"
          value={input}
          onChange={handleInput}
          placeholder="Enter a number"
          style={{ marginBottom: '20px', padding: '10px', fontSize: '16px', textAlign: 'center' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" onClick={handleIterativeFactorial}>Iterative</button>
            <button type="button" onClick={handleRecursiveFactorial}>Recursive</button>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" onClick={handleServerFactorial}>Server</button>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" onClick={handleServerCaught}>Server with caught exception</button>
            <button type="button" onClick={handleServerUncaught}>Server with uncaught exception</button>
          </div>
        </div>
        <hr style={{ margin: '20px 0', width: '100%' }} />
        <button type="button" onClick={handleTypicodeRequest}>Make typicode request</button>
      </form>
      <div style={{ opacity: isPending ? 0.2 : 1 }}>
        <h2>Result: {result}</h2>
      </div>
    </div>
  );
}

export const NamedExport = "any js thing"
