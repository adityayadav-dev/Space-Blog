import BlogCard from './BlogCard';
import './CategorySection.css';

const CategorySection = ({ title, icon: Icon, blogs, id }) => {
    if (!blogs || blogs.length === 0) return null;

    return (
        <section className="category-section section" id={id}>
            <div className="container">
                <div className="category-header">
                    <div className="category-icon-wrapper">
                        <Icon size={32} className="category-icon" />
                    </div>
                    <h2 className="section-title">{title}</h2>
                </div>
                <div className="grid grid-3">
                    {blogs.map(blog => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
