import { AsyncStorage } from 'react-native';
import StorageKeys from '../lib/storageKeys';

class LocalStorage {

  static storeUser(user_json) {
    AsyncStorage.setItem(StorageKeys.user, JSON.stringify(user_json));
  }

  static async getUser() {
    try {
      var user_json = await AsyncStorage.getItem(StorageKeys.user);
      if (user_json !== null) {
        return Promise.resolve(JSON.parse(user_json));
      } else {
        return Promise.reject(new Error("No stored user"));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static clearUser() {
    AsyncStorage.removeItem(StorageKeys.user);
  }
}

export default LocalStorage;