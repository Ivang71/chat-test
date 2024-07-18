import { useWebSocket } from '.'
import { useEffect } from 'react'
import { QueryClient, useQuery } from '@tanstack/react-query'
import { Message } from '../types/common'


export const useMessages = (queryClient: QueryClient) => {
    const socket = useWebSocket('ws://localhost:8080')

    const { data, isLoading, error } = useQuery<Message[]>({
        queryKey: ['messages'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8000/api/messages')
            return await response.json()
        },
        initialData: []
    })

    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                const eventData = JSON.parse(event.data)
                queryClient.setQueryData(['messages'], (oldData: string[]) => {
                    if (eventData.type === 'add') {
                        return [...oldData, { text: eventData.text, id: eventData.id }]
                    }
                    if (eventData.type === 'delete') {
                        return oldData.slice(1)
                    }
                })
            }
        }
    }, [socket, queryClient])

    return { data, isLoading, error }
}
