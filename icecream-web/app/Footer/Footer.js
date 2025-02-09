import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

function Footer() {
    return(
        <div id="footer-component">
            <div id="business-name">
                Meredith Designs
            </div>
            <div id="contact-me">
                <a href="mailto:someone@example.com"><FontAwesomeIcon icon={faEnvelope} style={{color: "#3e1755",}} /></a>
                <a href="https://github.com/NucyLoodle/icecream-tracker"><FontAwesomeIcon icon={faGithub} style={{color: "#3e1755",}} /></a>
            </div>
        </div>

    );
};

export default Footer;