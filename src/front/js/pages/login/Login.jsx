import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";


export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
        const data = { email, password }
        actions.login(data, navigate)
    }

    return (

        <form onSubmit={onSubmit}>
            <div className='mb-3'>
                <label htmlFor={"email"} className='form-label text-light'>
                    Email
                </label>
                <input
                    type={"text"}
                    className={"form-control"}
                    id={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor={"password"} className='form-label  text-light'>
                    Password
                </label>
                <input
                    type={"text"}
                    className={"form-control"}
                    id={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button>Login</button>
        </form>
    )
}