import React, { useState } from "react";
import {
  Alert,
  Button,
  TextInput,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import Axios from "axios";

import { SIZES } from "../../constants";

import { useNavigation } from "@react-navigation/native";
import styles from "./crOrden.style";

const Formulario = () => {
  const navigation = useNavigation();
  const [nombreCliente, setnombreCliente] = useState("");
  const [cedulaCliente, setCedula] = useState("");
  const [telefonoCliente, setTelefono] = useState("");
  const [marcaProducto, setMarca] = useState("");
  const [serialProducto, setSerial] = useState("");
  const [tipoProducto, setTipo] = useState("");
  const [nombreProducto, setProducto] = useState("");
  const [direccionCliente, setDireccion] = useState("");
  const [comentarios, setComentarios] = useState("");

  const validarCedula = (cedula) => {
    if (isNaN(cedula)) {
      Alert.alert(
        "ADVERTENCIA",
        "La cédula solamente acepta números, no letras ni espacios"
      );
      return;
    }
    if (cedula.length > 8) {
      Alert.alert("ADVERTENCIA", "Introduzca un número válido de cédula");
      return;
    }

    setCedula(cedula);
  };

  const validarTelefono = (telefono) => {
    if (isNaN(telefono)) {
      Alert.alert(
        "ADVERTENCIA",
        "El número de teléfono solamente acepta números, no letras ni espacios"
      );
      return false;
    }
    if (telefono.length > 11) {
      Alert.alert("ADVERTENCIA", "Introduzca un número de teléfono válido");
    }
    setTelefono(telefono);
    return true;
  };
  const validarFormulario = () => {
    if (!nombreCliente && nombreCliente == "") {
      Alert.alert("ADVERTENCIA", "Ingrese el nombre del Cliente");
      return false;
    }

    if (!cedulaCliente || cedulaCliente == "") {
      Alert.alert("ADVERTENCIA", "Ingrese la cédula del Cliente");
      return false;
    }
    if (!telefonoCliente || telefonoCliente == "") {
      Alert.alert("ADVERTENCIA", "Ingrese telefono del cliente");
      return false;
    }
    if (!marcaProducto || marcaProducto == "") {
      Alert.alert("ADVERTENCIA", "Ingrese marca del equipo");
      return false;
    }
    if (!serialProducto || serialProducto == "") {
      Alert.alert("ADVERTENCIA", "Ingrese serial del equipo");
      return false;
    }
    if (!tipoProducto || tipoProducto == "") {
      Alert.alert("ADVERTENCIA", "Ingrese tipo del equipo");
      return false;
    }
    if (!nombreProducto || nombreProducto == "") {
      Alert.alert("ADVERTENCIA", "Ingrese nombre del equipo");
      return false;
    }
    if (!direccionCliente || direccionCliente == "") {
      Alert.alert("ADVERTENCIA", "Ingrese dirección del cliente");
      return false;
    }

    if (!comentarios || comentarios == "") {
      Alert.alert("ADVERTENCIA", "Ingrese un comentario sobre el producto");
      return false;
    }

    if (comentarios.length > 250) {
      Alert.alert(
        "ADVERTENCIA",
        "El comentario es demasiado largo, máximo se permiten 250 caracteres"
      );
      return false;
    }

    if (nombreCliente.length > 50) {
      Alert.alert(
        "ADVERTENCIA",
        "El nombre es demasiado largo, máximo se permiten 50 caracteres"
      );
      return false;
    }

    if (direccionCliente.length > 250) {
      Alert.alert(
        "ADVERTENCIA",
        "La dirección es demasiado larga, máximo se permiten 250 caracteres"
      );
      return false;
    }

    if (nombreProducto.length > 50) {
      Alert.alert(
        "ADVERTENCIA",
        "El nombre del equipo es demasiado largo, máximo se permiten 50 caracteres"
      );
      return false;
    }

    if (marcaProducto.length > 50) {
      Alert.alert(
        "ADVERTENCIA",
        "La marca del equipo es demasiado larga, máximo se permiten 50 caracteres"
      );
      return false;
    }

    if (serialProducto.length > 50) {
      Alert.alert(
        "ADVERTENCIA",
        "El serial del equipo es demasiado largo, máximo se permiten 50 caracteres"
      );
      return false;
    }

    return true;
  };

  const cargarFormulario = async () => {
    if (validarFormulario()) {
      try {
        const response = await Axios.post(
          "https://daappserver-production.up.railway.app/api/ordenes/addOrden",
          {
            nombreCliente,
            cedulaCliente,
            telefonoCliente,
            direccionCliente,
            tipoProducto,
            marcaProducto,
            nombreProducto,
            serialProducto,
            comentarios,
          }
        );
        if (response.status == 200) {
          navigation.navigate(
            "Orden",
            { id: response.data.idOrden },
            { stackPresentation: "replace" }
          );
          setnombreCliente("");
          setCedula("");
          setDireccion("");
          setMarca("");
          setProducto("");
          setTelefono("");
          setTipo("");
          setSerial("");
          setComentarios("");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const confirmarCarga = () => {
    Alert.alert("Confirmación", "¿Estás seguro?", [
      {
        text: "No",
        style: "cancel",
      },
      { text: "Sí", onPress: () => cargarFormulario() },
    ]);
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <Text style={styles.dataInfo}>DATOS DEL CLIENTE</Text>
          <Text style={styles.labelInput}>Nombre</Text>
          <TextInput
            placeholder="Nombre del cliente"
            value={nombreCliente}
            onChangeText={setnombreCliente}
            style={styles.searchWrapper}
          />
          <Text style={styles.labelInput}>Cédula</Text>
          <TextInput
            placeholder="Cédula del cliente"
            value={cedulaCliente}
            onChangeText={validarCedula}
            style={styles.searchWrapper}
          />
          <Text style={styles.labelInput}>Número de teléfono</Text>

          <TextInput
            placeholder="Número de teléfono del cliente"
            value={telefonoCliente}
            onChangeText={validarTelefono}
            style={styles.searchWrapper}
          />

          <Text style={styles.labelInput}>Dirección</Text>

          <TextInput
            placeholder="Dirección del cliente"
            value={direccionCliente}
            onChangeText={setDireccion}
            style={styles.searchWrapper}
          />
          <Text style={styles.dataInfo}>DATOS DEL EQUIPO</Text>

          <Text style={styles.labelInput}>Equipo</Text>

          <TextInput
            placeholder="Nombre del equipo"
            value={nombreProducto}
            onChangeText={setProducto}
            style={styles.searchWrapper}
          />
          <Text style={styles.labelInput}>Marca</Text>

          <TextInput
            placeholder="Marca del equipo"
            value={marcaProducto}
            onChangeText={setMarca}
            style={styles.searchWrapper}
          />
          <Text style={styles.labelInput}>Serial</Text>

          <TextInput
            placeholder="Serial del equipo"
            value={serialProducto}
            onChangeText={setSerial}
            style={styles.searchWrapper}
          />
          <Text style={styles.labelInput}>Comentario sobre el equipo</Text>

          <TextInput
            placeholder="Comentario..."
            value={comentarios}
            onChangeText={setComentarios}
            style={styles.searchWrapper}
          />
        </View>
      </KeyboardAvoidingView>

      <Text style={{ textAlign: "center", fontSize: SIZES.medium }}>
        Tipo de equipo
      </Text>
      <Picker
        style={styles.searchWrapper}
        selectedValue={tipoProducto}
        onValueChange={(itemValue, itemIndex) => setTipo(itemValue)}
      >
        <Picker.Item label="SELECCIONE TIPO" value="" />
        <Picker.Item label="Aire Acondicionado" value="Aire Acondicionado" />
        <Picker.Item label="Lavadora" value="Lavadora" />
        <Picker.Item label="Microondas" value="Microondas" />
        <Picker.Item label="Nevera" value="Nevera" />
        <Picker.Item label="Congelador" value="Congelador" />
        <Picker.Item label="Heladera" value="Heladera" />
        <Picker.Item label="Horno" value="Horno" />
        <Picker.Item label="Lavaplatos" value="Lavaplatos" />
        <Picker.Item label="Calefactor" value="Calefactor" />
        <Picker.Item label="Secadora" value="Secadora" />
        <Picker.Item label="Campana Extractora" value="Campana Extractora" />
      </Picker>

      <TouchableOpacity
        value="Cargar"
        style={styles.boton}
        onPress={confirmarCarga}
      >
        <Text style={styles.botonText}>CREAR ORDEN</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Formulario;
