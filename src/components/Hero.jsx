import { Link } from 'react-router-dom';
import { Sparkles, PenTool } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-background"></div>
            <div className="container">
                <div className="hero-content">
                    <div className="hero-badge fade-in">
                        <Sparkles size={16} />
                        <span>Exploring the Final Frontier</span>
                    </div>
                    <h1 className="hero-title slide-in">
                        Journey Through the Cosmos
                    </h1>
                    <p className="hero-subtitle fade-in">
                        Discover the latest in space exploration, satellite launches, and astronomical discoveries.
                        Join our community of space enthusiasts and share your cosmic insights.
                    </p>
                    <div className="hero-actions fade-in">
                        <Link to="/create" className="btn btn-primary">
                            <PenTool size={20} />
                            Create Your Post
                        </Link>
                        <a href="#latest" className="btn btn-secondary">
                            Explore Articles
                        </a>
                    </div>
                </div>
            </div>
            <div className="hero-stars"></div>
        </section>
    );
};

export default Hero;
