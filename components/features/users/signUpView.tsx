import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, StatusBar } from "react-native";
import { useRouter } from "expo-router"; 
import { UserService } from "./services/userService";
import { LinearGradient } from "expo-linear-gradient";

export function SignUpView() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSignUp = async () => {
        if (!name.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
            Alert.alert("Error", "Todos los campos son obligatorios.");
            return;
        }

        const userService = new UserService();
        const newUser = await userService.register({ email, password, name, lastname:lastName});

        if (newUser) {
            Alert.alert("Éxito", "Usuario registrado correctamente.");
            router.push("/authentication/(aLogin)");
        } else {
            Alert.alert("Error", "No se pudo registrar el usuario.");
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
                    <Text style={styles.title}>Regístrate</Text>
                    <TextInput
                            placeholder="Nombre"
                            style={styles.textInput}
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            placeholder="Apellidos"
                            style={styles.textInput}
                            value={lastName}
                            onChangeText={setLastName}
                        />
                        <TextInput
                            placeholder="Correo"
                            style={styles.textInput}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <TextInput
                            placeholder="Contraseña"
                            style={styles.textInput}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity style={styles.check} 
                            onPress={handleSignUp}
                        >
                            <Text style={styles.text}>Registrarse</Text>
                        </TouchableOpacity>
                        <View style={styles.box}>
                            <Text>¿Ya estás registrado?</Text>
                            <TouchableOpacity onPress={() => router.push("/authentication/(aLogin)")}>
                            <Text style={styles.text2}>Inicia Sesión</Text>
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
        marginTop: 10,
        height: 50,
        width: 100,
        borderRadius: 25,
        backgroundColor: '#6b6c6a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        color:'#fff',
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