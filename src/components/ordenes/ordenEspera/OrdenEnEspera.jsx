import { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from "react-native";

import styles from "./OrdenEnEsperaStyle";
import { COLORS, SIZES } from "../../../constants";

import { useNavigation } from "@react-navigation/native";
import OrdenesEnEsperaCard from "../../cards/OrdenEspera";
import useFetch from "../../../hook/useFetch";

const OrdenEnEspera = () => {
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, error, refetch } = useFetch("getEspera");

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
        <Text style={styles.headerTitle}>Ordenes en espera</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(
              "Ordenes",
              { slug: "en espera" },
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
            renderItem={({ item }) => <OrdenesEnEsperaCard item={item} />}
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

export default OrdenEnEspera;
