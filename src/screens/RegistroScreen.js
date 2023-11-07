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
  ActivityIndicator,
} from "react-native";
import { COLORS, images } from "../constants";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
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

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.tertiary} />
      </View>
    );

  const validarCampos = async () => {
    const regexLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+$/;
    // Regex para validar solo letras
    const regexNumeros = /^[0-9]+$/; // Regex para validar solo números
    /*     const regexCorreo =
      /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/; */
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

    /*     if (!regexCorreo.test(correo)) {
      Alert.alert("Error", "Ha ingresado un correo inválido");
      console.log(correo);
      return false;
    } */
    // Validar que los campos Nombre y Apellido solo contengan letras
    if (!regexLetras.test(nombre) || !regexLetras.test(apellido)) {
      Alert.alert(
        "Error",
        "Los campos Nombre y Apellido solo deben contener letras"
      );
      return false;
    }
    /*  if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener minimo 6 caracteres");
      return false;
    } */

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
    try {
      const options = {
        method: "GET",
        url: `https://daappserver-production.up.railway.app/api/empleados/getAll`,
      };
      const empleados = await axios.request(options);
      let usuarioConMismaCedula = empleados.data.find(
        (usuario) => usuario.cedula === cedula
      );
      let usuarioConMismoCorreo = empleados.data.find(
        (usuario) => usuario.correo === correo
      );

      if (usuarioConMismaCedula) {
        alert("La cédula ya está en uso");
        return false;
      }

      if (usuarioConMismoCorreo) {
        alert("El correo ya está en uso");
        return false;
      }
    } catch (error) {
      console.log(error);
    }

    return true; // Si todas las validaciones pasan, retorna true
  };

  const confirmarCarga = () => {
    Alert.alert("Confirmación", "¿Estás seguro?", [
      {
        text: "No",
        style: "cancel",
      },
      { text: "Sí", onPress: () => handleSubmit() },
    ]);
  };

  const handleSubmit = async () => {
    if (await validarCampos()) {
      try {
        setLoading(true);
        await createUserWithEmailAndPassword(auth, correo, password);

        await axios.post(
          "https://daappserver-production.up.railway.app/api/empleados/addEmpleado",
          {
            nombre: nombre,
            apellido: apellido,
            cedula: cedula,
            correo: correo,
            telefono: telefono,
            password: password,
          }
        );
      } catch (error) {
        console.log(error);
        setError(error.toString());
        if (
          error.message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          alert("La contraseña debe tener al menos 6 caracteres");
        }
        if (error.message === "Firebase: Error (auth/invalid-email).") {
          Alert.alert("Alert", "Ingrese un correo válido");
        }
      } finally {
        setLoading(false);
      }
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
        <Button title="Registrar cuenta" onPress={confirmarCarga} />
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
