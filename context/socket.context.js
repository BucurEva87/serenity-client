import io from 'socket.io-client'
import EVENTS from '../config/events'
import { createContext, useContext, useState } from 'react'
import { SOCKET_URL } from '../config/default'

console.log(SOCKET_URL)

const socket = io(SOCKET_URL)

const SocketContext = createContext({ 
    socket, 
    setUsername: () => false,
    rooms: {}
})

function SocketsProvider(props) {
    const [username, setUsername] = useState('')
    const [roomId, setRoomId] = useState('')
    const [rooms, setRooms] = useState({})

    socket.on(EVENTS.SERVER.ROOMS, (value) => {
        setRooms(value)
    })

    return (
        <SocketContext.Provider value={{ socket, username, setUsername, rooms, roomId }} { ...props }/>
    )
}

export const useSockets = () => useContext(SocketContext)

export default SocketsProvider
