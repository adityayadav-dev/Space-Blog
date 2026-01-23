import { useState, useEffect } from 'react';
import { initialBlogs } from '../data/blogData';

export const useBlogStore = () => {
    const [blogs, setBlogs] = useState(() => {
        const savedBlogs = localStorage.getItem('blogs');
        if (savedBlogs) {
            return JSON.parse(savedBlogs);
        }
        return initialBlogs;
    });

    useEffect(() => {
        localStorage.setItem('blogs', JSON.stringify(blogs));
    }, [blogs]);

    const getBlogById = (id) => {
        return blogs.find(blog => blog.id === parseInt(id));
    };

    const getBlogsByCategory = (category) => {
        return blogs.filter(blog => blog.category === category);
    };

    const createBlog = (blogData) => {
        const newBlog = {
            ...blogData,
            id: Math.max(...blogs.map(b => b.id), 0) + 1,
            date: new Date().toISOString().split('T')[0],
            comments: []
        };
        setBlogs([newBlog, ...blogs]);
        return newBlog;
    };

    const updateBlog = (id, blogData) => {
        setBlogs(blogs.map(blog =>
            blog.id === parseInt(id) ? { ...blog, ...blogData } : blog
        ));
    };

    const deleteBlog = (id) => {
        setBlogs(blogs.filter(blog => blog.id !== parseInt(id)));
    };

    const addComment = (blogId, commentData) => {
        const newComment = {
            ...commentData,
            id: Date.now(),
            date: new Date().toISOString().split('T')[0]
        };

        setBlogs(blogs.map(blog =>
            blog.id === parseInt(blogId)
                ? { ...blog, comments: [...blog.comments, newComment] }
                : blog
        ));
    };

    return {
        blogs,
        getBlogById,
        getBlogsByCategory,
        createBlog,
        updateBlog,
        deleteBlog,
        addComment
    };
};
