import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useDeleteNoteMutation } from '../../store/apis/notesApi'
import { Modal } from '../Modal'
import NoteFormComponent from '../noteForm/NoteFormComponent'
import styles from './styles/Card.module.css'

interface NotesData {
	id: string,
	content: string,
	date: string,
	important: boolean,
	user: {
		id: string,
		username: string
	}
}

export interface CardInterface {
	data: NotesData[]
}

interface ModalData {
	modalOpen: boolean,
	note: NotesData | null
}

const Card: React.FC<CardInterface> = ({ data }) => {
	const route = useRouter()
	const [deleteNote, { isLoading }] = useDeleteNoteMutation()
	const [isOpen, setIsOpenToClose] = useState<ModalData>({
		modalOpen: false,
		note: null
	})
	const [isLoad, setLoad] = useState<boolean>(true)
	useEffect(() => {
		!isLoad && route.reload()
	}, [isLoad, route])

	return (
		<div className={styles.Container}>
			{data?.map(note => {
				const handleDeleteButton = async () => {
					try {
						await deleteNote(note).unwrap()
						!isLoading && route.reload()
					} catch (error) {
						console.log(error)
					}
				}
				return (
					// eslint-disable-next-line react/no-unknown-property
					<div key={note.id} className={styles.CardContainer}>
						<div className={styles.ButtonCard}>
							<button onClick={() => {
								let isOpenModal = isOpen?.modalOpen
								setIsOpenToClose({
									modalOpen: !isOpenModal,
									note
								})
							}}>Edit</button>
							<button onClick={handleDeleteButton}>Delete</button>
						</div>
						<h3>{note.content}</h3>
						<p>{note.date}</p>
						<strong>{note.important ? 'important' : 'not important'}</strong>

					</div>
				)
			})}
			{isOpen?.modalOpen &&
				<Modal setOpenClose={setIsOpenToClose}>
					<NoteFormComponent setLoadCreate={setLoad} initialValue={isOpen.note} isUpdate={true} />
				</Modal>
			}
		</div>
	)
}

export default Card

