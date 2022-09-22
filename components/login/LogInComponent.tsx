import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocalStore } from '../../hooks/useLocalStore'
import { useLogInMutation } from '../../store/apis/userApi'
import { setCredentials } from '../../store/auth/authSlice'
import styles from './styles/login.module.css'

const LogInComponent = () => {

    const route = useRouter()
    const dispatch = useDispatch()
    const [isCheck, setIsCheck] = useState(false)

    const [logIn, { isLoading }] = useLogInMutation()

    const [_, setToken] = useLocalStore('token', '')
    const [__, setUser] = useLocalStore('user', '')

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            username: { value: string };
            password: { value: string };
        }

        const username = target.username.value
        const password = target.password.value

        const user = {
            userName: username,
            password
        }
        try {
            const { token } = await logIn(user).unwrap()
            setToken(token)
            setUser({ username })
            const userData = {
                user: { username },
                token: token ?? ''
            }
            dispatch(setCredentials(userData))
            !isLoading && route.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={styles.container}>
            <form
                className={styles.formContainer}
                onSubmit={handleSubmit}
            >
                <label className={styles.labelForm}>Username</label>
                <input
                    type="text"
                    placeholder='username'
                    name='username'
                    className={styles.inputForm}
                />
                <label className={styles.labelForm}>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder='password'
                    className={styles.inputForm}
                />
                <div className={styles.checkbox}>
                    <label className={styles.labelForm}>Mantener sesión</label>
                    <input
                        type="checkbox"
                        name="sessionType"
                        onChange={() => setIsCheck(!isCheck)}
                    />
                </div>
                <button
                    type="submit"
                    className={styles.inputButtonForm}
                >Login</button>
            </form>
        </div>
    )
}

export default LogInComponent