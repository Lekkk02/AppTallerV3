import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import styles from "./welcome.style";
import { useNavigation } from "@react-navigation/native";

import { icons, SIZES } from "../../constants";

const Bienvenida = () => {
  const [busqueda, setBusqueda] = useState("");
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Bienvenido... </Text>
        <Text style={styles.welcomeMessage}>¡Gestiona tu taller aquí!</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={busqueda}
            onChangeText={setBusqueda}
            placeholder="¿Qué equipo buscas?"
          />
        </View>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => {
            if (busqueda && busqueda.trim() !== "") {
              navigation.navigate(
                "Busqueda",
                { slug: busqueda },
                { stackPresentation: "replace" }
              );
            }
            setBusqueda("");
          }}
        >
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Bienvenida;
