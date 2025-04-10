import { Modal, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { Note } from "./note";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

type Props = {
    note: Note | null;
    open: boolean;
    onSaved: (note: Note) => void;
    onClose: () => void;
};

export function NoteModal({
    note,
    open,
    onSaved,
    onClose
}: Props) {

    const [text, setText] = useState("");
    const [title, setTitle] = useState("");

    const handleSave = () => {
        if(!note) return;
        onSaved({
            ...note,
            title,
            text,
        });
    };

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setText(note.text);
        }
    }, [note]);

    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={open}
        onRequestClose={() => onClose()}
        >
            <View style={styles.main}>
                <View style={styles.body}>
                    <View style={styles.container}>
                        <View style={styles.box1}>
                        <TouchableOpacity onPress={onClose}>
                            <AntDesign name="closecircleo" size={24} color="black" />
                        </TouchableOpacity>
                        </View>
                            <Text style={styles.title}>Nueva nota</Text>
                            <TextInput
                                value={title}
                                placeholder="Titulo"
                                onChangeText={setTitle}
                                style={styles.inputTitle}
                            />
                            <TextInput
                                value={text}
                                placeholder="Texto"
                                onChangeText={setText}
                                style={styles.inputText}
                            ></TextInput>
                            <View style={styles.box2}>
                                <TouchableOpacity style={styles.btn} onPress={handleSave}>
                                    <Text>Guardar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={onClose}>
                                    <Text>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    main:{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    body:{
        borderRadius: 15,
        height: '57%',
        width: '75%',
        padding: 5,
        backgroundColor: '#ee9e1e',
        borderWidth: 5,
        borderColor: '#7f5106',
    },
    container:{
        backgroundColor: '#ffffff',
        padding: 10,
        height: 'auto',
    },
    title:{
        fontSize: 25,
        fontWeight: 'bold',
        width: '100%',
        alignContent: 'center',
    },
    box1:{
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    box2:{
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        padding: 10,
    },
    btn:{
        backgroundColor: '#12b0da',
        borderRadius: 10,
        height: 'auto',
        width: 'auto',
        padding: 10,
    },
    inputTitle:{
        borderWidth: 2,
        borderColor: '#000000',
        width: '100%',
        height: 'auto',
        borderRadius: 15,
        marginTop: 10,
    },
    inputText:{
        borderWidth: 2,
        borderColor: '#000000',
        width: '100%',
        height: '50%',
        borderRadius: 15,
        marginTop: 10,
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlign: 'justify',
    },
})