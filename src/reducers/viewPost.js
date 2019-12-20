const initialState = {
    post: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_ID':
            return {
                ...state,
                post: action.payload
            };
        default:
            return state;
    }

}