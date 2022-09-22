import { useState } from 'react'

export const useModal = () => {
    const [status, setStatus] = useState<boolean>(false)
    const modalStatus = () => setStatus(!status)
    return [status, modalStatus]
}