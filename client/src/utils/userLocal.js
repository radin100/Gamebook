export const getUserLocally = () => JSON.parse(localStorage.getItem('user'));

export const applyUserLocally = (data) => localStorage.setItem('user', JSON.stringify(data));

export const dropUserLocally = () => localStorage.removeItem('user');