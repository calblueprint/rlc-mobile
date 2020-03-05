import { AsyncStorage } from 'react-native';

class LocalStorage {

  static storeUser(user_json) {
    AsyncStorage.setItem('user', JSON.stringify(user_json));
  }

  static storeEvents(events_json) {
    AsyncStorage.setItem('events', JSON.stringify(events_json));
  }

  static async getUser() {
    try {
      var user_json = await AsyncStorage.getItem('user');
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
    AsyncStorage.removeItem('user');
  }
  
}

export default LocalStorage;