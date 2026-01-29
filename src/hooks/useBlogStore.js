import { useState, useEffect } from 'react';
import { initialBlogs } from '../data/blogData';
import * as blogService from '../services/blogService';

export const useBlogStore = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load blogs from Firebase on mount
    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        try {
            setLoading(true);
            setError(null);

            // Check if Firebase is configured
            if (!blogService.db) {
                console.warn('Firebase not configured, using localStorage fallback');
                const savedBlogs = localStorage.getItem('blogs');
                if (savedBlogs) {
                    setBlogs(JSON.parse(savedBlogs));
                } else {
                    setBlogs(initialBlogs);
                    localStorage.setItem('blogs', JSON.stringify(initialBlogs));
                }
                setLoading(false);
                return;
            }

            const fetchedBlogs = await blogService.getAllBlogs();

            // If no blogs exist, initialize with sample data
            if (fetchedBlogs.length === 0) {
                console.log('No blogs found, initializing with sample data...');
                await blogService.initializeSampleData(initialBlogs);
                const newBlogs = await blogService.getAllBlogs();
                setBlogs(newBlogs);
            } else {
                setBlogs(fetchedBlogs);
            }
        } catch (err) {
            console.error('Error loading blogs:', err);
            setError(err.message);

            // Fallback to localStorage or initial blogs
            console.warn('Falling back to localStorage');
            const savedBlogs = localStorage.getItem('blogs');
            if (savedBlogs) {
                setBlogs(JSON.parse(savedBlogs));
            } else {
                setBlogs(initialBlogs);
                localStorage.setItem('blogs', JSON.stringify(initialBlogs));
            }
        } finally {
            setLoading(false);
        }
    };

    const getBlogById = (id) => {
        return blogs.find(blog => blog.id === id);
    };

    const getBlogsByCategory = (category) => {
        return blogs.filter(blog => blog.category === category);
    };

    const createBlog = async (blogData) => {
        try {
            setLoading(true);
            const newBlog = await blogService.createBlog(blogData);
            setBlogs([newBlog, ...blogs]);
            return newBlog;
        } catch (err) {
            console.error('Error creating blog:', err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateBlog = async (id, blogData) => {
        try {
            setLoading(true);
            await blogService.updateBlog(id, blogData);
            setBlogs(blogs.map(blog =>
                blog.id === id ? { ...blog, ...blogData } : blog
            ));
        } catch (err) {
            console.error('Error updating blog:', err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteBlog = async (id) => {
        try {
            setLoading(true);
            await blogService.deleteBlog(id);
            setBlogs(blogs.filter(blog => blog.id !== id));
        } catch (err) {
            console.error('Error deleting blog:', err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const addComment = async (blogId, commentData) => {
        try {
            const newComment = await blogService.addComment(blogId, commentData);
            setBlogs(blogs.map(blog =>
                blog.id === blogId
                    ? { ...blog, comments: [...(blog.comments || []), newComment] }
                    : blog
            ));
            return newComment;
        } catch (err) {
            console.error('Error adding comment:', err);
            setError(err.message);
            throw err;
        }
    };

    return {
        blogs,
        loading,
        error,
        getBlogById,
        getBlogsByCategory,
        createBlog,
        updateBlog,
        deleteBlog,
        addComment,
        refreshBlogs: loadBlogs
    };
};
