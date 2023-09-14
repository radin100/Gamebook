export const getUser = () => JSON.parse(sessionStorage.getItem('user'));

export const applyUser = (data) => sessionStorage.setItem('user', JSON.stringify(data));

export const dropUser = () => sessionStorage.removeItem('user');