import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBlogStore } from '../hooks/useBlogStore';
import { Calendar, ArrowLeft, Edit, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';
import './BlogDetail.css';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getBlogById, addComment } = useBlogStore();
    const blog = getBlogById(id);

    const [commentForm, setCommentForm] = useState({
        author: '',
        content: ''
    });

    if (!blog) {
        return (
            <div className="container section">
                <div className="not-found">
                    <h2>Blog post not found</h2>
                    <Link to="/" className="btn btn-primary">
                        <ArrowLeft size={20} />
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const getCategoryClass = (category) => {
        const categoryMap = {
            'Space Exploration': 'badge-exploration',
            'Satellite Launches': 'badge-satellite',
            'Astronomical Discoveries': 'badge-astronomy',
            'Space Technology': 'badge-technology'
        };
        return categoryMap[category] || 'badge-exploration';
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentForm.author.trim() && commentForm.content.trim()) {
            addComment(id, commentForm);
            setCommentForm({ author: '', content: '' });
        }
    };

    return (
        <div className="blog-detail">
            <div className="blog-detail-header">
                <div className="container">
                    <Link to="/" className="back-button">
                        <ArrowLeft size={20} />
                        <span>Back to Articles</span>
                    </Link>
                </div>
            </div>

            <article className="container">
                <div className="blog-detail-content">
                    <div className="blog-detail-meta">
                        <span className={`badge ${getCategoryClass(blog.category)}`}>
                            {blog.category}
                        </span>
                        <div className="blog-detail-date">
                            <Calendar size={16} />
                            <span>{new Date(blog.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                        </div>
                    </div>

                    <h1 className="blog-detail-title">{blog.title}</h1>

                    <div className="blog-detail-actions">
                        <Link to={`/edit/${blog.id}`} className="btn btn-secondary">
                            <Edit size={20} />
                            Edit Post
                        </Link>
                    </div>

                    <div className="blog-detail-image">
                        <img src={blog.image} alt={blog.title} />
                    </div>

                    <div className="blog-detail-body">
                        {blog.content.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                    {/* Comments Section */}
                    <div className="comments-section">
                        <h2 className="comments-title">
                            <MessageCircle size={24} />
                            Discussion ({blog.comments?.length || 0})
                        </h2>

                        {/* Comment Form */}
                        <form className="comment-form glass-card" onSubmit={handleCommentSubmit}>
                            <h3>Join the Conversation</h3>
                            <div className="form-group">
                                <label className="form-label" htmlFor="author">Your Name</label>
                                <input
                                    type="text"
                                    id="author"
                                    className="form-input"
                                    value={commentForm.author}
                                    onChange={(e) => setCommentForm({ ...commentForm, author: e.target.value })}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="comment">Your Comment</label>
                                <textarea
                                    id="comment"
                                    className="form-textarea"
                                    value={commentForm.content}
                                    onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                                    placeholder="Share your thoughts..."
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                <Send size={20} />
                                Post Comment
                            </button>
                        </form>

                        {/* Comments List */}
                        <div className="comments-list">
                            {blog.comments && blog.comments.length > 0 ? (
                                blog.comments.map(comment => (
                                    <div key={comment.id} className="comment glass-card">
                                        <div className="comment-header">
                                            <div className="comment-avatar">
                                                {comment.author.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="comment-info">
                                                <h4 className="comment-author">{comment.author}</h4>
                                                <span className="comment-date">
                                                    {new Date(comment.date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="comment-content">{comment.content}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="no-comments">
                                    <MessageCircle size={48} />
                                    <p>No comments yet. Be the first to share your thoughts!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default BlogDetail;
