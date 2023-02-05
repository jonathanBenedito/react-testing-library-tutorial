import { useState } from "react"
import validator from "validator"

export const Home = () => {

    const [signupInput, setSignInput] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [error, setError] = useState("")

    const handleChange = (e) => {
        setSignInput({
            ...signupInput,
            [e.target.name]: e.target.value,
        })
    }

    const handleClick = (e) => {
        e.preventDefault();

        if(!validator.isEmail(signupInput.email)){
            return setError("the email you input is invalid.")
        } else if (signupInput.password.length < 5) {
            return setError("The password should contain 5 or more characters.")
        } else if (signupInput.password !== signupInput.confirmPassword) {
            return setError("The passwords don't match. Try again.")
        }
        return setError("")
    }

    return (
        <form>
            <label htmlFor="address">Email address</label>
            <br/>
            <input
                type="email"
                id="address"
                name="email"
                value={signupInput.email}
                onChange={handleChange}
            />
            <br/>

            <label htmlFor="password">Password</label>
            <br/>
            <input
                type="password"
                id="password"
                name="password"
                value={signupInput.password}
                onChange={handleChange}
            />
            <br/>

            <label htmlFor="confirm">Confirm Password</label>
            <br/>
            <input
                type="password"
                id="confirm"
                name="confirmPassword"
                value={signupInput.confirmPassword}
                onChange={handleChange}
            />
            <br/>
            <br/>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <input type="submit" value="Submit" onClick={handleClick}/>
        </form>
    )
}