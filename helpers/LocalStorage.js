import { AsyncStorage } from 'react-native';

class LocalStorage {

  static storeItem(item_name, item_json) {
    AsyncStorage.setItem(item_name, JSON.stringify(item_json));
  }

  static async getItem(item_name) {
    try {
      var item_json = await AsyncStorage.getItem(item_name);
      if (item_json !== null) {
        return Promise.resolve(JSON.parse(item_json));
      } else {
        return Promise.reject(new Error("No stored user"));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static clearItem(item_name) {
    AsyncStorage.removeItem(item_name);
  }
  
}

export default LocalStorage;