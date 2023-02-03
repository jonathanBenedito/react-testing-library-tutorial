import { useState } from "react"

export const Home = () => {

    const [signupInput, setSignInput] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        setSignInput({
            ...signupInput,
            [e.target.name]: e.target.value,
        })
    }

    const handleClick = (e) => {
        e.preventDefault();
    }

    return (
        <form>
            <label for="address">Email address</label>
            <br/>
            <input
                type="email"
                id="address"
                name="email"
                value={signupInput.email}
                onChange={handleChange}
            />
            <br/>

            <label for="password">Password</label>
            <br/>
            <input type="password" id="password" />
            <br/>

            <label for="confirm">Confirm Password</label>
            <br/>
            <input type="password" id="confirm" />
            <br/>
            <br/>

            <p>the email you input is invalid!</p>

            <input type="submit" value="Submit" />
        </form>
    )
}