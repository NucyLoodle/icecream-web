'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useActionState, useTransition } from "react";
import { useForm } from 'react-hook-form';
import { signUpFormSchema } from "@/app/lib/definitions";

export function RegisterForm({action}) {

    const [actionState, submitAction, isPending] = useActionState(action, {});
    const [, startTransition] = useTransition();


    const InputError = ({ error }) => {
        if (!error) return null;
      
        const errorMessage = Array.isArray(error) ? error[0] : error;
      
        return <p className="rg-error-message">{errorMessage}</p>;
      };

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(signUpFormSchema),
        mode: 'onChange',
        defaultValues: actionState.formData,
      });
    

    return (
        <form id='rg-registration-form' action={submitAction} onSubmit={handleSubmit((_, e) => {
            startTransition(() => {
              const formData = new FormData(e?.target);
              submitAction(formData);
            });
          })} noValidate>
                        {/* Email */}
                        <label htmlFor='rg-email'>Email:</label>
                        <input
                            id='rg-email'
                            type='email'
                            placeholder="someone@email.com"
                            defaultValue={actionState.formData?.email}
                            {...register("email")}
                            autoComplete="email"
                        />
                        <div className="rg-email-error">
                          <InputError error={errors.email?.message} />
                          <InputError error={actionState.fieldErrors?.email} />
                        </div>

                        {/* Password */}
                        <label htmlFor='rg-password'>Password:</label>
                        <input
                            id='rg-password'
                            type='password'
                            placeholder='Password'
                            defaultValue={actionState.formData?.password}
                            {...register("password")}
                        />
                        <div className="rg-password-error">
                            <InputError error={errors.password?.message} />
                            <InputError error={actionState.fieldErrors?.password} />
                        </div>
                        {/* Confirm Password */}
                        <label htmlFor='rg-confirm-password'>Confirm Password:</label>
                        <input
                            id='rg-confirm-password'
                            type='password'
                            placeholder='Password'
                            defaultValue={actionState.formData?.confirmPassword}
                            {...register("confirmPassword", )}
                        />
                        <div className="rg-confirm-password-error">
                            <InputError error={errors.confirmPassword?.message} />
                            <InputError error={actionState.fieldErrors?.confirmPassword} />
                        </div>
                        
                        {actionState.error && (
                        <p className="rg-error-message">{actionState.error}</p>
                        )}
                        

                        <button id='rg-submit-register-button' type="submit" data-testid="submit-button" disabled={isPending}>Register</button>
                        {/* {errorMessage && <p className="rg-submit-register-form">{errorMessage}</p>} */}
                    </form>
    )
}
