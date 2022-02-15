import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSockets } from '../context/socket.context'

import RoomsContainer from '../containers/Rooms'
import MessagesContainer from '../containers/Messages'
import { useRef } from 'react'

export default function Home() {
	const { socket, username, setUsername } = useSockets()
	const usernameRef = useRef(null)

	function handleUsername() {
		const value = usernameRef.current.value
		if (!value) return

		setUsername(value)

		localStorage.setItem('username', value)
	}

	return (
		<div>
			{!username && (
				<div className={styles.usernameWrapper}>
					<div className={styles.usernameInner}>
						<input placeholder='Username' ref={usernameRef} />
						<button onClick={handleUsername}>Log In</button>
					</div>
				</div>)}
			{username && (
				<div className={styles.container}>
					<RoomsContainer />
					<MessagesContainer />
				</div>)}
		</div>
	)
}
