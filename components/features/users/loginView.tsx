import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, StatusBar, Image } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from "expo-router"
import { useAuth } from "@/app/context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";

export function LoginView() {
    const router = useRouter();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useAuth();

    const logIn = async () => {
        const email = user.trim();
        const pass = password.trim();
    
        if (!email || !pass) {
            Alert.alert("Error", "Campos vacíos");
            return;
        }
    
        console.log("Intentando iniciar sesión con:", email);
        const logInResponse = await login(email, password);
    
        if (logInResponse) {
            console.log("Inicio de sesión exitoso",);
            Alert.alert("Éxito", "Inicio de sesión exitoso");
            router.replace("/drawer/(home)");


        } else {
            Alert.alert("Error", "Credenciales incorrectas");
        }
    };

    return (
        <View>
            <StatusBar backgroundColor="white" barStyle="dark-content"/>
            <LinearGradient 
                colors={["#fff", "#6ed665"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.body}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Inicio de Sesión</Text>
                        <TextInput
                            placeholder="Email"
                            style={styles.textInput}
                            onChangeText={setUser}
                            value={user}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                        <TextInput
                            secureTextEntry={true}
                            placeholder="Contraseña"
                            style={styles.textInput}
                            onChangeText={setPassword}
                            value={password}
                        />
                        <TouchableOpacity
                            style={styles.check}
                            onPress={logIn}
                        >
                            <Feather name="arrow-right" size={30} color="white" />
                        </TouchableOpacity>
                        <View style={styles.box}>
                            <Text>¿Aun no estas registrado?</Text>
                            <TouchableOpacity onPress={() => router.push("/authentication/(bRegister)")}>
                            <Text style={styles.text2}>Registrarse</Text>
                        </TouchableOpacity>
                        </View>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    body:{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container:{
        height: 'auto',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderWidth: 1,
        borderColor: '#000',
        padding: 25,
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },
    title: {
        fontSize: 27,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    textInput: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 10,
    },
    check: {
        marginTop: 5,
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 0,
        backgroundColor: '#6b6c6a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text2: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#c0392b'
    },
    box:{
        marginTop: 15,
        width: '100%',
        height: 'auto',
        alignItems: 'flex-end'
    },
})