import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { usePostNoteMutation, useUpdateNoteMutation } from '../../store/apis/notesApi'
import styles from './styles/noteForm.module.css'

interface Props {
    setLoadCreate: any,
    initialValue?: any,
    isUpdate?: boolean
}

const NoteFormComponent = (props: Props) => {
    const [important, setImportant] = useState(false)

    const initialValue = {
        id: uuid(),
        content: '',
        date: JSON.stringify(new Date),
        important,
        user: ''
    }

    const [note, setNote] = useState(props.initialValue ?? initialValue)


    const [postNote, { isLoading }] = usePostNoteMutation()
    const [updateNote, { isLoading: isLoadingUpdate }] = useUpdateNoteMutation()

    const handleChange = (e: any) => {
        setNote({
            ...note,
            [e.target.name]: e.target.name === 'important' ? !important : e.target.value
        })
        e.target.name === 'important' && setImportant(!important)
    }

    const handleSubmit = async (e: any) => {
        props.setLoadCreate(true)
        e.preventDefault()
        try {
            if (props.isUpdate === true) {
                updateNote(note).unwrap()
                !isLoadingUpdate && props.setLoadCreate(false)
            } else {
                await postNote(note).unwrap()
                !isLoading && props.setLoadCreate(false)
            }
            setNote(initialValue)
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <textarea
                    name="content"
                    placeholder='Content'
                    value={note.content}
                    className={styles.input}
                    onChange={handleChange}
                ></textarea>
                <input type="checkbox" name="important" onChange={handleChange} />
                <label className={styles.labelForm}> important </label>
                <button
                    className={styles.button}
                >save</button>
            </form>
        </div>
    )
}

export default NoteFormComponent