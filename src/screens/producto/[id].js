import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  Button,
  FlatList,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants";
import styles from "./verProducto.styles";
import GenerarPDF from "../../components/generarPDF/generarpdf";
import GenerarQR from "../../components/generarQr/generarQR";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LotesCard from "../../components/cards/LotesCard";

const ProductoScreen = () => {
  const route = useRoute();
  const id = route?.params?.id;
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState("");
  const [inventory, setInventory] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");

      const response = await fetch(
        `https://tesis-back.azurewebsites.net/api/product/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const productD = await response.json();
      setProduct(productD.data);
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const fetchInventory = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");

      const response = await fetch(
        `https://tesis-back.azurewebsites.net/api/inventory/product/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const inventoryD = await response.json();
      setInventory(inventoryD.data);
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [product]);

  useEffect(() => {
    fetchData();
    fetchInventory();
  }, [fetchData]);

  const updateProductStatus = async (status, comments = "") => {
    /*  try {
      const response = await axios.put(
        `http://192.168.31.98:3001/api/products/${id}`,
        { status, comments }
      );

      if (response.status === 200) {
        fetchData();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log("Hubo un problema con la petición Fetch: " + error.message);
    } */
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : product ? (
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.upc}>UPC: {product.upc}</Text>
          </View>
          <View style={{ flex: 2 }}>
            {!inventory ? (
              <ActivityIndicator size="large" color={COLORS.tertiary} />
            ) : (
              <>
                <Text style={styles.lotes}>
                  Lotes en inventario: {product.lotes}
                </Text>
                <FlatList
                  style={{ paddingBottom: 2 }}
                  data={inventory}
                  renderItem={({ item }) => <LotesCard item={item} />}
                  keyExtractor={(item, index) => index.toString()}
                  contentContainerStyle={{ paddingVertical: SIZES.medium }}
                />
              </>
            )}
          </View>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <GenerarQR typeID={`product:${id}`} />
          </View>
        </View>
      ) : (
        <Text style={styles.noDataText}>¡No se ha encontrado el producto!</Text>
      )}
    </SafeAreaView>
  );
};

export default ProductoScreen;
