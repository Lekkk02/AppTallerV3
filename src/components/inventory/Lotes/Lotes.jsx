import { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from "react-native";

import styles from "./Lotes.style";
import { COLORS, SIZES } from "../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import LotesCard from "../../cards/LotesCard";
import fetchUserData from "../../../hook/fetchUserData";

const Lotes = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [lotes, setLotes] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = await fetchUserData();
        setUserData(user);
      } catch (error) {
        console.log(error);
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      const loadProductData = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken");
          const lotesResponse = await fetch(
            `https://tesis-back.azurewebsites.net/api/inventory/company/${userData.companyID}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const lotesData = await lotesResponse.json();
          setLotes(lotesData.data);
        } catch (error) {
          console.log(error);
        }
      };
      loadProductData();
    }
  }, [userData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
      .then(() => setRefreshing(false))
      .catch((error) => console.log(error));
  }, []);
  if(!lotes){
    return <Text>Cargando...</Text>
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lotes</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(
              "Lotes",
              { stackPresentation: "replace" }
            );
          }}
        >
          <Text style={styles.headerBtn}>Ver todos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {refreshing ? (
          <ActivityIndicator size="large" color={COLORS.tertiary} />
        ) : (
          <FlatList
            style={{ paddingBottom: 8 }}
            data={lotes.slice(0, 5)}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => <LotesCard item={item} />}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            vertical
          />
        )}
      </View>
    </View>
  );
};

export default Lotes;
