"use client"
import './RegistrationPage.css';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";

function RegistrationPage() {
    const { register, watch, handleSubmit, formState: { errors } } = useForm({ criteriaMode: "all" });
    const onSubmit = (data) => console.log(data);

    return (
        <div id='rg-registration-page-component'>
            <div id='rg-registration-content-container'>
                <div id='rg-login-register-button-container'>
                    <button id='rg-login-button'>
                        <Link href={'/login'}>Login</Link>
                    </button>
                    <button id='rg-register-button'>Register</button>
                </div>
                <div id='rg-registration-form-container'>
                    <form id='rg-registration-form' onSubmit={handleSubmit(onSubmit)}  noValidate>
                        {/* Email */}
                        <label>Email:</label>
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

                        {/* Password */}
                        <label>Password:</label>
                        <input
                            id='rg-password'
                            type='password'
                            placeholder='Password'
                            {...register("password", {
                                required: "Password is required.",
                                minLength: { value: 8, message: "Password must be at least 8 characters." },
                                maxLength: { value: 20, message: "Password must not exceed 20 characters." }
                            })}
                        />
                        <ErrorMessage errors={errors} name="password" render={({ message }) => <p className="error">{message}</p>} />

                        {/* Confirm Password */}
                        <label>Confirm Password:</label>
                        <input
                            id='rg-confirm-password'
                            type='password'
                            placeholder='Password'
                            {...register("confirmPassword", {
                                required: true,
                                validate: (val) => {
                                    if (watch('password') != val) {
                                      return "Your passwords do not match.";
                                    }
                                  },
                                
                            })}
                        />
                        <ErrorMessage errors={errors} name="confirmPassword" render={({ message }) => <p className="error">{message}</p>} />

                        <input id='rg-submit-register-button' type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
