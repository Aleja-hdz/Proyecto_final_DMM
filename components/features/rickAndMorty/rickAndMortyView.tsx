import { Link } from "expo-router";
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useRouter } from "expo-router"

export default function RickAndMortyView() {
    const router = useRouter();
    const image = { uri: 'https://wallpapers.com/images/featured/rick-and-morty-8rc57d4ds44gqzau.webp' };
    return (
        <ImageBackground source={image} style={styles.backgroundImage}>   
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Rick and Morty</Text>
                    <Text style={styles.subTitle}>The Series</Text>
                </View>
                <View style={styles.box1}>
                    <Text style={styles.textContent}>
                        Application of official information of the series Rick and Morty.
                    </Text>
                </View>
                <View style={styles.box1}>
                    <Text style={styles.textContent}>Explore this app to find official content from the series.</Text>
                    <View style={styles.box2}>
                        <TouchableOpacity onPress={() => router.push("../drawer/(location)")}>
                            <Text>Prueba</Text>
                        </TouchableOpacity>
                        <Text style={styles.links}><SimpleLineIcons name="user" size={17} color="black" /> Characters</Text>
                        <Text style={styles.links}>Episodes <SimpleLineIcons name="social-youtube" size={24} color="black" /></Text>
                        <Text style={styles.links}><EvilIcons name="location" size={25} color="black"/> Locations</Text>
                    </View>
                </View>
                <View style={styles.box3}></View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 20,
    },
    header: {
        width: '100%',
        height: '10%',
        backgroundColor: '#303244',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
    },
    title: {
        color: '#ffffff',
        fontSize: 45,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subTitle: {
        color: '#ffffff',
        fontSize: 25,
        textAlign: 'center',
    },
    textContent: {
        textAlign: 'center',
        fontSize: 15,
        color: '#000',
    },
    box1: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 15,
        padding: 15,
        width: '90%',
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    links: {
        fontSize: 18,
        color: 'blue',
        fontWeight: 'bold',
    },
    box2:{
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        marginTop: 10,
    },
    box3:{
        height:1000,
    },
});
