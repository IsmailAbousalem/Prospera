import { Link } from 'react-router-dom'; // Import Link
import { Button } from "@/components/ui/button"
import { MessageCircleIcon } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-amber-50 border-b border-amber-200 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-amber-800">Prospera</Link>
        <div className="flex items-center space-x-2 text-amber-700">
          <span className="hidden sm:inline">Have questions? </span>
          <Link to="/chat" className="text-amber-500 hover:text-amber-600 hover:bg-amber-100">
            Ask our chat bot!
          </Link>
          <Button variant="ghost" size="icon" className="text-amber-500 hover:text-amber-600 hover:bg-amber-100">
            <MessageCircleIcon className="h-6 w-6" />
            <span className="sr-only">Open chat bot</span>
          </Button>
        </div>
      </div>
    </header>
  )
}