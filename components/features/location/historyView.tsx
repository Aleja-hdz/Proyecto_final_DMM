import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { DataSource } from "./datasource/datasource";
import { useEffect, useState } from "react";
import { Location } from "./entities/locations";
import { LocationBox } from "./locationBox";
import { FontAwesome5 } from '@expo/vector-icons';

export function HistoryView(){
    const dataSource = new DataSource();
    const [locations, setLocations] = useState<Location[]>([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const results = await dataSource.list();
                setLocations(results);
            } catch (error) {
                Alert.alert("Error", "Error al obtener datos");
            }
        };
        fetchLocations();
    }, []);

    return(
        <View style={styles.container}>
            <FlatList
                data={locations}
                renderItem={({item}) => <LocationBox locations={item} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f6fa',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#ecf0f1',
        gap: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#2c3e50',
    },
    listContent: {
        paddingVertical: 16,
    },
});