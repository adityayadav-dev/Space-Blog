import Hero from '../components/Hero';
import BlogCard from '../components/BlogCard';
import CategorySection from '../components/CategorySection';
import { useBlogStore } from '../hooks/useBlogStore';
import { Rocket, Satellite, Telescope, Cpu, Sparkles, Loader } from 'lucide-react';
import './Home.css';

const Home = () => {
    const { blogs, loading, error } = useBlogStore();

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

    if (loading) {
        return (
            <div className="home">
                <Hero />
                <section className="section">
                    <div className="container">
                        <div className="loading-container">
                            <Loader size={48} className="loading-spinner" />
                            <p>Loading cosmic content...</p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    if (error) {
        return (
            <div className="home">
                <Hero />
                <section className="section">
                    <div className="container">
                        <div className="error-container">
                            <h2>Oops! Something went wrong</h2>
                            <p>{error}</p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

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
                    {latestBlogs.length > 0 ? (
                        <div className="grid grid-3">
                            {latestBlogs.map(blog => (
                                <BlogCard key={blog.id} blog={blog} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-posts">
                            <p>No posts yet. Be the first to share your cosmic insights!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Category Sections */}
            <section className="section category-sections">
                <div className="container">
                    {categories.map(category => (
                        <CategorySection
                            key={category.id}
                            category={category}
                            blogs={blogs}
                            icon={category.icon}
                            gradient={category.gradient}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;

