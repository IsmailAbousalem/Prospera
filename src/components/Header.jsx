import { Link } from 'react-router-dom'; // Import Link
import { Button } from "@/components/ui/button"
import { MessageCircleIcon } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-amber-50 border-b border-amber-200 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
      <Link to="/"> {/* Wrap the image in a Link to make it clickable */}
          <img src='/src/assets/prosperatitle.png' alt="Prospera Title" style={{ width: '200px', height: 'auto' }} />
       </Link>
      <div className="flex items-center space-x-2 text-amber-700">
          <span className="hidden sm:inline">Have questions? </span>
          <Link to="/chat" className="text-amber-500 hover:text-amber-600 hover:bg-amber-100">
            Ask Foxy!
          </Link>
          <Link to="/chat" >
          <img src='/src/assets/Question.png' alt="Foxy" style={{ width: '40px', height: 'auto' }}/>
          </Link>
        </div>
      </div>
    </header>
  )
}