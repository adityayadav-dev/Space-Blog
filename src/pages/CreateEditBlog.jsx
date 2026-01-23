import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBlogStore } from '../hooks/useBlogStore';
import { ArrowLeft, Save, X } from 'lucide-react';
import './CreateEditBlog.css';

const CreateEditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getBlogById, createBlog, updateBlog } = useBlogStore();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        title: '',
        category: 'Space Exploration',
        excerpt: '',
        content: '',
        image: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEditMode) {
            const blog = getBlogById(id);
            if (blog) {
                setFormData({
                    title: blog.title,
                    category: blog.category,
                    excerpt: blog.excerpt,
                    content: blog.content,
                    image: blog.image
                });
            }
        }
    }, [id, isEditMode, getBlogById]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
        if (!formData.content.trim()) newErrors.content = 'Content is required';
        if (!formData.image.trim()) newErrors.image = 'Image URL is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (isEditMode) {
            updateBlog(id, formData);
        } else {
            createBlog(formData);
        }

        navigate('/');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="create-edit-blog">
            <div className="create-edit-header">
                <div className="container">
                    <Link to="/" className="back-button">
                        <ArrowLeft size={20} />
                        <span>Cancel</span>
                    </Link>
                </div>
            </div>

            <div className="container">
                <div className="create-edit-content">
                    <h1 className="page-title">
                        {isEditMode ? 'Edit Your Post' : 'Create New Post'}
                    </h1>
                    <p className="page-subtitle">
                        {isEditMode
                            ? 'Update your cosmic insights and share them with the community'
                            : 'Share your cosmic insights with the world'}
                    </p>

                    <form className="blog-form glass-card" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="title">
                                Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className={`form-input ${errors.title ? 'error' : ''}`}
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter an engaging title..."
                            />
                            {errors.title && <span className="error-message">{errors.title}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="category">
                                Category *
                            </label>
                            <select
                                id="category"
                                name="category"
                                className="form-select"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="Space Exploration">Space Exploration</option>
                                <option value="Satellite Launches">Satellite Launches</option>
                                <option value="Astronomical Discoveries">Astronomical Discoveries</option>
                                <option value="Space Technology">Space Technology</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="excerpt">
                                Excerpt *
                            </label>
                            <textarea
                                id="excerpt"
                                name="excerpt"
                                className={`form-textarea ${errors.excerpt ? 'error' : ''}`}
                                value={formData.excerpt}
                                onChange={handleChange}
                                placeholder="Write a brief summary (2-3 sentences)..."
                                rows="3"
                            />
                            {errors.excerpt && <span className="error-message">{errors.excerpt}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="image">
                                Image URL *
                            </label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                className={`form-input ${errors.image ? 'error' : ''}`}
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="/images/your-image.png"
                            />
                            {errors.image && <span className="error-message">{errors.image}</span>}
                            <small className="form-hint">
                                Use images from /images/ folder or provide a full URL
                            </small>
                        </div>

                        {formData.image && (
                            <div className="image-preview">
                                <img src={formData.image} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label" htmlFor="content">
                                Content *
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                className={`form-textarea content-textarea ${errors.content ? 'error' : ''}`}
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Write your full article here... Use double line breaks to separate paragraphs."
                                rows="15"
                            />
                            {errors.content && <span className="error-message">{errors.content}</span>}
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">
                                <Save size={20} />
                                {isEditMode ? 'Update Post' : 'Publish Post'}
                            </button>
                            <Link to="/" className="btn btn-secondary">
                                <X size={20} />
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEditBlog;
