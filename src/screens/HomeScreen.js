import { useState, useRef } from "react";
import { COLORS, icons, images, SIZES } from "../constants";

import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Button,
  FlatList,
} from "react-native";

import {
  OrdenesCompletadas,
  Lotes,
  Productos,
  Bienvenida,
  ScreenHeaderBtn,
} from "../components";

function HomeScreen() {
  const data = [
    { key: "Bienvenida", component: <Bienvenida /> },
    { key: "Productos", component: <Productos /> },
    { key: "Lotes", component: <Lotes /> },
  ];
  const renderItem = ({ item }) => {
    return <View style={{ marginBottom: 2 }}>{item.component}</View>;
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ padding: SIZES.medium }}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;
