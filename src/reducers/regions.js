const initialState = {
    reg: 'DAG'
}

export default function(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_REGION': 
            return {
                ...state,
                reg: action.payload
            }
        default: 
            return state;
    }
} 