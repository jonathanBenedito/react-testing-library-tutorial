export const Home = () => {
    return (
        <form>
            <label for="address">Email address</label>
            <br/>
            <input type="email" id="address" />
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

            <input type="submit" value="Submit" />
        </form>
    )
}