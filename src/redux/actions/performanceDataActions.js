const performanceDataAction = (listConfigs) => {
    return { type: "CHANGE_METRIC", listConfigs };
}

export { performanceDataAction};