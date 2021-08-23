import { useState } from "react";
import axios from "axios";

const initialRequestInfo = {
  error: null,
  data: null,
  loading: false,
};

export default function useApi(config) {
  const [requestInfo, setRequestInfo] = useState(initialRequestInfo);

  async function call(localconfig) {
    setRequestInfo({
      ...initialRequestInfo,
      loading: true,
    });

    let response = null;

    try {
      response = await axios({
        baseURL: 'http://localhost:5000',
        ...config,
        ...localconfig
      });
      setRequestInfo({
        ...initialRequestInfo,
        data: response.data,
      });
    } catch (error) {
      setRequestInfo({
        ...initialRequestInfo,
        error,
      });
    }

    if (config.onCompleted) {
      config.onCompleted(response);
    }
  }

  return [call, requestInfo];
}
