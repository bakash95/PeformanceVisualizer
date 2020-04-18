const callAPI = async (url, httpMethod = "GET",  requestBody = undefined,headers = { 'Content-Type': 'application/json' }) => {

    let controller = new AbortController()

    let requestParams = {
        method: httpMethod,
        headers: headers,
        body: JSON.stringify(requestBody),
        signal: controller.signal
    }

    setTimeout(() => { controller.abort() }, 3000)

    let response;
    try {
        response = await fetch(basepathDEV+ url, requestParams);
    } catch (error) {
        throw error;
    }
    return await response.json();
}

export const basepathDEV = 'http://192.168.0.7:8080'

export default { callAPI };