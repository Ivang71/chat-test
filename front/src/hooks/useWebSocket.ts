import { useState, useEffect } from 'react'


export const useWebSocket = (url: string) => {
    const [socket, setSocket] = useState<WebSocket | null>(null)

    useEffect(() => {
        const newSocket = new WebSocket(url)
        setSocket(newSocket)
        return () => newSocket.close()
    }, [url])

    return socket
}
