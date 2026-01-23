import { Link } from 'react-router-dom';
import { Moon, Sun, Menu, X, Rocket } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="navbar-logo">
                        <Rocket className="logo-icon" />
                        <span className="logo-text">Cosmic Explorer</span>
                    </Link>

                    <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link to="/create" onClick={() => setIsMenuOpen(false)}>Create Post</Link>
                        <Link to="/category/exploration" onClick={() => setIsMenuOpen(false)}>Exploration</Link>
                        <Link to="/category/satellites" onClick={() => setIsMenuOpen(false)}>Satellites</Link>
                        <Link to="/category/discoveries" onClick={() => setIsMenuOpen(false)}>Discoveries</Link>
                        <Link to="/category/technology" onClick={() => setIsMenuOpen(false)}>Technology</Link>
                    </div>

                    <div className="navbar-actions">
                        <button
                            className="btn-icon theme-toggle"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <button
                            className="btn-icon mobile-menu-toggle"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
