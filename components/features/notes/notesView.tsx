import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity} from 'react-native';
import { DataSource } from './dataSource';
import React, { useEffect, useState } from 'react';
import { Note } from './note';
import { NoteCard } from './noteCard';
import { NoteModal } from './noteModal';
import { AntDesign } from '@expo/vector-icons';

export default function ListView() {

  const  dataSource = new DataSource();
  const [notes, setNotes] = useState<Note[]> ([]);
  const[modalOpen,setModalOpen] = useState (false);
  const[selected,setSelected] = useState <Note | null> (null);

  const handleAddNote = ()=>{
    setModalOpen(true)
    setSelected({
      id:0,
      title:"",
      text:"",
      date: new Date()
    })
  }

  const handleEditNote = (note:Note) =>{
    setModalOpen(true)
    setSelected(note)
  }

  const onSavedNote = async (note: Note) => {
    if (!note.title.trim()) {
      Alert.alert("Error", "La nota como mínimo debe de tener un título");
      return;
    }
  
    try {
      const newNote = await dataSource.addNote(note);
  
      if (!newNote) {
        Alert.alert("Error", "No se pudo registrar la nota");
        return;
      }
  
      if (note.id === 0) {
        setNotes([...notes, newNote]);
      } else {
        setNotes(notes.map((item) => (item.id === note.id ? newNote : item)));
      }
    } catch (error) {
      Alert.alert("Error");
    }
  
    setModalOpen(false);
  };

  useEffect(()=>{
    dataSource.getNotes()
    .then((results)=>{
      setNotes(results);
    })
    .catch((error)=>{
      Alert.alert(`Error: ${error.message}`)
    })

  },[])

  return (
    <View style={styles.container}>
      <View style={styles.head}>
       <Text style={styles.title}>Lista de Notas</Text>
        <TouchableOpacity onPress={handleAddNote}>
          <AntDesign name="pluscircleo" size={25} color="black" />
        </TouchableOpacity>
      </View>
        <FlatList
        style={styles.flatList}
        data={notes}
        renderItem={({item})=>(
            <NoteCard 
            note={item}
            onEdit={handleEditNote}
            />
        )}
        keyExtractor={item=>item.id.toString()}
      />
      <NoteModal
        open={modalOpen}
        note={selected}
        onClose={()=>setModalOpen(false)}
        onSaved={onSavedNote}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  
  flatList:{
    height:750,
    width:"auto"
  },

  nota: {
    fontSize: 20,
    marginBottom: 5,
  },

  button:{
    borderRadius:14,
    backgroundColor:'rgb(255, 185, 71)',
    height:50,
    width:"auto",
    justifyContent:"center",
    paddingBlockStart:'auto',

  },

  textButton:{
    fontSize:24,
    textAlign:"center",
    fontWeight:"800"
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
},
head:{
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingLeft: 10,
  paddingRight: 10,
},
});

