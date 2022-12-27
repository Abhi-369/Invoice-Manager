import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [showPass, setShowPass] = useState(false)
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
        oldName: ''
    })

    const navigate = useNavigate()

    const pathName = window.location.pathname.split('/')

    const update = pathName.includes("update")

    const handleChange = (e) => {
        const value = e.target.value
        setLoginData({ ...loginData, [e.target.name]: value })
    }

    const handleLogin = async () => {

        {
            update ? await axios.put('https://invoice-api-m465.onrender.com/api/auth', loginData)
                // update ? await axios.put('http://localhost:5000/api/auth', loginData)
                .then((res) => setLoginData(...loginData, { username: res?.data?.username }))
                .catch((err) => console.log(err))

                : await axios.post('https://invoice-api-m465.onrender.com/api/auth', loginData)
            // : await axios.post('http://localhost:5000/api/auth', loginData)
        }

        localStorage.setItem('user', JSON.stringify(loginData.username))

        window.location.reload()
        navigate('/list')
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex flex-col justify-center gap-10 px-7 h-72 rounded-lg bg-[#d8042a]'>
                <div className='flex flex-col gap-7 items-center justify-center'>
                    {update &&
                        <div className='flex items-center gap-5'>
                            <label htmlFor="name" className='text-white font-medium'>OldUserName:</label>
                            <input type="text" id='name' name='oldName' placeholder="username" className='outline-none border-none rounded-md px-2 py-1 text-black font-semibold' onChange={handleChange} />
                        </div>
                    }
                    <div className='flex items-center gap-5'>
                        <label htmlFor="name" className='text-white font-medium'>{update ? 'NewUserName' : 'UserName'}</label>
                        <input type="text" id='name' name='username' placeholder="username" className='outline-none border-none rounded-md px-2 py-1 text-black font-semibold' onChange={handleChange} />
                    </div>
                    <div className='flex gap-5'>
                        <label htmlFor="pass" className='text-white font-medium'>{update ? 'NewPassword' : 'Password'}</label>
                        <div>
                            <input type={showPass ? 'text' : 'password'} name='password' placeholder='password' id='pass' className='outline-none border-none rounded-md px-2 py-1 font-semibold' onChange={handleChange} />
                            <div className='text-white flex items-center gap-3 pt-1'>
                                <input type="checkbox" onChange={(e) => setShowPass(e.target.checked)} />show password
                            </div>
                        </div>
                    </div>
                </div>
                <button className="text-white border px-5 py-1 rounded-md hover:bg-slate-200 hover:text-black transition-all duration-200 ease-in active:bg-slate-300 font-semibold" onClick={handleLogin}>{update ? 'Update' : 'Login'}</button>
            </div>
        </div>
    )
}

export default Login
