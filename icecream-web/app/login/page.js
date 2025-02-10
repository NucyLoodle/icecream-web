"use client"

import './LoginPage.css';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm({ criteriaMode: "all" });
    const onSubmit = (data) => console.log(data);

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
                            <form id='lg-login-form' onSubmit={handleSubmit(onSubmit)} noValidate>
                                <label htmlFor='lg-email'>Email:</label>
                                <input
                                    id='rg-email'
                                    type='email'
                                    placeholder="someone@email.com"
                                    {...register("email", {
                                        required: "Email is required.",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email format."
                                        }
                                    })}
                                />
                                <ErrorMessage errors={errors} name="email" render={({ message }) => <p className="error">{message}</p>} />
                                


                                <label htmlFor='lg-password'>Password:</label>
                                    <input
                                        id='rg-password'
                                        type='password'
                                        placeholder='Password'
                                        {...register("password", {
                                            required: "Password is required.",
                                        })}
                                />
                                <ErrorMessage errors={errors} name="password" render={({ message }) => <p className="error">{message}</p>} />
                                
                                
                                
                                <div id="lg-remember-me-container">  
                                    <input type="checkbox" id="lg-remember-me" name="remember-me"></input>
                                    <label htmlFor="lg-remember-me">Remember me?</label>
                                </div>

                                <button id='lg-submit-login-button' type="submit">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
    );
};

export default LoginPage;