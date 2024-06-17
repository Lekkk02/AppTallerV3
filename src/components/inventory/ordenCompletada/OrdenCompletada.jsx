import { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";

import { SIZES, COLORS } from "../../../constants";

import styles from "./OrdenCompletadaStyle";
import OrdeneCompletadaCard from "../../cards/OrdenCompletada";
import { useNavigation } from "@react-navigation/native";
import useFetch from "../../../hook/useFetch";

const OrdenesCompletadas = () => {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { data, isLoading, error, refetch } = useFetch("getCompletadas");
  const sortedData = data.sort(
    (a, b) => new Date(b.fechaRecepcion) - new Date(a.fechaRecepcion)
  );
  const lastFiveItems = sortedData.slice(0, 5);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
      .then(() => setRefreshing(false))
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ordenes completadas</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(
              "Ordenes",
              { slug: "completadas" },
              { stackPresentation: "replace" }
            );
          }}
        >
          <Text style={styles.headerBtn}>Ver todas</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.tertiary} />
        ) : error ? (
          <Text>¡Hubo un error!</Text>
        ) : (
          <FlatList
            style={{ paddingBottom: 8 }}
            data={lastFiveItems}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => <OrdeneCompletadaCard item={item} />}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            persistentScrollbar
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default OrdenesCompletadas;
