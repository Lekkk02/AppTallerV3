import React, { useEffect, useState } from "react";
import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native";

import { icons, images } from "./src/constants";
import { useNavigation } from "@react-navigation/native";
// Importa tus pantallas aquí
import HomeScreen from "./src/screens/HomeScreen";
import RegistroScreen from "./src/screens/RegistroScreen";
import CrearOrdenScreen from "./src/screens/CrearOrdenScreen";
import OrdenesAllScreen from "./src/screens/ordenes/[slug]";
import OrdenScreen from "./src/screens/orden/[id]";
import OrdenesScreen from "./src/screens/ordenes/[slug]";
import BusquedaScreen from "./src/screens/search/[slug]";
import ScanScreen from "./src/screens/ScanScreen";
import LoginScreen from "./src/screens/LoginScreen";
import CerrarSesionScreen from "./src/screens/CerrarScreen";
import EmpleadosScreen from "./src/screens/EmpleadosScreen";
import { ScreenHeaderBtn } from "./src/components";
import { signOut } from "firebase/auth";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color, fontSize: focused ? 16 : 14 }}>Inicio</Text> // Cambia el tamaño del texto aquí
          ),
        }}
      />
      <Tab.Screen
        name="CrearOrden"
        component={CrearOrdenScreen}
        options={{
          tabBarIcon: () => <Ionicons name="create" size={24} color="black" />,
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color, fontSize: focused ? 16 : 14 }}>
              Crear orden
            </Text> // Cambia el tamaño del texto aquí
          ),
        }}
      />
      <Tab.Screen
        name="VerEmpleados"
        component={EmpleadosScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons name="people-circle" size={24} color="black" />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color, fontSize: focused ? 16 : 14 }}>
              Ver empleados
            </Text> // Cambia el tamaño del texto aquí
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AuthTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="LoginTab"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color, fontSize: focused ? 16 : 14 }}>Inicio</Text> // Cambia el tamaño del texto aquí
          ),
        }}
      />
      <Tab.Screen
        name="RegistroTab"
        component={RegistroScreen}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="create" size={24} color="black" />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color, fontSize: focused ? 16 : 14 }}>
              Crear orden
            </Text> // Cambia el tamaño del texto aquí
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  const auth = FIREBASE_AUTH;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{
              headerTitleAlign: "center",
              header: ({ navigation }) => (
                <SafeAreaView
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 48,
                    marginHorizontal: 10,
                    marginBottom: 12,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      signOut(auth);
                    }}
                  >
                    <SimpleLineIcons name="logout" size={40} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Escanear");
                    }}
                  >
                    <MaterialCommunityIcons
                      name="qrcode-scan"
                      size={40}
                      color="black"
                    />
                  </TouchableOpacity>
                </SafeAreaView>
              ),
            }}
          />
          <Stack.Screen name="Orden" component={OrdenScreen} />
          <Stack.Screen name="Ordenes" component={OrdenesScreen} />
          <Stack.Screen name="Busqueda" component={BusquedaScreen} />
          <Stack.Screen name="Escanear" component={ScanScreen} />
          <Stack.Screen name="CerrarSesion" component={CerrarSesionScreen} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="LoginTab"
            component={LoginScreen}
            options={{
              tabBarIcon: () => <Entypo name="login" size={24} color="black" />,
              tabBarLabel: ({ focused, color }) => (
                <Text style={{ color, fontSize: focused ? 16 : 14 }}>
                  Iniciar sesión
                </Text> // Cambia el tamaño del texto aquí
              ),
            }}
          />
          <Tab.Screen
            name="RegistroTab"
            component={RegistroScreen}
            options={{
              tabBarIcon: () => (
                <MaterialIcons name="create" size={24} color="black" />
              ),
              tabBarLabel: ({ focused, color }) => (
                <Text style={{ color, fontSize: focused ? 16 : 14 }}>
                  Registrar usuario
                </Text> // Cambia el tamaño del texto aquí
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default App;
