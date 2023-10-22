import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  Button,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { COLORS, icons } from "../../constants";

import axios from "axios";
import { useRoute } from "@react-navigation/native";
import OrdenesEnEsperaCard from "../../components/cards/OrdenEspera";

const Page = () => {
  const route = useRoute();
  const slug = route?.params?.slug;
  if (!slug)
    return (
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 300,
        }}
      >
        ¡No se ha realizado ninguna búsqueda!
      </Text>
    );

  const [searchString, setSearchString] = useState(slug);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [data, setData] = useState([]);
  const [filteredData, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Añadir estados para los filtros
  const [estado, setEstado] = useState("");
  const [orden, setOrden] = useState("");
  const [tipo, setTipo] = useState("");

  const fetchData = async (search) => {
    setIsLoading(true);
    try {
      const options = {
        method: "GET",
        url: `https://daappserver-production.up.railway.app/api/ordenes/getAllOrdenes`,
      };
      const response = await axios.request(options);
      setData(response.data);
      let x = response.data.filter((item) =>
        item.nombreProducto.toLowerCase().includes(search.toLowerCase())
      );

      // Aplicar filtros a los datos
      if (estado) {
        x = x.filter((item) => item.estadoOrden === estado);
      }
      if (tipo) {
        x = x.filter((item) => item.tipoProducto === tipo);
      }
      if (orden === "Más antiguos primero") {
        x.sort(
          (a, b) => new Date(a.fechaRecepcion) - new Date(b.fechaRecepcion)
        );
      } else if (orden === "Más recientes primero") {
        x.sort(
          (a, b) => new Date(b.fechaRecepcion) - new Date(a.fechaRecepcion)
        );
      }

      setFiltered(x);
    } catch (error) {
      setError(error.message); // Guardamos el mensaje de error en lugar del objeto error completo
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(slug);
  }, [slug, estado, orden, tipo]); // Añadir filtros a las dependencias

  const currentData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Estado:</Text>
        <Picker
          selectedValue={estado}
          onValueChange={(itemValue) => setEstado(itemValue)}
          style={{ height: 50, width: "100%" }}
        >
          <Picker.Item label="PREDETERMINADO" value="" />

          <Picker.Item label="EN PROCESO" value="EN PROCESO" />
          <Picker.Item label="EN ESPERA" value="EN ESPERA" />
          <Picker.Item label="COMPLETADA" value="COMPLETADA" />
        </Picker>
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Orden:</Text>
        <Picker
          selectedValue={orden}
          onValueChange={(itemValue) => setOrden(itemValue)}
          style={{ height: 50, width: "100%" }}
        >
          <Picker.Item label="PREDETERMINADO" value="" />

          <Picker.Item
            label="Más antiguos primero"
            value="Más antiguos primero"
          />
          <Picker.Item
            label="Más recientes primero"
            value="Más recientes primero"
          />
        </Picker>
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Tipo:</Text>
        <Picker
          selectedValue={tipo}
          onValueChange={(itemValue) => setTipo(itemValue)}
          style={{ height: 50, width: "100%" }}
        >
          <Picker.Item label="PREDETERMINADO" value="" />

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
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.tertiary} />
      ) : error ? (
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            verticalAlign: "middle",
            height: "100%",
          }}
        >
          ¡Hubo un error!
        </Text>
      ) : data.length == 0 ? (
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            textAlign: "center",
            verticalAlign: "middle",
            height: "100%",
          }}
        >
          ¡No hay más ordenes!
        </Text>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={currentData}
            keyExtractor={(item) => item.idOrden.toString()}
            renderItem={({ item }) => <OrdenesEnEsperaCard item={item} />}
          />
          <Button
            title="Página anterior"
            onPress={() => setPage(page > 1 ? page - 1 : page)}
          />
          <Button
            title="Siguiente página"
            onPress={() =>
              setPage(
                page < filteredData.length / itemsPerPage ? page + 1 : page
              )
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};
export default Page;
