//Vista para mostrar la ubicacion del usuario
//Mezclar: expo-location y expo-rn-maps

import { StyleSheet, View, StatusBar, Alert } from "react-native";
import { useEffect, useRef, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import { DataSource } from "./datasource/datasource";
import { Location } from "./entities/locations";

export function HistoryLocationView(){

    //ToDO: Traer el historial de la bd y remplazar estos datos estaticos
   {/*const locations = [
    {
        latitude: 18.5955558,
        longitude: -98.4907685,
    },
    {
        latitude: 18.33055,
        longitude: -98.27639,
    },
   ];*/}
   const dataSource = new DataSource();

   const [locations,setLocations] = useState<Location[]>([]);


    //Para almacenar la instancia del mapa
    const mapRef = useRef(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const results = await dataSource.list();
                setLocations(results);
            }
            catch (error){
                Alert.alert("Error", "Error al obtener datos");
            }
        };
        fetchLocations();
    }, []);

    //efecto que detecte cambio en la ubicacion y mueva la camara (la centre)
    useEffect(() => {
        async function showLocation(){
            //si hay ubicacion centrar la camara
            if(locations.length){
                //obtener la instancia de camara
                const camera = await (mapRef?.current as any).getCamera();
                //estableces el enfoque
                camera.center = {
                    latitude: locations[0].latitude,
                    longitude: locations[0].longitude,
                };
                camera.zoom = 11;
                (mapRef?.current as any).animateCamera(camera, {duration: 1000});
            }
        }
        showLocation();
    }, [locations]);

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="light-content"/>
            <MapView style={styles.map}
                ref={mapRef}
                zoomEnabled
                showsUserLocation
                showsMyLocationButton
                initialRegion={{
                    latitude: 18.5955558,
                    longitude: -98.4907685,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}   
            >
                {locations.map((location, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude
                        }}
                        pinColor="red"
                    />
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    map: {
        flex: 1,
        width: '100%',
    },
});