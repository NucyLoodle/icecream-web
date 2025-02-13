"use client"

import './LoginPage.css';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import LoginForm from '@/app/ui/login-form';
import { Suspense, useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

function LoginPage() {
    const { register, formState: { errors } } = useForm({ criteriaMode: "all" });
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
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
                            <Suspense>
                                <LoginForm />
                            </Suspense>
                        </div>
                    </div>
                </div>
    );
};

export default LoginPage;