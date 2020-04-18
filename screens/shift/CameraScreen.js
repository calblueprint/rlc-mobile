import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

import { normalize } from "../../utils/Normalize";

export default function CameraScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    takePicture = async () => {
        if (this.camera) {
            this.camera.takePictureAsync({ base64: true, quality: 0, exif: true }).then(photo => {
                this.camera.pausePreview();
                const base64 = `data:image/jpeg;base64,${photo.base64}`;
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
            <Camera style={{ flex: 9 }} type={type}>
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