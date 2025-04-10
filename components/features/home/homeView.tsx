import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/app/context/AuthContext";
import { router } from "expo-router";

export function HomeView() {
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        router.replace("/authentication/(aLogin)");
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <LinearGradient
                colors={["#ffffff", "#6ed665"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.body}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.title}>¡Bienvenido!</Text>
                    <Text style={styles.subtitle}>Proyecto Final Cuatrimestral</Text>

                    <View style={styles.infoBox}>
                        <Text style={styles.label}><Text style={styles.bold}>Nombre:</Text> Alejandro Hernández Hernández</Text>
                        <Text style={styles.label}><Text style={styles.bold}>Materia:</Text> Desarrollo Móvil Multiplataforma</Text>
                        <Text style={styles.label}><Text style={styles.bold}>Cuatrimestre:</Text> 4to</Text>
                        <Text style={styles.label}><Text style={styles.bold}>Grupo:</Text> A</Text>
                        <Text style={styles.label}><Text style={styles.bold}>Docente:</Text> Mtro. Alfonso Felipe Lima Cortés</Text>
                    </View>

                    <Text style={styles.description}>
                        Esta aplicación reúne todos los trabajos realizados durante el cuatrimestre. Aquí podrás visualizar cada módulo, funcionalidad y proyecto desarrollado. ¡Una muestra de lo aprendido!
                    </Text>

                    <TouchableOpacity
                        style={styles.btn_exit}
                        onPress={handleLogout}
                    >
                        <Text style={styles.btn_text}>Cerrar Sesión</Text>
                    </TouchableOpacity>
                </ScrollView>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        padding: 30,
        width: "90%",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#000",
        alignItems: "center",
        gap: 15,
        marginVertical: 50,
        marginBottom: 25,
        marginTop: 25,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        color: "#2c3e50",
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#34495e",
        marginBottom: 10,
    },
    infoBox: {
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        gap: 5,
    },
    label: {
        fontSize: 16,
        color: "#2c3e50",
    },
    bold: {
        fontWeight: "bold",
    },
    description: {
        fontSize: 15,
        textAlign: "center",
        color: "#2d3436",
        marginTop: 10,
    },
    motivation: {
        fontSize: 16,
        fontStyle: "italic",
        textAlign: "center",
        color: "#27ae60",
        marginTop: 10,
    },
    btn_exit: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6b6c6a",
        height: 45,
        width: 150,
        borderRadius: 10,
        elevation: 2,
    },
    btn_text: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
