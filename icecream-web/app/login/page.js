"use client"

import './LoginPage.css';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';


function LoginPage() {
    const { register, formState: { errors } } = useForm({ criteriaMode: "all" });
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
      );

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
                            <form id='lg-login-form' 
                            action={formAction}                            
                            noValidate>
                                <label htmlFor='lg-email'>Email:</label>
                                <input
                                    id='lg-email'
                                    type='email'
                                    placeholder="someone@email.com"
                                    {...register("email", {
                                        required: "Email is required.",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email format."
                                        }
                                    })}
                                    autoComplete="email"
                                />
                                <ErrorMessage errors={errors} name="email" render={({ message }) => <p className="error">{message}</p>} />
                                


                                <label htmlFor='lg-password'>Password:</label>
                                    <input
                                        id='lg-password'
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
                                <div>{errorMessage}</div>
                            </form>
                        </div>
                    </div>
                </div>
    );
};

export default LoginPage;