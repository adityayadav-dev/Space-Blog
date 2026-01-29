import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';
import { ArrowRight } from 'lucide-react';
import './CategorySection.css';

const CategorySection = ({ category, blogs, icon: Icon, gradient }) => {
    const categoryBlogs = blogs.filter(blog => blog.category === category.name).slice(0, 3);

    if (categoryBlogs.length === 0) {
        return null; // Don't show empty categories
    }

    return (
        <section className="category-section">
            <div className="category-section-header">
                <div className="category-section-title-wrapper">
                    <div className="category-section-icon" style={{ background: gradient }}>
                        <Icon size={28} />
                    </div>
                    <h2 className="category-section-title">{category.name}</h2>
                </div>
                <Link to={`/category/${category.id}`} className="view-all-link">
                    <span>View All</span>
                    <ArrowRight size={18} className="arrow-icon" />
                </Link>
            </div>
            <div className="grid grid-3">
                {categoryBlogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
        </section>
    );
};

export default CategorySection;
