import Hero from '../components/Hero';
import BlogCard from '../components/BlogCard';
import { useBlogStore } from '../hooks/useBlogStore';
import { Rocket, Satellite, Telescope, Cpu, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const { blogs } = useBlogStore();

    const latestBlogs = blogs.slice(0, 6);

    const categories = [
        {
            id: 'exploration',
            name: 'Space Exploration',
            icon: Rocket,
            description: 'Missions, rovers, and human spaceflight',
            gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)'
        },
        {
            id: 'satellites',
            name: 'Satellite Launches',
            icon: Satellite,
            description: 'Orbital deployments and satellite networks',
            gradient: 'linear-gradient(135deg, #f97316, #ea580c)'
        },
        {
            id: 'discoveries',
            name: 'Astronomical Discoveries',
            icon: Telescope,
            description: 'Galaxies, exoplanets, and cosmic phenomena',
            gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
        },
        {
            id: 'technology',
            name: 'Space Technology',
            icon: Cpu,
            description: 'Innovations and technological breakthroughs',
            gradient: 'linear-gradient(135deg, #ec4899, #db2777)'
        }
    ];

    return (
        <div className="home">
            <Hero />

            {/* Latest Space News */}
            <section className="section" id="latest">
                <div className="container">
                    <div className="section-header">
                        <div className="category-icon-wrapper">
                            <Sparkles size={32} className="category-icon" />
                        </div>
                        <h2 className="section-title">Latest Space News</h2>
                        <p className="section-subtitle">
                            Stay updated with the most recent developments in space exploration and astronomy
                        </p>
                    </div>
                    <div className="grid grid-3">
                        {latestBlogs.map(blog => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Explore Categories */}
            <section className="section explore-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Explore by Category</h2>
                        <p className="section-subtitle">
                            Dive deeper into specific areas of space exploration
                        </p>
                    </div>
                    <div className="grid grid-2">
                        {categories.map(category => {
                            const Icon = category.icon;
                            return (
                                <Link
                                    key={category.id}
                                    to={`/category/${category.id}`}
                                    className="category-card glass-card"
                                >
                                    <div className="category-card-icon" style={{ background: category.gradient }}>
                                        <Icon size={40} />
                                    </div>
                                    <div className="category-card-content">
                                        <h3 className="category-card-title">{category.name}</h3>
                                        <p className="category-card-description">{category.description}</p>
                                    </div>
                                    <div className="category-card-arrow">
                                        <span>Explore</span>
                                        <ArrowRight size={20} className="arrow-icon" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
