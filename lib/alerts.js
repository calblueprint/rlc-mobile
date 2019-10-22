import { Alert } from 'react-native'

/**
 * Display error in pop-up dialog with custom buttons.
 * Error callback for API requests.
 */
function customError(response, buttonActions) {
  Alert.alert(
    'Error',
    response.errors ? response.errors.join("\n") : response.error,
    buttonActions,
  )
}

/**
 * Display error in pop-up dialog with OK button.
 * Error callback for API requests.
 */
function standardError(response) {
  Alert.alert(
    'Error',
    response.errors ? response.errors.join("\n") : response.error,
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
  )
}

/**
 * Display error in pop-up dialog with OK button.
 * Error alert for frontend errors.
 */
function frontendError(message) {
  Alert.alert(
    'Error',
    message,
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
  )
}

/**
 * Pop-up dialog asking for delete confirmation.
 */
function confirmDelete(message, buttonCallback) {
  Alert.alert(
    'Confirm Delete',
    message,
    [
      {text: 'Cancel', onPress: () => console.log('Canceled Delete')},
      {text: 'Delete', onPress: buttonCallback},
    ],
  )
}

export { customError, standardError, frontendError, confirmDelete }