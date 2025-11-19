import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export const getSocket = (): Socket => {
  if (!socket) {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000'
    socket = io(socketUrl, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    })
  }
  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

export const useSocketListener = (event: string, callback: (data: any) => void) => {
  const socket = getSocket()
  
  socket.off(event)
  socket.on(event, callback)
  
  return () => {
    socket.off(event)
  }
}
