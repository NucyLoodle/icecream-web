import './LoginPage.css';
import Link from 'next/link';

function LoginPage() {
    return(
                <div id='lg-login-page-component'>
                    <div id='lg-login-content-container'>
                        <div id='lg-login-register-button-container'>
                            <button id='lg-login-button'>Login</button>
                            <button id='lg-register-button'>
                                <Link href='/registration'>
                                    Register
                                </Link>
                            </button>
                        </div>
                        <div id='lg-login-form-container'>
                            <form id='lg-login-form'>
                                <label htmlFor='lg-email'>Email:</label>
                                <input type='text' id='lg-email' name='email' placeholder='Email' required autoComplete='email'></input>
                                <label htmlFor='lg-password'>Password:</label>
                                <input type='lg-password' id='lg-password' name='password' placeholder='Password' required></input>
                                <div id="lg-remember-me-container">  
                                    <input type="checkbox" id="lg-remember-me" name="remember-me"></input>
                                    <label htmlFor="lg-remember-me">Remember me?</label>
                                </div>
                                <button id='lg-submit-login-button'>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
    );
};

export default LoginPage;