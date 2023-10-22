import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { COLORS } from "../../constants";
import { useRoute } from "@react-navigation/native";
import EsperaCard from "../../components/cards/OrdenEspera";

import GenerarPDF from "../../components/generarPDF/generarpdf";
const Page = () => {
  const route = useRoute();
  const slug = route?.params?.slug;
  const [page, setPage] = useState(1);

  if (!slug) {
    return (
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 300,
        }}
      >
        ¡No ha buscado ordenes por estado!
      </Text>
    );
  }
  const itemsPerPage = 10;
  let endpoint;
  let tit;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  switch (slug) {
    case "completadas":
      endpoint = "getCompletadas";
      tit = "COMPLETADAS";
      break;
    case "en proceso":
      endpoint = "getProceso";
      tit = "EN PROCESO";
      break;
    case "en espera":
      endpoint = "getEspera";
      tit = "EN ESPERA";
      break;
  }

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const options = {
        method: "GET",
        url: `https://daappserver-production.up.railway.app/api/ordenes/${endpoint}`,
      };
      const response = await axios.request(options);
      setData(response.data);
    } catch (error) {
      setError(error.message); // Guardamos el mensaje de error en lugar del objeto error completo
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  const currentData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  console.log(endpoint);
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            renderItem={({ item }) => <EsperaCard item={item} />}
          />
          <Button
            title="Siguiente página"
            onPress={() =>
              setPage(page < data.length / itemsPerPage ? page + 1 : page)
            }
          />
          <Button
            title="Página anterior"
            onPress={() => setPage(page > 1 ? page - 1 : page)}
          />
          <View style={{ paddingVertical: 12 }}>
            <GenerarPDF items={data} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
export default Page;
