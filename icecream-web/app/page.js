import Image from "next/image";
import  "./page.css";
import Link from 'next/link';
import truck from '../public/icecream_truck.png';


function LandingPage() {
    return(
                <div id="landing-page-component">
                    <div id="lp-content-container">
                        <h1 id="lp-question-header"> 
                            Where's My Icecream?
                        </h1>
                        <div id="lp-main-content">
                            <div id="lp-image-container">
                                 <Image src={truck} alt="vintage ice cream truck graphic" />
                            </div>
                            <div id="lp-text-content">
                                <p>We’ve all been there—you hear that unmistakable jingle, rush outside, only to find… nothing. No ice cream van in sight. Was it real? A cruel trick of the wind? Or did it just turn the corner too fast?</p>
                                <p>Our real-time locator helps you find the nearest van, and if none are nearby, you can even request a visit. </p>
                                <p>Ready to make your ice cream dreams a reality? </p>

                                <Link
                                  href="/login"
                                  id="lp-get-started-text">
                                    Let's get started!
                                </Link>
                                


                            </div>
                        </div>
                    </div>
                </div>
    );
};

export default LandingPage;