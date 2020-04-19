const callAPI = async (url, httpMethod = "GET",  requestBody = undefined,headers = { 'Content-Type': 'application/json' }) => {

    let controller = new AbortController()

    let requestParams = {
        method: httpMethod,
        headers: headers,
        body: JSON.stringify(requestBody),
        signal: controller.signal
    }

    //time out for fetch call is 15s
    setTimeout(() => { controller.abort() }, 15000)

    let response;
    try {
        response = await fetch(basepathDEV+ url, requestParams);
    } catch (error) {
        throw error;
    }
    return await response.json();
}

export const basepathDEV = process.env.NODE_ENV === 'production' ? 'https://performancevisbe.herokuapp.com' : 'http://localhost:3003'

export default { callAPI };