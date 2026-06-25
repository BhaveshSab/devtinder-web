import { useState } from 'react'
import { Button } from "@/components/ui/button"



function App() {
  const [count, setCount] = useState(0)

  return (
    
     <div className="flex justify-center items-center h-screen">
      <Button variant="default">Hello From Shadcn!</Button>
    </div>

  )
}

export default App
