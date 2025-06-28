"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Share,
  MessageCircle,
  LogOut,
  ScreenShare,
  Users,
  Smile,
  PhoneOff,
  Send,
} from "lucide-react"

interface ChatMessage {
  id: number
  time: string
  user: string
  message: string
}

export default function VideoMeetingApp() {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, time: "12:30", user: "Koki", message: "こんにちは！" },
    { id: 2, time: "12:31", user: "Yumi", message: "よろしくお願いします" },
    { id: 3, time: "12:32", user: "Alex", message: "資料共有しますね" },
    { id: 4, time: "12:33", user: "Koki", message: "ありがとうございます" },
    { id: 5, time: "12:34", user: "Yumi", message: "画面が見えています" },
  ])

  const participants = [
    { id: 1, name: "Koki", avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c" },
    { id: 2, name: "Yumi", avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c" },
    { id: 3, name: "Alex", avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c" },
    { id: 4, name: "Maria", avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c" },
  ]

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage: ChatMessage = {
        id: chatMessages.length + 1,
        time: new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }),
        user: "You",
        message: chatMessage,
      }
      setChatMessages([...chatMessages, newMessage])
      setChatMessage("")
    }
  }

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold">📍 プロジェクト会議 / Room A</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center space-x-1"
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            <span className="hidden sm:inline">Mic</span>
          </Button>
          <Button
            variant={isVideoOn ? "secondary" : "destructive"}
            size="sm"
            onClick={() => setIsVideoOn(!isVideoOn)}
            className="flex items-center space-x-1"
          >
            {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            <span className="hidden sm:inline">Cam</span>
          </Button>
          <Button variant="secondary" size="sm" className="flex items-center space-x-1">
            <Share className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
          <Button variant="secondary" size="sm" className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Chat</span>
          </Button>
          <Button variant="destructive" size="sm" className="flex items-center space-x-1">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Leave</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Video Grid */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            {participants.map((participant) => (
              <Card key={participant.id} className="bg-gray-800 border-gray-700 relative overflow-hidden">
                <div className="aspect-video bg-gray-700 flex items-center justify-center relative">
                  {isVideoOn ? (
                    <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                      <div className="text-center">
                        <img
                          src={`/placeholder.svg?height=80&width=80&query=Google avatar for ${participant.name}`}
                          alt={participant.name}
                          className="w-20 h-20 rounded-full mx-auto mb-2 border-2 border-white"
                        />
                        <span className="text-white font-medium">{participant.name}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                      <div className="text-center">
                        <VideoOff className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <span className="text-gray-400">カメラがオフです</span>
                      </div>
                    </div>
                  )}

                  {/* Participant name overlay */}
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-sm">
                    {participant.name}
                  </div>

                  {/* Mute indicator */}
                  {isMuted && participant.name === "You" && (
                    <div className="absolute top-2 right-2 bg-red-500 p-1 rounded">
                      <MicOff className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Chat Panel */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h3 className="font-semibold">Chat Log</h3>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="text-sm">
                  <span className="text-gray-400">{msg.time}</span>
                  <span className="text-blue-400 ml-2">{msg.user}</span>
                  <span className="text-gray-300 ml-1">:</span>
                  <div className="text-white mt-1">{msg.message}</div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <Input
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="メッセージを入力..."
                className="bg-gray-700 border-gray-600 text-white"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button size="sm" onClick={handleSendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="bg-gray-800 p-4 border-t border-gray-700">
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center space-x-2"
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            <span>{isMuted ? "ミュート解除" : "ミュート"}</span>
          </Button>

          <Button
            variant={isVideoOn ? "secondary" : "destructive"}
            onClick={() => setIsVideoOn(!isVideoOn)}
            className="flex items-center space-x-2"
          >
            {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            <span>{isVideoOn ? "ビデオ停止" : "ビデオ開始"}</span>
          </Button>

          <Button variant="secondary" className="flex items-center space-x-2">
            <ScreenShare className="w-5 h-5" />
            <span>画面共有</span>
          </Button>

          <Button variant="secondary" className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>参加者</span>
          </Button>

          <Button variant="secondary" className="flex items-center space-x-2">
            <Smile className="w-5 h-5" />
            <span>リアクション</span>
          </Button>

          <Button variant="destructive" className="flex items-center space-x-2">
            <PhoneOff className="w-5 h-5" />
            <span>終了</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
