import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin()
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);
        await login(email, password)
    }

    return (
        <form className='login' onSubmit={handleSubmit}>
            <h3>Login</h3>
            <label htmlFor="email">Email : </label>
            <input name='email' type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <label htmlFor="password">Password : </label>
            <input name='password' type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <button disabled={isLoading}>Login</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Login