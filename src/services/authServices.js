// src/services/authService.js

export const registerUser = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find((user) => user.email === userData.email);
      
      if (existingUser) {
        reject('User already exists');
        return;
      }

      const newUser = { ...userData };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify({ email: userData.email }));
      
      resolve(newUser);
    } catch (error) {
      reject('Registration failed');
    }
  });
};

export const loginUser = (credentials) => {
  return new Promise((resolve, reject) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );

      if (!user) {
        reject('Invalid credentials');
        return;
      }

      localStorage.setItem('currentUser', JSON.stringify({ email: user.email }));
      resolve(user);
    } catch (error) {
      reject('Login failed');
    }
  });
};

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    return null;
  }
};
