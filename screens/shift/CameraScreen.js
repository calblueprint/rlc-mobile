import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import settings from '../../config/settings'
import Constants from 'expo-constants';



import { normalize } from "../../utils/Normalize";

export default function CameraScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    takePicture = async () => {
        if (this.camera) {
            // this.camera.takePictureAsync({ quality: 0, exif: true }).then(photo => {
            //     this.camera.pausePreview();
            //     const base64 = `data:image/jpeg;base64,${photo.base64}`;
            //     const blobdata = b64toBlob(photo.base64, 'jpeg', 1)
            //     console.log(blobdata)
            //     const formData = new FormData();
            //     // TODO: @Johnathan. Once shift details screen is loading information properly,
            //     // I'll grab the event ID and pass it into camera this.navigation.navigate(camera, this.state.id)
            //     formData.append('image[event_id]', '59578');
            //     formData.append('image[file]', blobdata);
            //     const postURL = settings.URL + 'images'
            //     fetch(postURL, {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'multipart/form-data',
            //           },
            //         body: formData
            //     })
            //     .then((result) => {
            //         console.log('Success uploading!', JSON.stringify(result));
            //         alert("Image upload success! Please go back")
            //     })
            //     .catch((error) => {
            //         console.error('Error:', error);
            // });
            // })
            // .catch((error) => {
            //     console.error("Error: ", error)
            // })
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
                        const formData = new FormData();

            // Upload the image using the fetch and FormData APIs
            formData.append('image[event_id]', '59578');
            formData.append('image[file]', { uri: localUri, name: filename, type });
            const postURL = settings.URL + 'images'
            // Assume "photo" is the name of the form field the server expects
            formData.append('photo', { uri: localUri, name: filename, type });
        
            return await fetch(postURL, {
                method: 'POST',
                body: formData,
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });
        }
        
    };

    useEffect(() => {
        (async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={{ flex: 1, flexDirection: "column" }}>
            <Camera 
                style={{ flex: 9 }} 
                type={type}
                ref={ref => {
                    this.camera = ref;
                }}
                >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                    }}>
                </View>
            </Camera>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
                <TouchableOpacity
                    style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.text}> Back </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button} onPress={this.takePicture}>
                    <Text style={styles.text}> Take Photo </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}>
                    <Text style={styles.text}> Flip </Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: 'center',
        margin: "5%",
    },
    text: {
        flex: 1,
        fontSize: normalize(16),
        marginBottom: 10
    }
})