import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup'


function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, password)
    }

    return (
        <form className='signup' onSubmit={handleSubmit}>
            <h3>Sign up</h3>
            <label htmlFor="email">Email : </label>
            <input name='email' type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <label htmlFor="password">Password : </label>
            <input name='password' type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <button disabled={isLoading}>Sign up</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Signup