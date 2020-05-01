import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import settings from '../../config/settings'


import { normalize } from "../../utils/Normalize";

export default function CameraScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    takePicture = async () => {
        if (this.camera) {
            this.camera.takePictureAsync({ base64: true, quality: 0, exif: true }).then(photo => {
                this.camera.pausePreview();
                const base64 = `data:image/jpeg;base64,${photo.base64}`;

                const formData = new FormData();
                // TODO: @Johnathan. Once shift details screen is loading information properly,
                // I'll grab the event ID and pass it into camera this.navigation.navigate(camera, this.state.id)
                formData.append('image[event_id]', '58288');
                formData.append('image[file]', base64);
                const postURL = settings.URL + '/images'
                fetch(postURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                      },
                    body: formData
                })
                .then((response) => response.json())
                .then((result) => {
                    console.log('Success uploading!', result);
                    alert("Image upload success! Please go back")
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            })
            .catch((error) => {
                console.error("Error: ", error)
            })
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