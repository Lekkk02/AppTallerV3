import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";

import styles from "./OrdenEsperaStyle.style";

const OrdenesEnEsperaCard = ({ item }) => {
  const navigation = useNavigation();

  const {
    idOrden,
    nombreCliente,
    tipoProducto,
    marcaProducto,
    nombreProducto,
    serialProducto,
    estadoOrden,
    fechaRecepcion,
  } = item;
  const handlePress = () => {
    navigation.navigate(
      "Orden",
      { id: idOrden },
      { stackPresentation: "replace" }
    );
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.jobName}>{nombreProducto}</Text>
        <Text style={styles.client_name}>{nombreCliente}</Text>
        <Text style={styles.fecha}>{fechaRecepcion}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrdenesEnEsperaCard;
