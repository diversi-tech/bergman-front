
export const FillUsersData = (value) => {
    return {
        type: 'FILL_USERS_DATA', payload: value
    }
}

export const setMyUser = (user) => {
    return {
        type: 'SET_MY_USER',
        payload: user
    };

};
export const currentUser = (user) => ({
    type: 'CURRENT_USER',
    payload: user,
});