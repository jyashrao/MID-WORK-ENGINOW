// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Manual Login
 */
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    return await response.json();
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

/**
 * Manual Register
 */
export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    return await response.json();
  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
};

/**
 * Login with Google
 */
export const googleLogin = async (idToken) => {
  try {
    const response = await fetch(`${API_URL}/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });
    if (!response.ok) {
      throw new Error('Google Login failed');
    }
    return await response.json();
  } catch (error) {
    console.error("Google Login Error:", error);
    throw error;
  }
};

/**
 * Fetch all courses from the backend
 */
export const fetchCourses = async (options = {}) => {
  try {
    const { sort = 'latest', limit = '' } = options;
    const response = await fetch(`${API_URL}/courses?sort=${sort}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

/**
 * Add a new course (Admin only)
 */
export const addCourse = async (courseData, token) => {
  try {
    const response = await fetch(`${API_URL}/courses`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(courseData),
    });
    if (!response.ok) throw new Error('Failed to add course');
    return await response.json();
  } catch (error) {
    console.error("Add Course Error:", error);
    throw error;
  }
};

/**
 * Fetch all internships from the backend
 */
export const fetchInternships = async () => {
  try {
    const response = await fetch(`${API_URL}/internships`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching internships:", error);
    throw error;
  }
};

/**
 * Fetch offers for the logged-in student
 */
export const fetchMyOffers = async (token) => {
  try {
    const response = await fetch(`${API_URL}/offers/my-offers`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch offers');
    return await response.json();
  } catch (error) {
    console.error("Offers API Error:", error);
    throw error;
  }
};

/**
 * Fetch certificates for the logged-in student
 */
export const fetchMyCertificates = async (token) => {
  try {
    const response = await fetch(`${API_URL}/certificates/my-certificates`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch certificates');
    return await response.json();
  } catch (error) {
    console.error("Certificates API Error:", error);
    throw error;
  }
};

/**
 * Fetch the current user profile (including progress)
 */
export const fetchUserProfile = async (token) => {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch profile');
    return await response.json();
  } catch (error) {
    console.error("Profile API Error:", error);
    throw error;
  }
};

/**
 * Create a new support ticket
 */
export const createTicket = async (ticketData, token) => {
  try {
    const response = await fetch(`${API_URL}/tickets`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(ticketData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors ? error.errors[0].msg : 'Failed to create ticket');
    }
    return await response.json();
  } catch (error) {
    console.error("Ticket Creation Error:", error);
    throw error;
  }
};

/**
 * Fetch all tickets for the current user
 */
export const fetchUserTickets = async (token) => {
  try {
    const response = await fetch(`${API_URL}/tickets`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch tickets');
    const data = await response.json();
    return data.data; // The API returns { success, data: [...] }
  } catch (error) {
    console.error("Fetch Tickets Error:", error);
    throw error;
  }
};