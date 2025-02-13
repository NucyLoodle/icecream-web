"use client"

import './LoginPage.css';
import Link from 'next/link';
import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';


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
                            <Suspense>
                                <LoginForm />
                            </Suspense>
                        </div>
                    </div>
                </div>
    );
};

export default LoginPage;