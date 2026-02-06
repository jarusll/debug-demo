import { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const factorialIterative = (num) => {
    let factorial = 1;
    for (let i = 2; i <= num; i++) {
      factorial *= i;
    }
    return factorial;
  };

  const factorialRecursive = (num) => {
    if (num === 0 || num === 1) return 1;
    return num * factorialRecursive(num - 1);
  };

  const factorialServer = (num) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(factorialIterative(num));
      }, Math.random() * 2000);
    });
  };

  const handleIterativeFactorial = () => {
    const num = parseInt(input, 10);
    if (isNaN(num) || num < 0) {
      setResult('Please enter a valid non-negative number.');
      return;
    }
    setResult(factorialIterative(num));
  };

  const handleRecursiveFactorial = () => {
    const num = parseInt(input, 10);
    if (isNaN(num) || num < 0) {
      setResult('Please enter a valid non-negative number.');
      return;
    }
    setResult(factorialRecursive(num));
  };

  const handleServerFactorial = () => {
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
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1>Factorial Calculator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={input}
          onChange={handleInput}
          placeholder="Enter a number"
          style={{ marginBottom: '20px', padding: '10px', fontSize: '16px', textAlign: 'center' }}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="button" onClick={handleIterativeFactorial}>Factorial (Iterative)</button>
          <button type="button" onClick={handleRecursiveFactorial}>Factorial (Recursive)</button>
          <button type="button" onClick={handleServerFactorial}>Factorial (Server)</button>
        </div>
      </form>
      <div style={{ opacity: isPending ? 0.2 : 1 }}>
        <h2>Result: {result}</h2>
      </div>
    </div>
  );
}

export default App;
