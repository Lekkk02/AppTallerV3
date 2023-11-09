import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  Button,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import axios from "axios";
import { COLORS } from "../constants";
import { useRoute } from "@react-navigation/native";
import SuspendidaCard from "../components/cards/OrdenSuspendida";
import useFetch from "../hook/useFetch";
import GenerarPDF from "../components/generarPDF/generarpdf";
const DefectScreen = () => {
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const itemsPerPage = 10;

  const { data, isLoading, error, refetch } = useFetch("getSuspendidas");

  const currentData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
      .then(() => setRefreshing(false))
      .catch((error) => console.log(error));
  }, []);

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
          ¡No hay ordenes suspendidas!
        </Text>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={currentData}
            keyExtractor={(item) => item.idOrden.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => <SuspendidaCard item={item} />}
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
export default DefectScreen;
