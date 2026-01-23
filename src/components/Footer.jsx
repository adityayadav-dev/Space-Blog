import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-gradient"></div>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="footer-title">Cosmic Explorer</h3>
                        <p className="footer-description">
                            Your gateway to the wonders of space exploration, satellite technology,
                            and astronomical discoveries. Join us on this cosmic journey.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="#exploration">Space Exploration</a></li>
                            <li><a href="#satellites">Satellite Launches</a></li>
                            <li><a href="#discoveries">Discoveries</a></li>
                            <li><a href="#technology">Technology</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Connect With Us</h4>
                        <div className="footer-social">
                            <a href="#" className="social-link" aria-label="Twitter">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="social-link" aria-label="GitHub">
                                <Github size={20} />
                            </a>
                            <a href="#" className="social-link" aria-label="LinkedIn">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="social-link" aria-label="Email">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        Made with <Heart size={16} className="heart-icon" /> for space enthusiasts worldwide
                    </p>
                    <p className="footer-year">© 2026 Cosmic Explorer. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
