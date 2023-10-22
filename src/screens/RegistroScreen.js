import React, { useState } from "react";

import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { images } from "../constants";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const Registro = () => {
  const auth = FIREBASE_AUTH;
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );
      console.log(response);
    } catch (error) {
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <Text>Cargando...</Text>;

  const validarCampos = () => {
    const regexLetras = /^[A-Za-z]+$/; // Regex para validar solo letras
    const regexNumeros = /^[0-9]+$/; // Regex para validar solo números

    // Validar que los campos no estén vacíos ni contengan solo espacios
    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !cedula.trim() ||
      !correo.trim() ||
      !password.trim() ||
      !confirmarPassword.trim() ||
      !telefono.trim()
    ) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return false;
    }

    // Validar que los campos Nombre y Apellido solo contengan letras
    if (!regexLetras.test(nombre) || !regexLetras.test(apellido)) {
      Alert.alert(
        "Error",
        "Los campos Nombre y Apellido solo deben contener letras"
      );
      return false;
    }

    if (password !== confirmarPassword) {
      Alert.alert(
        "Error",
        "La contraseña y la confirmación de la contraseña deben ser iguales"
      );
      return false;
    }

    // Validar que los campos cedula y telefono solo contengan números
    if (!regexNumeros.test(cedula) || !regexNumeros.test(telefono)) {
      Alert.alert(
        "Error",
        "Los campos Cédula y Teléfono solo deben contener números"
      );
      return false;
    }

    return true; // Si todas las validaciones pasan, retorna true
  };

  const handleSubmit = () => {
    if (validarCampos()) {
      console.log("Pass");
    } else {
      console.log("No");
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={images.profile} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            style={{ ...styles.input, flex: 1, marginRight: 8 }}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={{ ...styles.input, flex: 1, marginLeft: 8 }}
            placeholder="Apellido"
            value={apellido}
            onChangeText={setApellido}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Cédula"
          value={cedula}
          onChangeText={setCedula}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo"
          value={correo}
          onChangeText={setCorreo}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Contraseña"
          value={confirmarPassword}
          onChangeText={setConfirmarPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={telefono}
          onChangeText={setTelefono}
        />
        {error !== "" ? <Text>{error}</Text> : null}
        <Button title="Registrar cuenta" onPress={handleSubmit} />
      </KeyboardAvoidingView>
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

export default Registro;
