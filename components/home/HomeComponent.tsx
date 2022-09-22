import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetNotesQuery } from '../../store/apis/notesApi'
import { setCredentials } from '../../store/auth/authSlice'
import { RootState } from '../../store/store'
import { Card } from '../Card'
import { Modal } from '../Modal'
import NoteFormComponent from '../noteForm/NoteFormComponent'
import styles from './styles/home.module.css'

export interface HomeComponentInterface {
    setOpenClose: any,
    isOpen: any
}

const HomeComponent: React.FC<HomeComponentInterface> = ({ setOpenClose, isOpen }) => {
    const route = useRouter()
    const dispatch = useDispatch()
    const userState = useSelector((state: RootState) => state.auth)

    const [loadCreate, setLoadCreate] = useState<boolean | null>(null)

    useEffect(() => {
        if (userState.user === null) {
            if (typeof window !== 'undefined') {
                // You now have access to `window`
                const user = window.localStorage.getItem('user') !== null ? JSON.parse(window.localStorage.getItem('user')!) : null
                const token = window.localStorage.getItem('token') !== null ? JSON.parse(window.localStorage.getItem('token')!) : null
                if (token === null) {
                    route.push('/login')
                }
                dispatch(setCredentials({
                    user: user,
                    token: token
                }))
            }
        }
        loadCreate === false && route.reload()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState, loadCreate])

    const { data, isLoading, error }: any = useGetNotesQuery('')

    if (isLoading === true) {
        return <>Loading...</>
    } else {
        if (error?.status === 'FETCH_ERROR' || error?.status === 400) {
            route.push('/login')
        }
    }

    return (
        <div className={styles.container}>
            {isOpen &&
                <Modal setOpenClose={setOpenClose}>
                    <NoteFormComponent setLoadCreate={setLoadCreate} />
                </Modal>
            }

            <Card data={data} />
        </div>
    )
}

export default HomeComponent