import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";


export const Register = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
        const data = { email, password, name }
        actions.register(data, navigate)
    }

    return (
        <div className="formLoging_container">
            <h3 className="text-light">Registrate</h3>
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
                    <label htmlFor={"name"} className='form-label  text-light'>
                        Name
                    </label>
                    <input
                        type={"text"}
                        className={"form-control"}
                        id={"name"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                <button className="btn btn-primary w-100">Register</button>
            </form>
        </div>
    )
}