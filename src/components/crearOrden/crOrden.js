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
      alert("La cédula deben ser números");
      return;
    }
    if (cedula.length > 8) {
      alert("Introduzca un número válido de cédula");
      return;
    }

    setCedula(cedula);
  };

  const validarTelefono = (telefono) => {
    if (isNaN(telefono)) {
      alert("El número de teléfono deben ser números");
      return false;
    }
    setTelefono(telefono);
    return true;
  };
  const validarFormulario = () => {
    if (!nombreCliente && nombreCliente == "") {
      alert("Ingrese el nombre del Cliente");
      return false;
    }

    if (!cedulaCliente || cedulaCliente == "") {
      alert("Ingrese la cédula del Cliente");
      return false;
    }
    if (!telefonoCliente || telefonoCliente == "") {
      alert("Ingrese telefono del cliente");
      return false;
    }
    if (!marcaProducto || marcaProducto == "") {
      alert("Ingrese marca del equipo");
      return false;
    }
    if (!serialProducto || serialProducto == "") {
      alert("Ingrese serial del equipo");
      return false;
    }
    if (!tipoProducto || tipoProducto == "") {
      alert("Ingrese tipo del equipo");
      return false;
    }
    if (!nombreProducto || nombreProducto == "") {
      alert("Ingrese nombre del equipo");
      return false;
    }
    if (!direccionCliente || direccionCliente == "") {
      alert("Ingrese telefono del cliente");
      return false;
    }

    if (!comentarios || comentarios == "") {
      alert("Ingrese un comentario sobre el producto");
      return false;
    }

    if (comentarios.length > 250) {
      alert(
        "El comentario es demasiado largo, máximo se permiten 250 caracteres"
      );
      return;
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
