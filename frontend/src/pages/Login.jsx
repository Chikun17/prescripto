import React, { useState } from 'react'

const Login = () => {

  const [state, setState] = useState('sign up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    console.log({ name, email, password })
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-4 m-auto p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg bg-white'>

        <p className='text-2xl font-semibold text-center'>
          {state === 'sign up' ? "Create Account" : "Log in"}
        </p>

        <p className='text-center'>
          Please {state === 'sign up' ? "sign up" : "log in"} to book an appointment
        </p>

        {state === 'sign up' && (
          <div className='w-full'>
            <p>Full Name</p>
            <input
              className='border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className='w-full'>
          <p>Email</p>
          <input
            className='border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
            className='border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button
          type="submit"
          className='bg-primary text-white py-2 rounded-md hover:bg-blue-600 transition-all duration-300'
        >
          {state === 'sign up' ? "Create Account" : "Log in"}
        </button>

        <p className='text-center text-xs mt-2'>
          {state === 'sign up' ? "Already have an account?" : "Don't have an account?"}
          <span
            onClick={() => setState(state === 'sign up' ? 'login' : 'sign up')}
            className='text-primary cursor-pointer ml-1'
          >
            {state === 'sign up' ? "Login here" : "Sign up"}
          </span>
        </p>

      </div>
    </form>
  )
}

export default Login