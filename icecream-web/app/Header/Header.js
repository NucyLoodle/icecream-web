import './Header.css'
import Image from 'next/image'
import Link from 'next/link';
import logo from '../../public/icecream_logo.png';
import { getSession } from "../lib/getSession";
import { signOut } from '@/auth';
import { deleteSession } from '../lib/session';

export default async function Header() {
    const session = await getSession();
    console.log(session);
    const isLoggedIn = !!session;

    return(
        <div id="header-component">
            <div id="logo-container">
                <Image src={logo} alt="strawberry and vanilla ice cream cone" />
                <h1>Ice Cream Tracker</h1>
            </div>
            {isLoggedIn ? (
                <form
                action={async () => {
                  'use server';
                  await deleteSession();
                  await signOut({ redirectTo: '/' });       
                }}
              >
                <button>
                  
                    Sign Out
                </button>
              </form>
            ) : (
                <button id="get-started-btn">
                <Link
                    href="/login"
                    id="lp-get-started">
                    Let's get started!
                </Link>
            </button>
            )}
        </div>

    );
};

