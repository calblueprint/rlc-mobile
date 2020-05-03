import { AsyncStorage } from 'react-native';

class LocalStorage {

  static storeItem(item_name, item_json) {
    return AsyncStorage.setItem(item_name, JSON.stringify(item_json));
  }

  // example usage: let item = await getItem(item_name); 
  static async getItem(item_name) {
    try {
      var item_json = await AsyncStorage.getItem(item_name);
      if (item_json !== null) {
        return Promise.resolve(JSON.parse(item_json));
      } 
      return item_json;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getNonNullItem(item_name) {
    try {
      var item_json = await AsyncStorage.getItem(item_name);
      if (item_json !== null) {
        return Promise.resolve(JSON.parse(item_json));
      } else {
        return Promise.reject(new Error(`No stored ${item_name}`));
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