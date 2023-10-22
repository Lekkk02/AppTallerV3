import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { COLORS, icons, images, SIZES } from "../constants";
import { ScreenHeaderBtn } from "../components";
import Formulario from "../components/crearOrden/crOrden";
function CrearScreen() {
  return (
    <SafeAreaView>
      <Formulario />
    </SafeAreaView>
  );
}

export default CrearScreen;
