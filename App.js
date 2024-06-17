import React, { useContext } from "react";
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
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "./src/constants";
import { AuthContext, AuthProvider } from "./src/context/AuthContext";

import HomeScreen from "./src/screens/HomeScreen";
import LoteScreen from "./src/screens/lote/[id]";
import ProductoScreen from "./src/screens/producto/[id]";
import LotesScreen from "./src/screens/lotes";
import BusquedaScreen from "./src/screens/search/[slug]";
import ScanScreen from "./src/screens/ScanScreen";
import LoginScreen from "./src/screens/LoginScreen";
import CerrarSesionScreen from "./src/screens/CerrarScreen";
import ProductosScreen from "./src/screens/productos";
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
            <Text style={{ color, fontSize: focused ? 16 : 14 }}>Inicio</Text>
          ),
          tabBarStyle: { paddingTop: 6, paddingBottom: 2 },
        }}
      />
      {/*  <Tab.Screen
        name="CrearOrden"
        component={CrearOrdenScreen}
        options={{
          tabBarIcon: () => <Ionicons name="create" size={24} color="black" />,
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color, fontSize: focused ? 16 : 14 }}>
              Crear orden
            </Text>
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
              Empleados
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Defectuosas"
        component={DefectuosasScreen}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="report-problem" size={24} color="black" />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color, fontSize: focused ? 16 : 14 }}>
              Suspendidas
            </Text>
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

function App() {
  const { isLoggedIn, loading, signOut } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.tertiary} />
      </View>
    );
  }

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
                    marginTop: 16,
                    marginHorizontal: 10,
                    marginBottom: 12,
                  }}
                >
                  <TouchableOpacity onPress={signOut}>
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
          <Stack.Screen name="Producto" component={ProductoScreen} />
          <Stack.Screen name="Lote" component={LoteScreen} />
          <Stack.Screen name="Productos" component={ProductosScreen} />
          <Stack.Screen name="Lotes" component={LotesScreen} />
          <Stack.Screen name="Busqueda" component={BusquedaScreen} />
          <Stack.Screen name="Escanear" component={ScanScreen} />
          <Stack.Screen name="CerrarSesion" component={CerrarSesionScreen} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarIconStyle: { display: "none" },
          }}
        >
          <Tab.Screen
            name="LoginTab"
            component={LoginScreen}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
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

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
