import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
    uri: string;
    onSave: (uri: string) => void;
    onCancel: () => void;
    onRepeat: () => void;
}

export function ImagePreview({
    uri,
    onSave,
    onCancel,
    onRepeat,
}: Props){
    return(
        <View style={styles.container}>
            <Image
                source={{uri}}
                style={{
                    height: '100%',
                    aspectRatio: 1,
                    objectFit: 'contain',
                }}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={onRepeat}
                >
                    {/** repetir galeria*/}
                    <FontAwesome name="repeat" style={styles.btn_repetir} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onSave(uri)}
                >
                    {/** guardar*/}
                    <FontAwesome name="save" style={styles.btn_guardar} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onCancel}
                >
                    {/** cancelar */}
                    <MaterialIcons name="cancel" style={styles.btn_cancelar} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        height: '100%',
        zIndex: -1,
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    btn_repetir:{
        fontSize: 30,
        color: 'white'
    },
    btn_guardar:{
        fontSize: 32,
        color: 'white',
        fontWeight: 'bold',
    },
    btn_cancelar:{
        fontSize: 35,
        color: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        gap: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingBottom: 50,
        marginTop: 10,
    },
}) 