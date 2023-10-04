import axios from "axios";
import APP_ENV from "../configs/appEnv";

export default class Request {
  constructor(
    config = { baseURL: APP_ENV.API_LOCATION_URL, timeout: 2000, headers: {} }
  ) {
    this._client = axios.create(config);
  }
  get client() {
    return this._client;
  }
  async get(url, config) {
    return await this._client.get(url, config);
  }

  async post(url, data, config) {
    return await this._client.post(url, data, config);
  }

  async patch(url, data, config) {
    return await this._client.patch(url, data, config);
  }

  async put(url, data, config) {
    return await this._client.put(url, data, config);
  }

  async delete(url, data, config) {
    return await this._client.delete(url, config);
  }
}

export const LocationRequest = new Request({
  baseURL: APP_ENV.API_LOCATION_URL,
});
