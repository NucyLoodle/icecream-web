import './Header.css'
import Image from 'next/image'
import Link from 'next/link';
import logo from '../../public/icecream_logo.png';

function Header() {
    return(
        <div id="header-component">
            <div id="logo-container">
                <Image src={logo} alt="strawberry and vanilla ice cream cone" />
                <h1>Ice Cream Tracker</h1>
            </div>
            <button id="get-started-btn">
                <Link
                    href="/login"
                    id="lp-get-started">
                    Let's get started!
                </Link>
            </button>
        </div>

    );
};

export default Header;