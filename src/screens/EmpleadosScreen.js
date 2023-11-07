import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, Button } from "react-native";
import axios from "axios";
import { COLORS, images } from "../constants";
import GemerarPDF from "../components/generarPDF/generarpdfEmpleados";

const EmpleadoCard = ({ empleado }) => (
  <View style={styles.card}>
    <Image style={styles.image} source={images.profile} />
    <View style={styles.infoContainer}>
      <Text style={styles.id}>ID: {empleado.id}</Text>
      <Text style={styles.name}>
        {empleado.nombre} {empleado.apellido}
      </Text>
      <Text style={styles.email}>{empleado.correo}</Text>
      <Text style={styles.phone}> {empleado.cedula}</Text>
      <Text style={styles.phone}> {empleado.telefono}</Text>
    </View>
  </View>
);

const App = () => {
  const [empleados, setEmpleados] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://daappserver-production.up.railway.app/api/empleados/getAll"
      );
      setEmpleados(result.data);
    };

    fetchData();
  }, []);

  const currentData = empleados.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={currentData}
        renderItem={({ item }) => <EmpleadoCard empleado={item} />}
        keyExtractor={(item) => item.id}
      />
      <Button
        title="Siguiente página"
        onPress={() =>
          setPage(page < empleados.length / itemsPerPage ? page + 1 : page)
        }
      />
      <Button
        title="Página anterior"
        onPress={() => setPage(page > 1 ? page - 1 : page)}
      />
      <GemerarPDF items={empleados} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    margin: 10,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 25,
    marginRight: "auto",
    alignSelf: "center",
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  email: {
    alignSelf: "center",
    fontStyle: "italic",
    fontSize: 16,
  },
  id: {
    fontSize: 14,
    color: "#aaa",
    marginLeft: "auto",
  },
  phone: {
    alignSelf: "center",

    fontSize: 16,
  },
});

export default App;
