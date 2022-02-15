import { useRef } from "react"
import EVENTS from "../config/events"
import { useSockets } from "../context/socket.context"

function RoomsContainer() {
    const { socket, roomId, rooms } = useSockets()
    const newRoomRef = useRef(null)

    function handleCreateRoom() {
        // Get the room name
        const roomName = newRoomRef.current.value || ''
        
        if (!String(roomName).trim()) return

        // Emit room created event
        socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName })

        // Set room name input to empty string
        newRoomRef.current.value = ''
    }

    return <nav>
        <div>
            <input ref={newRoomRef} placeholder='Room name' />
            <button onClick={handleCreateRoom}>Create Room</button>
        </div>

        {Object.keys(rooms).map(key => {
            return <div key={key}>{rooms[key].name}</div>
        })}
    </nav>
}

export default RoomsContainer
