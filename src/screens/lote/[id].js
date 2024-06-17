import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import styles from "./verLote.styles";
import GenerarQR from "../../components/generarQr/generarQR";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoteScreen = () => {
  const route = useRoute();
  const id = route?.params?.id;
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [expedirCantidad, setExpedirCantidad] = useState("");
  const [userId, setUserId] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");

      const response = await fetch(
        `https://tesis-back.azurewebsites.net/api/inventory/${id}`,
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

      const userResponse = await fetch(
        `https://tesis-back.azurewebsites.net/api/users/me`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = await userResponse.json();
      setUserId(userData.user.userID);
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleExpedirSubmit = async () => {
    if (expedirCantidad > 0 && expedirCantidad <= product.quantity && userId) {
      const newQuantity = product.quantity - expedirCantidad;

      try {
        const token = await AsyncStorage.getItem("authToken");

        await fetch(
          `https://tesis-back.azurewebsites.net/api/inventory/${product.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              companyId: product.companyId,
              batchId: product.batchId,
              productId: product.productId,
              dueDate: product.dueDate,
              price: product.price,
              quantity: newQuantity,
              quantityMin: product.quantityMin,
            }),
          }
        );

        await fetch(`https://tesis-back.azurewebsites.net/api/registry`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            companyId: product.companyId,
            productId: product.productId,
            userId: userId,
            quantity: expedirCantidad,
            date: new Date().toISOString(),
          }),
        });

        setProduct({ ...product, quantity: newQuantity });
        setExpedirCantidad("");
        setModalVisible(false);
        Alert.alert("Éxito", "La cantidad ha sido expedida correctamente.");
      } catch (error) {
        console.error("Error updating lot data:", error);
        Alert.alert("Error", "Hubo un error al expedir la cantidad.");
      }
    } else {
      Alert.alert("Error", "Cantidad no válida o Usuario no identificado.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : product ? (
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>{product.name}</Text>
              <Text style={styles.description}>{product.description}</Text>
              <Text style={styles.upc}>UPC: {product.upc}</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.loteInfo}>
              <Text style={styles.infoTitle}>Información del Lote</Text>
              <Text style={styles.infoText}>
                ID del Lote: {product.batchId}
              </Text>
              <Text style={styles.infoText}>Cantidad: {product.quantity}</Text>
              <Text style={styles.infoText}>
                Fecha de Vencimiento: {product.dueDate}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.qrButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.qrButtonText}>Expedir salida</Text>
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TextInput
                    style={styles.modalInput}
                    onChangeText={setExpedirCantidad}
                    value={expedirCantidad}
                    placeholder="Cantidad a expedir"
                    keyboardType="numeric"
                  />
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 12,
                      gap: 24,
                    }}
                  >
                    <Button
                      title="Cancelar"
                      onPress={() => setModalVisible(false)}
                      color={"red"}
                    />
                    <Button
                      title="Expedir"
                      onPress={handleExpedirSubmit}
                      color={COLORS.warning}
                    />
                  </View>
                </View>
              </View>
            </Modal>

            <View>
              <GenerarQR typeID={`lot:${id}`} />
            </View>
          </View>
        ) : (
          <Text style={styles.noDataText}>
            ¡No se ha encontrado el producto!
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoteScreen;
