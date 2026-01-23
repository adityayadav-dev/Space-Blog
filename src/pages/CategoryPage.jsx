import { useParams, Link } from 'react-router-dom';
import { useBlogStore } from '../hooks/useBlogStore';
import BlogCard from '../components/BlogCard';
import { ArrowLeft, Rocket, Satellite, Telescope, Cpu } from 'lucide-react';
import './CategoryPage.css';

const CategoryPage = () => {
    const { category } = useParams();
    const { getBlogsByCategory } = useBlogStore();

    const categoryMap = {
        'exploration': {
            name: 'Space Exploration',
            icon: Rocket,
            description: 'Discover the latest missions, rover updates, and human spaceflight achievements as we venture beyond Earth.'
        },
        'satellites': {
            name: 'Satellite Launches',
            icon: Satellite,
            description: 'Track satellite deployments, orbital missions, and the expanding network of space-based technology.'
        },
        'discoveries': {
            name: 'Astronomical Discoveries',
            icon: Telescope,
            description: 'Explore groundbreaking findings about distant galaxies, exoplanets, nebulae, and cosmic phenomena.'
        },
        'technology': {
            name: 'Space Technology',
            icon: Cpu,
            description: 'Learn about cutting-edge innovations, spacecraft designs, and technological breakthroughs in space exploration.'
        }
    };

    const currentCategory = categoryMap[category];
    if (!currentCategory) {
        return (
            <div className="container section">
                <div className="not-found">
                    <h2>Category not found</h2>
                    <Link to="/" className="btn btn-primary">
                        <ArrowLeft size={20} />
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const blogs = getBlogsByCategory(currentCategory.name);
    const Icon = currentCategory.icon;

    return (
        <div className="category-page">
            <div className="category-page-header">
                <div className="container">
                    <Link to="/" className="back-button">
                        <ArrowLeft size={20} />
                        <span>Back to Home</span>
                    </Link>
                </div>
            </div>

            <section className="category-hero">
                <div className="container">
                    <div className="category-hero-content">
                        <div className="category-icon-large">
                            <Icon size={64} />
                        </div>
                        <h1 className="category-hero-title">{currentCategory.name}</h1>
                        <p className="category-hero-description">{currentCategory.description}</p>
                        <div className="category-stats">
                            <span className="stat-item">{blogs.length} Articles</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {blogs.length > 0 ? (
                        <div className="grid grid-3">
                            {blogs.map(blog => (
                                <BlogCard key={blog.id} blog={blog} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-posts">
                            <Icon size={64} className="no-posts-icon" />
                            <h3>No posts yet in this category</h3>
                            <p>Be the first to share insights about {currentCategory.name.toLowerCase()}!</p>
                            <Link to="/create" className="btn btn-primary">Create Post</Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CategoryPage;
