"use client"
import './RegistrationPage.css';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { RegisterForm } from '@/app/ui/registration-form';
import { ErrorMessage } from "@hookform/error-message";

export default function RegistrationPage() {


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
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
};

