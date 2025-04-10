import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
    onCancel: () => void;
    onTakePicture: (uri?: string) => void;
}

export function CameraComponent(
  { onCancel, onTakePicture }: Props
) {
  const [facing, setFacing] = useState<CameraType>('back');
  const ref = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takePicture = async () => {
    if (ref.current) {
      const photo = await ref.current.takePictureAsync();
      onTakePicture(photo?.uri);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={ref}
        style={styles.camera}
        facing={facing}
        >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            {/* Rotar */}
            <Fontisto name="spinner-rotate-forward" style={styles.btn_rotar} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            {/* Tomar */}
            <FontAwesome5 name="circle" style={styles.btn_tomar} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => onCancel()}>
            {/* Cancelar */}
            <MaterialIcons name="cancel" style={styles.btn_cancelar} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 10,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginBottom: 25,
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  btn_rotar:{
    fontSize: 25,
    color: 'white'
  },
  btn_tomar:{
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
  btn_cancelar:{
    fontSize: 32,
    color: 'white',
  },
});
