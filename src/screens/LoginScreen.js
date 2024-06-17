import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { images, COLORS } from "../constants";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn } = useContext(AuthContext);

  const handleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://tesis-back.azurewebsites.net/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
          credentials: "include",
        }
      );

      if (res.status === 200) {
        const data = await res.json();

        if (data.token) {
          // Almacena el token en AsyncStorage y actualiza el estado de autenticación
          await signIn(data.token);
        } else {
          setError("Token no encontrado en la respuesta");
        }
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Error desconocido");
      }
    } catch (error) {
      console.error("Error de autenticación", error);
      setError("Error de red o de servidor");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.tertiary} />
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={images.profile} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error !== "" && <Text style={styles.error}>{error}</Text>}
      <Button title="Iniciar sesión" onPress={handleSignIn} />
      <Text
        style={{
          fontStyle: "italic",
          alignSelf: "center",
          marginTop: 15,
        }}
      >
        ¿Olvidó su contraseña? Contacte con soporte técnico.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default LoginScreen;
