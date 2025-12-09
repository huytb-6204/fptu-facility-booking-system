import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-10 bg-red-200 text-center">
      <h1 className="text-3xl font-bold text-blue-600">
        Tailwind is working!
      </h1>
    </div>
  );
}

export default App
