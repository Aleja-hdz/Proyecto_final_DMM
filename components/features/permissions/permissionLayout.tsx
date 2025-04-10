import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  icon: any,
  title: string,
  granted: boolean,
  requestPermission: () => void,
}

export function PermissionLayout({ icon, title, granted, requestPermission }: Props) {
  return(
    <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.box_icon}>
                    <FontAwesome5 name={icon} size={24} color="black" />
                </View>
                <Text style={styles.text}>{title}</Text>
            </View>
            <View style={styles.box2}>
                {granted ? (
                    <FontAwesome5 name="check" size={24} color="green" />
                ):(
                    <TouchableOpacity onPress={requestPermission} style={styles.btn}>
                        <Text style={styles.text_btn}>Autorizar</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
  container:{
      flexDirection: 'row',
      width: '100%',
      marginTop: 17,
  },
  box:{
      flexDirection: 'row',
      width: '65%',

      alignItems: 'center',
  },
  box2:{
      flexDirection: 'row',
      width: '35%',
      justifyContent: 'center',

  },
  box_icon:{
      width: '25%'
  },
  text:{
      fontSize: 14,
      fontWeight: 'bold',
  },
  text_btn:{
      fontSize: 14,
      fontWeight: 'bold',
      color: '#fff',
  },
  btn:{
      borderRadius: 5,
      backgroundColor: '#24a1c1',
      width: 100,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
  },
})