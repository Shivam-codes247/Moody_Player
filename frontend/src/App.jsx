import { useState } from 'react'
import FaceExpressionDetector from './components/FaceExpressionDetector'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <FaceExpressionDetector />
    </>
  )
}

export default App
