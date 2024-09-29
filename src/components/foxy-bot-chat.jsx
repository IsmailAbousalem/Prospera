import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SendIcon } from 'lucide-react'

export function FoxyBotChatJsx() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm Foxy Bot. How can I help you with your finances today?", sender: 'bot' }
  ])
  const [inputMessage, setInputMessage] = useState('')

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user'
    }

    setMessages(prevMessages => [...prevMessages, newMessage])
    setInputMessage('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Thank you for your message. I'm processing your request and will respond shortly.",
        sender: 'bot'
      }
      setMessages(prevMessages => [...prevMessages, botResponse])
    }, 1000)
  }

  return (
    (<div
      className="min-h-screen bg-gradient-to-br from-amber-100 to-red-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-amber-50 border-amber-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-amber-800 text-center">Get Financial with Foxy Bot</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full pr-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}>
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-amber-500 text-white'
                      : 'bg-amber-200 text-amber-900'
                  }`}>
                  {message.text}
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder="Type your message here..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage()
                }
              }}
              className="flex-grow border-amber-300 focus:border-amber-500 focus:ring-amber-500" />
            <Button
              onClick={handleSendMessage}
              className="bg-amber-500 hover:bg-amber-600 text-white">
              <SendIcon className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>)
  );
}