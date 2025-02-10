import './LoginPage.css';

function LoginPage() {
    return(
                <div id='login-page-component'>
                    <div id='login-content-container'>
                        <div id='login-register-button-container'>
                            <button id='login-button'>Login</button>
                            <button id='register-button'>Register</button>
                        </div>
                        <div id='login-form-container'>
                            <form id='login-form'>
                                <label htmlFor='email'>Email:</label>
                                <input type='text' id='email' name='email' placeholder='Email' required></input>
                                <label htmlFor='password'>Password:</label>
                                <input type='password' id='password' name='password' placeholder='Password' required></input>
                                <div id="remember-me-container">  
                                    <input type="checkbox" id="remember-me" name="remember-me"></input>
                                    <label htmlFor="remember-me">Remember me?</label>
                                </div>
                                <button id='login-button'>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
    );
};

export default LoginPage;