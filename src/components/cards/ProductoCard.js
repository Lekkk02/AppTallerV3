import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./ProductoStyle.style";

const ProductoCard = ({ item }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(
      "Producto",
      { id: item.id },
      { stackPresentation: "replace" }
    );
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>
          {item.description.slice(0, 30)}...
        </Text>
        <Text style={styles.productUPC}>{item.upc}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductoCard;
