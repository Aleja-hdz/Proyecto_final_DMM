//Vista para mostrar la ubicacion del usuario
//Mezclar: expo-location y expo-rn-maps

import { Button, StyleSheet, Text, View, StatusBar, TouchableOpacity } from "react-native";
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from "expo-router";
import { Timestamp } from "firebase/firestore";
import { DataSource } from "./datasource/datasource";

export function LocationView(){

    const dataSource = new DataSource();

    const router = useRouter();

    const [permission, requestPermission] = Location.useForegroundPermissions();

    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    //Para almacenar la instancia del mapa
    const mapRef = useRef(null);

    useEffect(() => {
        async function getCurrentLocation() {

        if (!permission?.granted) {
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        //enviar la ubicacion a la funcion
        //que guarda en la BD (datasource)
        }

        getCurrentLocation();
    }, [permission]);

    //efecto que detecte cambio en la ubicacion y mueva la camara (la centre)
    useEffect(() => {
        async function showLocation(){
            //si hay ubicacion centrar la camara
            if(location){
                //obtener la instancia de camara
                const camera = await (mapRef?.current as any).getCamera();
                //estableces el enfoque
                camera.center = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                };

                (mapRef?.current as any).animateCamera(camera, {duration: 1000});
            }
        }
        showLocation();
    }, [location]);

    useEffect(()=>{
        async function saveLocation(){
            if(location){
                const transformedLocation = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    date: Timestamp.fromDate(new Date()),
                };
                const save = await dataSource.save(transformedLocation);
            }
        }
        saveLocation();
    })

    if(!permission?.granted){
        return(
            <View style={styles.containerAccess}>
                <View style={styles.box}>
                    <Text style={styles.text2}>Debes permitir el acceso a la ubicacion.</Text>
                    <Button
                        onPress={requestPermission}
                        title="Permitir ubicacion"
                    />
                </View>
            </View>
        );
    }

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="light-content"/>
            <MapView style={styles.map}
                ref={mapRef}
                zoomEnabled
                showsUserLocation
                showsMyLocationButton
                initialRegion={{
                    latitude: location?.coords.latitude || 18.5955558,
                    longitude: location?.coords.longitude || -98.4907685,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}   
            >
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        pinColor="red"
                    />
                )}
            </MapView>
            <View style={styles.locationInfo}>
                <Text style={styles.text}>
                    {/**si location existe muestra latitud y longitud con seis decimales y si no, indica que la ubicación está cargando. */}
                    {location ? `Latitud: ${location.coords.latitude.toFixed(6)}\nLongitud: ${location.coords.longitude.toFixed(6)}` : 'Obteniendo ubicación...'}
                </Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => router.push('../../app/drawer/(history)')}>
                <Text style={styles.text}>Historial</Text>
            </TouchableOpacity>
        </View>
    );
}

//TAREA: que muestre latitud y longitud en el mapa enzima de todo hacer los estilos
//y agregar un boton flotante para llevar a la siguiente pantalla en la que se mostrara el historial de ubicaciones

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerAccess:{
        flex: 1,
        width: '100%',
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',

    },
    box:{
        width: '70%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 15,
    },
    map: {
        flex: 1,
        width: '100%',
    },
    locationInfo: {
        position: 'absolute',
        top: 15,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 10,
        borderRadius: 8,
        elevation: 3,
    },
    text: {
        fontSize: 14,
        color: '#000',
    },
    text2: {
        fontSize: 14,
        color: '#000',
        marginBottom: 15,
        textAlign: 'center',
    },
    button:{
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 100,
        alignItems: 'center',
        backgroundColor: '#85c1e9',
        padding: 10,
        borderRadius: 10,
    },
});