import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Note } from "./note"

type Props = {
    note:Note
    onEdit:(note:Note) => void
}

export function NoteCard({note, onEdit} : Props){

    const truncateDescription = (text: string, limite: number) => {
        const palabras = text.split(' ');
        if (palabras.length > limite) {
            return palabras.slice(0, limite).join(' ') + '...';
        }
        return text;
    };

    return(
        <TouchableOpacity onPress={()=> onEdit(note)}>
            <View style={styles.container}>
                <View style={styles.head}>
                    <Text style={styles.title}>{note.title}</Text>
                </View>
                <View style={styles.subhead}>
                    <Text style={styles.text}>
                    <Text style={styles.dateString}>{new Date(note.date).toLocaleString("es-MX", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    })}</Text>
                    </Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.text}>{truncateDescription(note.text,10)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    dateString:{
        fontSize:18,
        marginTop:10,
        textAlign:"justify"
    },
    container:{
        marginTop: 10,
        backgroundColor: '#d88f1a',
        borderWidth: 3,
        borderColor: '#775012',
        borderRadius: 15,
    },
    head:{
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#000000',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 5,
    },
    title:{
        color: '#ffffff',
        fontSize: 18,
    },
    subhead:{
        height: 35,
        backgroundColor: '#af8035',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#000000',
        padding: 5,
    },
    content:{
        height: 50,
        padding: 5,
    },
    text:{
        fontSize: 16,
    },
})