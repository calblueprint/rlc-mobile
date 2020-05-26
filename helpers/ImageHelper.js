import * as ImagePicker from 'expo-image-picker';
import settings from '../config/settings'


async function takePicture(event_id, is_receipt) {
    let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
    });
    
    if (result.cancelled) {
        return;
    }
    
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.uri;
    let filename = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    let formData = new FormData();

    // Upload the image using the fetch and FormData APIs
    formData.append('event_id', event_id);
    formData.append('image', { uri: localUri, name: filename, type });
    formData.append('is_receipt', is_receipt);
    const postURL = settings.URL + 'api/upload_image'
    // Assume "photo" is the name of the form field the server expects
    // formData.append('photo', { uri: localUri, name: filename, type });

    fetch(postURL, {
        method: 'POST',
        body: formData,
        headers: {
            'content-type': 'multipart/form-data',
        },
    }).then((result) => {
        console.log('Success uploading!', JSON.stringify(result));
        alert("Image upload success! Please go back")
    })  
    return localUri      
};

export {
    takePicture
};
  