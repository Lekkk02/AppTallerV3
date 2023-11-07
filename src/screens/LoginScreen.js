import React, { useState } from "react";
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
import { images, COLORS } from "../constants";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
const LoginScreen = () => {
  const auth = FIREBASE_AUTH;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      console.log(response);
    } catch (error) {
      alert("Credenciales incorrecta o no se han ingresado credenciales");
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
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error !== "" ? <Text>{error}</Text> : null}
      <Button title="Iniciar sesión" onPress={signIn} />
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
});

export default LoginScreen;
