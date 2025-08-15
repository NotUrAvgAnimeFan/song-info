import { ThemeProvider} from "@/components/theme-provider"
import { SongInputForm } from "./components/example-form"
import { ModeToggle } from "@/components/mode-toggle"


function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='bg-eggshell dark:bg-mid h-screen w-screen'>
        <div className="">
          
          <h1 className='text-2xl sm:text-3xl text-center pt-10 font-bold text-mid dark:text-greyish'>Spotify Song Info App</h1>
          <div className="absolute top-10 right-4">
            <ModeToggle />
          </div>
        </div>
        <div className="flex justify-center pt-10 text-center">
          <SongInputForm />
        </div>
        
      </div>
    </ThemeProvider>
  )
}

export default App
