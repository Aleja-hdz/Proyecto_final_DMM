import { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { CameraComponent } from "./cameraView";
import { PhotoPreview } from "./photoPreview";
import { ImagePreview } from "./imagePreview";
import * as PhotoPicker from 'expo-image-picker';

/**
 * Componente donde seleccionaremos el origen de la imagen: Camara o galeria
 * @returns 
 */

type ImagePickerProps = {
    onImageSelected: (uri: string | null) => void;
};

export function ImagePicker({ onImageSelected }: ImagePickerProps) {
    const [open, setOpen] = useState(false);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [image, setImage] = useState<string | undefined | null>(null);
    const [isFromGallery, setIsFromGallery] = useState(false);

    const onPictureTaked = (uri?: string) => {
        setCameraOpen(false);
        setImage(uri);
        setIsFromGallery(false);
    }

    const onNewPhoto = () => {
        setImage(undefined);
        setCameraOpen(true);
    }

    const onSavePhoto = (uri: string) => {
        onImageSelected(uri);
        Alert.alert("Foto guardada.");
        setOpen(false);
        setImage(undefined);
    }
    
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await PhotoPicker.launchImageLibraryAsync({
          mediaTypes: PhotoPicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          const uri = result.assets[0].uri;
          setImage(uri);
          setIsFromGallery(true);
        }
      };

    const onRepeatGallery = () => {
        setImage(undefined);
        pickImage();
    };

    const renderMenu = (
        <View style={styles.overlay}>
            <View style={styles.box}>
                <Text style={styles.title}>Selecciona una opción</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => setCameraOpen(true)}>
                        <FontAwesome5 name="camera" size={20} color="white" />
                        <Text style={styles.buttonText}>Cámara</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={pickImage}>
                        <FontAwesome5 name="image" size={20} color="white" />
                        <Text style={styles.buttonText}>Galería</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.cancelButton} onPress={() => setOpen(false)}>
                    <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View>
            <TouchableOpacity onPress={() => setOpen(true)}>
                <FontAwesome5 name="camera" size={35} color="black" />
            </TouchableOpacity>
            <Modal visible={open} transparent={true} animationType="fade">
                {!cameraOpen && !image ? renderMenu : null}

                {cameraOpen ? (
                    <CameraComponent
                        onCancel={() => setCameraOpen(false)}
                        onTakePicture={onPictureTaked}
                    />
                ) : null}

                {image && !isFromGallery ? (
                    <PhotoPreview
                        uri={image}
                        onCancel={() => setImage(undefined)}
                        newPhoto={onNewPhoto}
                        onSave={onSavePhoto}
                    />
                ) : null}

                {image && isFromGallery ? (
                    <ImagePreview
                        uri={image}
                        onCancel={() => setImage(undefined)}
                        onRepeat={onRepeatGallery}
                        onSave={onSavePhoto}
                    />
                ) : null}
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    box: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        width: '80%',
        alignItems: 'center',
        elevation: 10,
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3247f7',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 12,
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },

    cancelButton: {
        marginTop: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
    },

    cancelText: {
        fontSize: 16,
        color: '#ff3b30',
        fontWeight: 'bold',
    },
});
