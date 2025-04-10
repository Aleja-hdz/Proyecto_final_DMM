import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { ImagePicker } from "../imagePicker/imagePicker";
import { useState } from "react";

export function ImageGallery(){

    const [images, setImages] = useState<string[]>([]);

    const handleImageSelected = (uri: string | null) => {
        if (uri) {
            setImages([...images, uri]);
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Seleccionador de imagen</Text>
            <ImagePicker
            onImageSelected={handleImageSelected}
            />

            {images.length > 0 && (
                <>
                    <Text style={styles.subTitle}>Imágenes seleccionadas</Text>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.imagesContainer}>
                            {images.map((uri, index) => (
                                <Image
                                    key={index}
                                    source={{ uri }}
                                    style={styles.image}
                                />
                            ))}
                        </View>
                    </ScrollView>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        paddingTop: 25,
    },
    title:{
        fontSize: 18,
        marginBottom: 10,
    },
    imagesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        padding: 10,
        justifyContent: 'center'
    },
    subTitle:{
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 15,
    },
    scrollView: {
        width: '100%',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
    }
})