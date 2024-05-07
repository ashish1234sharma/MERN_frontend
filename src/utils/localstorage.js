import { encryptData, decryptData } from './encryptData';

const salt = '6d090796-ecdf-11ea-adc1-0242ac112345';
export class LocalStorageManager {
    static async setToken(token) {
        try {
            const encryptedData = encryptData(token, salt);
            localStorage.setItem('isToken', encryptedData);
        } catch (error) {
            console.log(error);
        }
    }
    static getToken() {
        const isToken = localStorage.getItem('isToken');
        if (!isToken) return null
        // const originalData = decryptData(isToken, salt);
        // console.log(originalData)
        return decryptData(isToken, salt);
    }

    static async setIsUserID(_id) {
        try {
            const encryptedData = encryptData(_id, salt);
            localStorage.setItem('isUserID', encryptedData);
        } catch (error) {
            console.log(error);
        }
    }
    static getIsUserID() {
        const isUserID = localStorage.getItem('isUserID');
        if (!isUserID) return null
        return decryptData(isUserID, salt);
    }
    static async setUserInfo(user) {
        try {
            const encryptedData = encryptData(user, salt);
            localStorage.setItem('user', encryptedData);
        } catch (error) {
            console.log(error);
        }
    }
    static getUserInfo() {
        const isUserID = localStorage.getItem('user');
        if (!isUserID) return null
        return decryptData(isUserID, salt);
    }

    static removeItems() {
        localStorage.clear();
    }
}