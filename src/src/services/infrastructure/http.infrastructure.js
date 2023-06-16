// Constants
const { domainApiTransactionalQueries } = require("../../constants/core/core-configurations.const");
const { errorsConst } = require("../../constants/index.constants");

// Infrastructure
const { callExternalApi } = require("./external-api.infrastructure");

/**
 * GET type function
 * @date 2023-06-16
 * 
 * @param {string} url - It is  the string endPoint to the API endpoint.
 * @param {any} body - It is  the data that is part of the API request.
 * @param {string} token - It is the value of the access key for authentication in the API. 
 * 
 * @returns {Promise} - Return a Promise that you will receive the API response.
 */
async function get(url, body, token) {
    return commonConfigurationVerbHttp('GET', url, body, token)
}

/**
 * POST type function
 * @date 2023-06-16
 * 
 * @param {string} url - It is  the string endPoint to the API endpoint.
 * @param {any} body - It is  the data that is part of the API request.
 * @param {string} token - It is the value of the access key for authentication in the API. 
 * @param {boolean} [isContainFiles = false] - Flag that allows to determine the process flow of the POST request to form a configuration for sending files to the API.
 * 
 * @returns {Promise} - Return a Promise that you will receive the API response.
 */
async function post(url, body, token, isContainFiles = false) {
    if (isContainFiles) {

        let bodyFormData = new FormData();
        const bodyValues = Object.entries(body)

        bodyValues.forEach(propertyElement => {
            const [key, value] = propertyElement
            bodyFormData.append(key, value)
        })

        return commonConfigurationVerbHttp('POST', url, bodyFormData, token, isContainFiles)
    } else {
        return commonConfigurationVerbHttp('POST', url, body, token)
    }
}

/**
 * PUT type function
 * @date 2023-06-16
 * 
 * @param {string} url - It is  the string endPoint to the API endpoint.
 * @param {any} body - It is  the data that is part of the API request.
 * @param {string} token - It is the value of the access key for authentication in the API. 
 * 
 * @returns {Promise} - Return a Promise that you will receive the API response.
 */
async function put(url, body, token) {
    return commonConfigurationVerbHttp('PUT', url, body, token)
}

/**
 * DELETE type function
 * @date 2023-06-16
 * 
 * @param {string} url - It is  the string endPoint to the API endpoint.
 * @param {any} body - It is  the data that is part of the API request.
 * @param {string} token - It is the value of the access key for authentication in the API. 
 * 
 * @returns {Promise} - Return a Promise that you will receive the API response.
 */
async function deleteRequest(url, body, token) {
    return commonConfigurationVerbHttp('DELETE', url, body, token)
}

/**
 * PATCH type function
 * @date 2023-06-16
 * 
 * @param {string} url - It is  the string endPoint to the API endpoint.
 * @param {any} body - It is  the data that is part of the API request.
 * @param {string} token - It is the value of the access key for authentication in the API. 
 * 
 * @returns {Promise} - Return a Promise that you will receive the API response.
 */
async function patch(url, body, token) {
    return commonConfigurationVerbHttp('PATCH', url, body, token)
}

async function commonConfigurationVerbHttp(verbHttp, url, body, token, isContainFiles = false) {

    let config = {
        headers: {
            "content-type": isContainFiles ? "multipart/form-data" : "application/json",
        },
        method: verbHttp
    };

    if (token) {
        /* Option One - Header Back-end */
        config.headers = {
            ...config.headers,
            "x-token": token,
        };
        /* Option Two - Header Back-end 
          config.headers.Authorization = `Bearer ${token}`
      */
    }

    if (body) {
        switch (verbHttp) {
            case "POST":
            case "DELETE":
            case "PUT":
            case "PATCH":
                config.data = body;
                break;
            default:
                if (typeof body !== "object" || (Object.keys(body).length === 0 && body.constructor === Object)) {
                    return {
                        data: null,
                        error: errorsConst.appErrors.servicesErrors.requestBodyToSendIsInvalid
                    };
                } else {
                    url += `?${new URLSearchParams(body).toString()}`;
                }
                break;
        }
    }

    config.url = `${domainApiTransactionalQueries}${url}`

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error: error
    };
}

module.exports = {
    get,
    post,
    put,
    delete: deleteRequest,
    patch
}