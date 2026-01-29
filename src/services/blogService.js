import {
    collection,
    getDocs,
    getDoc,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

export { db }; // Export db for validation

const BLOGS_COLLECTION = 'blogs';

// Get all blogs
export const getAllBlogs = async () => {
    try {
        const blogsQuery = query(
            collection(db, BLOGS_COLLECTION),
            orderBy('date', 'desc')
        );
        const querySnapshot = await getDocs(blogsQuery);
        const blogs = [];
        querySnapshot.forEach((doc) => {
            blogs.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return blogs;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
};

// Get blog by ID
export const getBlogById = async (id) => {
    try {
        const blogDoc = await getDoc(doc(db, BLOGS_COLLECTION, id));
        if (blogDoc.exists()) {
            return {
                id: blogDoc.id,
                ...blogDoc.data()
            };
        }
        return null;
    } catch (error) {
        console.error('Error fetching blog:', error);
        throw error;
    }
};

// Get blogs by category
export const getBlogsByCategory = async (category) => {
    try {
        const blogsQuery = query(
            collection(db, BLOGS_COLLECTION),
            where('category', '==', category),
            orderBy('date', 'desc')
        );
        const querySnapshot = await getDocs(blogsQuery);
        const blogs = [];
        querySnapshot.forEach((doc) => {
            blogs.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return blogs;
    } catch (error) {
        console.error('Error fetching blogs by category:', error);
        throw error;
    }
};

// Create new blog
export const createBlog = async (blogData) => {
    try {
        const newBlog = {
            ...blogData,
            date: new Date().toISOString().split('T')[0],
            comments: [],
            createdAt: serverTimestamp()
        };
        const docRef = await addDoc(collection(db, BLOGS_COLLECTION), newBlog);
        return {
            id: docRef.id,
            ...newBlog
        };
    } catch (error) {
        console.error('Error creating blog:', error);
        throw error;
    }
};

// Update blog
export const updateBlog = async (id, blogData) => {
    try {
        const blogRef = doc(db, BLOGS_COLLECTION, id);
        await updateDoc(blogRef, {
            ...blogData,
            updatedAt: serverTimestamp()
        });
        return { id, ...blogData };
    } catch (error) {
        console.error('Error updating blog:', error);
        throw error;
    }
};

// Delete blog
export const deleteBlog = async (id) => {
    try {
        await deleteDoc(doc(db, BLOGS_COLLECTION, id));
        return id;
    } catch (error) {
        console.error('Error deleting blog:', error);
        throw error;
    }
};

// Add comment to blog
export const addComment = async (blogId, commentData) => {
    try {
        const blogRef = doc(db, BLOGS_COLLECTION, blogId);
        const blogDoc = await getDoc(blogRef);

        if (blogDoc.exists()) {
            const blog = blogDoc.data();
            const newComment = {
                ...commentData,
                id: Date.now(),
                date: new Date().toISOString().split('T')[0]
            };

            const updatedComments = [...(blog.comments || []), newComment];
            await updateDoc(blogRef, {
                comments: updatedComments
            });

            return newComment;
        }
        throw new Error('Blog not found');
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
};

// Initialize database with sample data (call this once)
export const initializeSampleData = async (initialBlogs) => {
    try {
        const querySnapshot = await getDocs(collection(db, BLOGS_COLLECTION));

        // Only add sample data if database is empty
        if (querySnapshot.empty) {
            console.log('Initializing database with sample data...');
            for (const blog of initialBlogs) {
                const { id, ...blogData } = blog; // Remove the id field
                await addDoc(collection(db, BLOGS_COLLECTION), {
                    ...blogData,
                    createdAt: serverTimestamp()
                });
            }
            console.log('Sample data added successfully!');
        }
    } catch (error) {
        console.error('Error initializing sample data:', error);
        throw error;
    }
};
