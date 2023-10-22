import { useState, useRef } from "react";
import { COLORS, icons, images, SIZES } from "../constants";

import { View, Text, ScrollView, SafeAreaView, Button } from "react-native";

import {
  OrdenesCompletadas,
  OrdenesEnProceso,
  OrdenEnEspera,
  Bienvenida,
  ScreenHeaderBtn,
} from "../components";

function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Bienvenida />
          <OrdenEnEspera />
          <OrdenesEnProceso />
          <OrdenesCompletadas />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
