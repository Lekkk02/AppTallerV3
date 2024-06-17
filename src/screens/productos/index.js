import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import ProductoCard from "../../components/cards/ProductoCard";
import fetchUserData from "../../hook/fetchUserData";
import { COLORS, SIZES } from "../../constants";

const Productos = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
      loadProductData();
    }
  }, [userData]);

  const loadProductData = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
      const productsResponse = await fetch(
        `https://tesis-back.azurewebsites.net/api/product/batch/${userData.companyID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const productData = await productsResponse.json();
      setProducts(productData.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadProductData().then(() => setRefreshing(false));
  }, [userData]);

  const paginate = (products, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);
  };

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Productos</Text>
      </View>
      <View style={styles.cardsContainer}>
        {refreshing || loading ? (
          <ActivityIndicator size="large" color={COLORS.tertiary} />
        ) : (
          <>
            <FlatList
              style={{ paddingBottom: 8 }}
              data={paginate(products, currentPage, itemsPerPage)}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              renderItem={({ item }) => <ProductoCard item={item} />}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingBottom: 20 }}
              persistentScrollbar
              horizontal={false}
            />
            <View style={styles.paginationContainer}>
              <TouchableOpacity
                onPress={handlePrevPage}
                disabled={currentPage === 1}
                style={[
                  styles.paginationButtonAnterior,
                  currentPage === 1 && styles.disabledButton,
                ]}
              >
                <Text style={styles.paginationButtonText}>Anterior</Text>
              </TouchableOpacity>
              <Text style={styles.paginationText}>{currentPage}</Text>
              <TouchableOpacity
                onPress={handleNextPage}
                disabled={currentPage * itemsPerPage >= products.length}
                style={[
                  styles.paginationButton,
                  currentPage * itemsPerPage >= products.length &&
                    styles.disabledButton,
                ]}
              >
                <Text style={styles.paginationButtonText}>Siguiente</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.medium,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    color: COLORS.secondary,
  },
  cardsContainer: {
    flex: 1,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SIZES.small,
  },
  paginationButton: {
    padding: SIZES.small,
    backgroundColor: "#0595e3",
    borderRadius: 6,
    marginHorizontal: SIZES.small,
  },
  paginationButtonAnterior: {
    padding: SIZES.small,
    backgroundColor: "#292626",
    borderRadius: 6,
    marginHorizontal: SIZES.small,
  },
  paginationButtonText: {
    color: COLORS.white,
  },
  disabledButton: {
    backgroundColor: COLORS.gray,
  },
  paginationText: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
});

export default Productos;
