import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import './BlogCard.css';

const BlogCard = ({ blog }) => {
    const getCategoryClass = (category) => {
        const categoryMap = {
            'Space Exploration': 'badge-exploration',
            'Satellite Launches': 'badge-satellite',
            'Astronomical Discoveries': 'badge-astronomy',
            'Space Technology': 'badge-technology'
        };
        return categoryMap[category] || 'badge-exploration';
    };

    return (
        <Link to={`/blog/${blog.id}`} className="blog-card glass-card">
            <div className="blog-card-image">
                <img src={blog.image} alt={blog.title} loading="lazy" />
                <div className="blog-card-overlay">
                    <span className={`badge ${getCategoryClass(blog.category)}`}>
                        {blog.category}
                    </span>
                </div>
            </div>
            <div className="blog-card-content">
                <h3 className="blog-card-title">{blog.title}</h3>
                <p className="blog-card-excerpt">{blog.excerpt}</p>
                <div className="blog-card-footer">
                    <div className="blog-card-date">
                        <Calendar size={16} />
                        <span>{new Date(blog.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                    </div>
                    <div className="blog-card-read-more">
                        <span>Read More</span>
                        <ArrowRight size={16} className="arrow-icon" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
