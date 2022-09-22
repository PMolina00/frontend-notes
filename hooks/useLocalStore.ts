import React, {useState} from 'react'

export const useLocalStore = (key: string, initialValue: string) => {
    const [storeValue, setStoreValue] = useState(()=> {
        try{
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        }catch(error){
            return initialValue
        }
    })
    const setValue = (value: string) => {
        try {
            setStoreValue(value)
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.log(error)
        }
    }
    return [storeValue, setValue]
}