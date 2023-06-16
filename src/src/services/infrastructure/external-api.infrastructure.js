// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const axios = require('axios');

module.exports = {
  callExternalApi: async (options) => {
    try {
      const response = await axios(options.config);
      if (!response.status) {

        return {
          data: null,
          error: { code: response.code, message: response.message }
        };
      }

      const { data } = response;

      return {
        data,
        error: null,
      };

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // client received an error response (5xx, 4xx)
        const { response } = error;

        if (!response) {
          return {
            data: null,
            error: errorsConst.appErrors.servicesErrors.responseReceivedWithoutStatusFailed
          };
        }

        const { data, statusText } = response;
        const { message: messageErrorApp, code: codeErrorApp } = errorsConst.appErrors.servicesErrors.responseReceivedStatusFailed

        let message = data && data.errors && data.errors.message ? data.errors.message : statusText;
        message = message.length === 0
          ? messageErrorApp
          : message

        let code = data && data.errors && data.errors.code ? data.errors.code : codeErrorApp;

        let description = data && data.errors && data.errors.description ? data.errors.description : "";

        return {
          data: null,
          error: { code, message, description }
        };

      } else if (error.request) {
        // client never received a response, or request never left 
        const { request } = error;

        if (!request) {
          return {
            data: null,
            error: errorsConst.appErrors.servicesErrors.requestNeverReceived
          };
        }

        const { data, statusText } = request;
        const { message: messageErrorApp, code: codeErrorApp } = errorsConst.appErrors.servicesErrors.responseStatusFailed

        let message = data && data.errors && data.errors.message ? data.errors.message : statusText;
        message = message.length === 0
          ? messageErrorApp
          : message

        let code = data && data.errors && data.errors.code ? data.errors.code : codeErrorApp;

        let description = data && data.errors && data.errors.description ? data.errors.description : "";

        return {
          data: null,
          error: { code, message, description }
        };

      } else {
        // anything else 
        // Something happened in setting up the request that triggered an Error
        return {
          data: null,
          error: {
            message: errorsConst.appErrors.servicesErrors.responseOtherFail
          },
        };
      }
    }
  }
}