import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { MessageList, InputBox } from './components'

const queryClient = new QueryClient()


export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <div>
                <h1>Chat</h1>
                <MessageList queryClient={queryClient}/>
                <InputBox />
            </div>
        </QueryClientProvider>
    )
}
