import type { AxiosRequestConfig } from 'axios';
import queryString from 'query-string';

import axios from '@/config/axios';

export class Http {
  private static getError = (error: unknown) => {
    if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === 'ERR_CANCELED') {
      console.log('Request aborted');
    } else if (error && typeof error === 'object' && 'response' in error) {
      const { data, status, statusText } = (error as { response: { data: unknown; status: number; statusText: string } }).response;
      throw data != null && data !== '' ? data : { message: `${status} ${statusText}` };
    } else {
      throw error;
    }
  };

  static async get<T = unknown>(
    url: string,
    queryParams?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) {
    try {
      if (queryParams) {
        const query = queryString.stringify(queryParams as Record<string, string>);
        url = url.indexOf('?') === -1 ? `${url}?${query}` : `${url}&${query}`;
      }
      const res = await axios.get<T>(url, config);
      return res?.data;
    } catch (error) {
      Http.getError(error);
    }
  }

  static async post<T = unknown, D = unknown>(url: string, data: D, config?: AxiosRequestConfig) {
    try {
      const res = await axios.post<T>(url, data, config);
      return res?.data;
    } catch (error) {
      Http.getError(error);
    }
  }

  static async put<T = unknown, D = unknown>(url: string, data: D, config?: AxiosRequestConfig) {
    try {
      const res = await axios.put<T>(url, data, config);
      return res?.data;
    } catch (error) {
      Http.getError(error);
    }
  }

  static async delete<T = unknown>(url: string, config?: AxiosRequestConfig) {
    try {
      const res = await axios.delete<T>(url, config);
      return res?.data;
    } catch (error) {
      Http.getError(error);
    }
  }
}
