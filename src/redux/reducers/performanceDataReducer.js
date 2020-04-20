let listReducer = (state = {}, payload) => {
    switch (payload.type) {
        case "CHANGE_METRIC":
            state = {...state, ...payload.listConfigs }
            return state;
        default:
            return state;
    }
}

export default listReducer;