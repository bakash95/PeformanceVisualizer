let listReducer = (state = {}, payload) => {
    switch (payload.type) {
        case "CHANGE":
            state = {...state, ...payload.listConfigs }
            return state;
        default:
            return state;
    }
}

export default listReducer;