import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./LotesStyle.style";

const LotesCard = ({ item }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(
      "Lote",
      { id: item.id },
      { stackPresentation: "replace" }
    );
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.touchable}>
      <View style={styles.container}>
        <Text style={styles.loteName}>{item.name}</Text>
        <Text style={styles.loteDescription}>
          {item.description.slice(0, 50)}...
        </Text>
        <Text style={styles.productUPC}>UPC: {item.upc}</Text>
        <Text style={styles.productDetails}>
          Due Date: {item.dueDate} | Price: ${item.price} | Quantity:{" "}
          {item.quantity} | Min Quantity: {item.quantityMin}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LotesCard;
