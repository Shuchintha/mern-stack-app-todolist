import './App.css'
import React, { useState, useEffect } from 'react'

function App() {
  const [state, setstate] = useState('hey')
  useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then(json => setstate(prevState => json.text))
  }, [])
  return <div className='App'>heeeee {JSON.stringify(state)}</div>
}

export default App
