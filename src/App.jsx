import { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const calculateFactorialIterative = (num) => {
    let factorial = 1;
    for (let i = 2; i <= num; i++) {
      factorial *= i;
    }
    return factorial;
  };

  const calculateFactorialRecursive = (num) => {
    if (num === 0 || num === 1) return 1;
    return num * calculateFactorialRecursive(num - 1);
  };

  const calculateFactorialServer = (number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(calculateFactorialIterative(number));
      }, Math.random() * 2000);
    });
  };

  const handleIterativeFactorial = () => {
    const num = parseInt(input, 10);
    if (isNaN(num) || num < 0) {
      setResult('Please enter a valid non-negative number.');
      return;
    }
    setResult(calculateFactorialIterative(num));
  };

  const handleRecursiveFactorial = () => {
    const num = parseInt(input, 10);
    if (isNaN(num) || num < 0) {
      setResult('Please enter a valid non-negative number.');
      return;
    }
    setResult(calculateFactorialRecursive(num));
  };

  const handleServerFactorial = () => {
    const number = parseInt(input, 10);
    if (isNaN(number) || number < 0) {
      setResult('Please enter a valid non-negative number.');
      return;
    }
    setIsPending(true);
    calculateFactorialServer(number).then((response) => {
      setResult(response);
    }).catch(() => {
      setResult('Error calculating factorial on server.');
    }).finally(() => {
      setIsPending(false);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(null);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
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
