const userReducer = (state = null, action) => {
    switch(action.type) {
        case 'USER_DETECTED':
            state = action;
            return state;
        default:
            return state;
    }
}

export default userReducer;