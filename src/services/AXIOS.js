import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import SnackNotification from '../components/snackbar';
import { LocalStorageManager } from '../utils/localstorage'

export const AXIOS = () => {
    const API = axios.create({
        baseURL: "http://localhost:8080/api",
    });

    API.interceptors.request.use(async function (config) {
        const controller = new AbortController();
        const token = LocalStorageManager.getToken();

        try {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                config.headers.Accept = 'application/json, text/plain, */*';
            } else {
                config.headers.Accept = 'application/json, text/plain, */*';
                config.headers["content-type"] = 'application/json';
            }
            return {
                ...config,
                signal: controller.signal
            };
        } catch (error) {
            return Promise.reject(error);
        }
    })

    API.interceptors.response.use(function (response) {

        return { data: response?.data, status: response?.status };
    }, function (error) {
        if (error?.response?.status === 401) {
            enqueueSnackbar(
                "Session Timeout",
                {
                    variant: "error",
                    content: (key, message) => { return SnackNotification(key, message, 'error') }
                }
            )
            LocalStorageManager.removeItems()
        } else if (error?.message === "Network Error") {

        } else if (error?.response?.status === 400) {
            if (error?.response?.config?.method === "post" || error?.response?.config?.method === "patch" || error?.response?.config?.method === "delete") {
                enqueueSnackbar(
                    error?.response?.data?.message || "unable to process. try again.", {
                    variant: "error",
                    content: (key, message) => { return SnackNotification(key, message, 'error') }
                })
            }
        } else if (error?.response?.status === 403) {
            enqueueSnackbar(
                error?.response?.data?.message, {
                variant: "error",
                content: (key, message) => { return SnackNotification(key, message, 'error') }
            }
            )
            LocalStorageManager.removeItems()
        } else if (error?.response?.status === 404) {
            if (error?.response?.config?.method === "post" || error?.response?.config?.method === "patch" || error?.response?.config?.method === "delete") {
                enqueueSnackbar(
                    error?.response?.data?.message || "unable to process. try again.", {
                    variant: "error",
                    content: (key, message) => { return SnackNotification(key, message, 'error') }
                })
            }
        } else if (error?.response?.status === 405) {

        }

        return Promise.reject(error);
    })

    return API;
};