//import { useState } from 'react'
// will resolve in case there is any hard coded reference
// const {BASE_URL} = import.meta.env
import { SongInputForm } from "./components/example-form"

function App() {

  return (
    <>
    <div className='bg-indigo-400 h-screen w-screen'>
      <h1 className='text-3xl text-center pt-10 font-bold'>Spotify Song Info App</h1>
      <div className="flex justify-center pt-10 text-center">
        <SongInputForm />
      </div>
      
    </div>
      

    </>
  )
}

export default App
