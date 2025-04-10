import { useFonts } from "expo-font";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Slot} from "expo-router";
import { AuthProvider, useAuth } from "../app/context/AuthContext";
import HomeScreen from "./drawer/(home)";
import RickAndMortyScreen from "./drawer/(rickandmorty)";
import NotesScreen from "./drawer/(notes)";
import PermissionsScreen from "./drawer/(permissions)";
import LocationScreen from "./drawer/(location)";
import GalleryScreen from "./drawer/(gallery)";
import HistoryScreen from "./drawer/(history)";
import ListLocationScreen from "./drawer/(listlocations)";
import Entypo from "@expo/vector-icons/build/Entypo";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FontAwesome5, FontAwesome6, SimpleLineIcons } from "@expo/vector-icons";
import CharactersScreen from "./drawer/(characters)";
import EpisodesScreen from "./drawer/(episodes)";
import LocationsScreen from "./drawer/(locations)";

//import ENotes from "./drawer/(gNotes)"


SplashScreen.preventAutoHideAsync();

const Drawer = createDrawerNavigator();

export default function Layout() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}

function RootLayout() {
  const { isAuthenticated } = useAuth();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null; 
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {isAuthenticated ? <AuthenticatedScreens /> : <UnauthenticatedScreens />}
    </GestureHandlerRootView>
  );
}

function AuthenticatedScreens() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        },
        drawerLabelStyle: {
          color: "#000",
        },
        drawerActiveTintColor: "#2196f3",
        drawerInactiveTintColor: "#444",
      }}
    >
      <Drawer.Screen 
        name="home"
        component={HomeScreen}
        options={{
           title: "Principal",
           drawerIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="rickandmorty"
        component={RickAndMortyScreen}
        options={{
           title: "Rick y Morty",
           drawerIcon: ({ color, size }) => (
            <Entypo name="users" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
      name="characters"
      component={CharactersScreen}
      options={{
        title: "Personajes de Rick y Morty",
        drawerIcon: ({ color, size }) => (
          <FontAwesome6 name="person" size={24} color="black" />
          ),
      }} 
      />
      <Drawer.Screen 
      name="episodes"
      component={EpisodesScreen}
      options={{
        title: "Episodios de Rick y Morty",
        drawerIcon: ({ color, size }) => (
          <FontAwesome5 name="photo-video" size={24} color="black" />
          ),
      }} 
      />
      <Drawer.Screen 
      name="locations"
      component={LocationsScreen}
      options={{
        title: "Ubicaciones de Rick y Morty",
        drawerIcon: ({ color, size }) => (
          <FontAwesome6 name="magnifying-glass-location" size={24} color="black" />
          ),
      }} 
      />
      <Drawer.Screen 
        name="notes"
        component={NotesScreen}
        options={{
           title: "Notas",
           drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="note-edit" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="permissions"
        component={PermissionsScreen}
        options={{
           title: "Permisos de app",
           drawerIcon: ({ color, size }) => (
            <FontAwesome name="check-square" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="gallery"
        component={GalleryScreen}
        options={{
           title: "Galería",
           drawerIcon: ({ color, size }) => (
            <MaterialIcons name="insert-photo" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="location"
        component={LocationScreen}
        options={{
          title: "Ubicación Actual",
          drawerIcon: ({ color, size }) => (
            <Entypo name="location" size={24} color="black" />
           ),
        }} 
      />

      <Drawer.Screen 
        name="history"
        component={HistoryScreen}
        options={{
          title: "Historial de Ubicaciones",
          drawerIcon: ({ color, size }) => (
            <FontAwesome6 name="map-location-dot" size={24} color="black" />
           ),
        }} 
      />
      <Drawer.Screen 
      name="listLocations"
      component={ListLocationScreen}
      options={{
        title: "Lista de Ubicaciones",
        drawerIcon: ({ color, size }) => (
          <Entypo name="list" size={24} color="black" />
          ),
      }} 
      />
    </Drawer.Navigator>
  );
}

function UnauthenticatedScreens() {
  return <Slot />;
}
  