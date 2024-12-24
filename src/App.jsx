import { useCallback, useRef, useState } from 'react'

import './App.css'

function App() {

  const [length, setlength] = useState(8)
  const [numAllowed, setnumAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setpassword] = useState("")

  //useRef hook to copy the password
  const passwordRef = useRef()

  
  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select()
      window.navigator.clipboard.writeText(password)
  }, [password])


  const passwordGenerator = useCallback(() => {
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(numAllowed) str += "123456789"
      if(charAllowed) str += "@#$%^&*()!"
      for(let i=0; i<length; i++){
        pass += str.charAt(Math.floor(Math.random() * str.length))
      }
      setpassword(pass)
  }, [length,numAllowed,charAllowed])


  return (
    <>
    <div className="flex flex-col items-center m-4   min-h-screen py-10">
      <h2 className="text-md md:text-2xl font-bold mb-6 md:mb-12">Random Password Generator</h2>

      {/* Password Field */}
      <div className="flex items-center w-full max-w-md mb-4">
        <input
          type="text"
          value={password}
          readOnly
          className="flex-1 p-3 border border-gray-300 rounded-l-md font-semibold text-gray-800 focus:outline-none"
          placeholder="Generated password"
          ref={passwordRef}
        />
        <button
        onClick={copyToClipBoard}
          className="bg-green-500 text-white px-4 py-3 rounded-r-md hover:bg-green-600"
        >
          Copy
        </button>
      </div>

      {/* Length Slider */}
      <div className="w-full max-w-md mb-4">
        <label className="block text-gray-200 font-medium mb-2">
          Password Length: <span className="font-bold">{length}</span>
        </label>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          className="w-full"
          onChange={(e)=>{setlength(e.target.value)}}
        />
      </div>

      {/* Checkboxes */}
      <div className="w-full max-w-md mb-6">
        <label className="flex items-center mb-2 text-gray-200">
          <input
            type="checkbox"
            checked={numAllowed}
            className="mr-2"
          onChange={()=>{setnumAllowed((prev)=>!prev)}}
          />
           Numbers
        </label>
        <label className="flex items-center text-gray-200">
          <input
            type="checkbox"
            checked={charAllowed}
            className="mr-2"
            onChange={()=>{setcharAllowed((prev)=>!prev)}}
          />
           Special Characters
        </label>
      </div>

      {/* Generate Button */}
      <button onClick={passwordGenerator}
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
      >
        Generate Password
      </button>
    </div>
    </>
  )
}

export default App
