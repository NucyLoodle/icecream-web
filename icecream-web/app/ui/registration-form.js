import { ErrorMessage } from "@hookform/error-message";
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useActionState } from 'react';

export function RegisterForm() {
    const { register, watch, handleSubmit, formState: { errors } } = useForm({ criteriaMode: "all" });
    const onSubmit = (data) => console.log(data);
    
    return (
        <form id='rg-registration-form' onSubmit={handleSubmit(onSubmit)}  noValidate>
                        {/* Email */}
                        <label htmlFor='rg-email'>Email:</label>
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
                            autoComplete="email"
                        />
                        <ErrorMessage errors={errors} name="email" render={({ message }) => <p className="rg-email-error">{message}</p>} />

                        {/* Password */}
                        <label htmlFor='rg-password'>Password:</label>
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
                        <ErrorMessage errors={errors} name="password" render={({ message }) => <p className="rg-password-error">{message}</p>} />

                        {/* Confirm Password */}
                        <label htmlFor='rg-confirm-password'>Confirm Password:</label>
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
                        <ErrorMessage errors={errors} name="confirmPassword" render={({ message }) => <p className="rg-confirm-password-error">{message}</p>} />

                        <button id='rg-submit-register-button' type="submit" data-testid="submit-button">Register</button>
                    </form>
    )
}
