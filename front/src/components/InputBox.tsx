import { useState } from 'react'

const sendMessageMutation = async (message: string) =>
    await fetch('http://localhost:8000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
    })


export const InputBox = () => {
    const [message, setMessage] = useState<string>('')

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()

        if (message) {
            try {
                await sendMessageMutation(message)
                setMessage('')
            } catch (error) {
                console.error('Error sending message:', error)
                // Handle errors appropriately, e.g., display an error message to the user
            }
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <input value={message} onChange={(e) => setMessage(e.target.value)}
                type="text" placeholder="Enter message" autoFocus />
            <button type="submit">Send</button>
        </form>
    )
}