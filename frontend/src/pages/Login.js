import React, { useState } from 'react'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
    }

    return (
        <form className='login' onSubmit={ handleSubmit }>
            <h3>Login</h3>
            <label htmlFor="email">Email : </label>
            <input name='email' type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <label htmlFor="password">Password : </label>
            <input name='password' type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <button>Login</button>
        </form>
    )
}

export default Login