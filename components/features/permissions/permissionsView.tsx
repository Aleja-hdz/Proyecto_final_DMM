import { View, StatusBar, StyleSheet } from "react-native";
import { CameraPermission } from "./cameraPermission";
import { GalleryPermission } from "./galleryPermission";
import { MicrophonePermission } from "./microphonePermission";
import { GpsPermission } from "./gpsPermission";
import { ContactsPermission } from "./contactsPermission";
import { CalendarPermission } from "./calendarPermission";

export function PermissionsView(){ 
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content"/>
            <View style={styles.box}>
                <CameraPermission></CameraPermission>
                <GalleryPermission></GalleryPermission>
                <MicrophonePermission></MicrophonePermission>
                <GpsPermission></GpsPermission>
                <ContactsPermission></ContactsPermission>
                <CalendarPermission></CalendarPermission>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        padding: 25,
        paddingTop: 0,
    },
    box:{
        marginTop: 15,
    },
})
