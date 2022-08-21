import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from 'axios'
require('dotenv').config();

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.post(process.env.REACT_APP_BASE_API_URL + '/api/user/signup', { email, password })
            if (response.status === 200) {
                //save to local storage
                console.log(response.data);
                localStorage.setItem('user', JSON.stringify(response.data))
                //update authcontext
                dispatch({ type: 'LOGIN', payload: response.data })
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error.response.data);
            if (error.response.status === 400) {
                setIsLoading(false)
                setError(error.response.data.msg)
                // setEmptyFields(error.response.data.data)
            }
        }
    }
    return  { signup, isLoading, error }
}
