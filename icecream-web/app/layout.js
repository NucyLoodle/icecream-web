import { Poppins, Alfa_Slab_One } from "next/font/google";
import "./globals.css";
import Header from './Header/Header';
import Footer from './Footer/Footer';


import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const poppins = Poppins({
  weight: '400',
  subsets: ["latin"],
});

const alfaSlabOne = Alfa_Slab_One({
  weight: '400',
  subsets: ["latin"],
});


export default function Layout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>          
          <main className="content-container">  
            <Header />
            <div className="children-container">
              {children}
            </div>
            <Footer />
          </main>
      </body>
    </html>
   
  );
}

