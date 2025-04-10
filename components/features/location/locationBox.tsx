import { StyleSheet, View, Text } from "react-native";
import { Location } from "./entities/locations";
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
    locations: Location,
}

export function LocationBox({ locations }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <FontAwesome5 name="map-marker-alt" size={20} color="#3498db" />
                <Text style={styles.title}>Ubicación registrada</Text>
            </View>
            <View style={styles.details}>
                <View style={styles.detailRow}>
                <MaterialCommunityIcons name="latitude" size={16} color="#7f8c8d" />                    <Text style={styles.text}>{locations.latitude.toFixed(6)}°</Text>
                </View>
                <View style={styles.detailRow}>
                    <MaterialCommunityIcons name="longitude" size={16} color="#7f8c8d" />
                    <Text style={styles.text}>{locations.longitude.toFixed(6)}°</Text>
                </View>
                <View style={styles.detailRow}>
                    <FontAwesome5 name="clock" size={16} color="#7f8c8d" />
                    <Text style={styles.text}>{locations.date.toDate().toLocaleString()}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ecf0f1',
        paddingBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
        marginLeft: 8,
    },
    details: {
        gap: 8,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    text: {
        fontSize: 14,
        color: '#34495e',
    },
});