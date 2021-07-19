const Login = () => {
    return(
        <div>
            <h1>Login Here</h1>

            
            <form className='login-wrapper'>
            <label>
                <p>Username</p>
                <input type="text" />
            </label>
            <label>
                <p>Password</p>
                <input type="password" />
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
            </form>
        </div>

        
      )
}

export default Login
