import { QueryClient } from '@tanstack/react-query'
import { useMessages } from '../hooks'


export const MessageList = ({ queryClient }: { queryClient: QueryClient }) => {
    const { isLoading, error, data } = useMessages(queryClient)

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>An error has occurred: {error.message}</div>
    return (
        <ul>
            {data && data.map((message) => (
                <li key={message.id}>{message.text}</li>
            ))}
        </ul>
    )
}
