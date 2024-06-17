import { useState, useEffect } from "react";
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

import fetchUserData from "../../hook/fetchUserData";

import { icons, SIZES } from "../../constants";

const Bienvenida = () => {
  const [busqueda, setBusqueda] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [userData, setUserData] = useState(null)
  const navigation = useNavigation();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = await fetchUserData();
        console.log(user)
        setUserData(user);
      } catch (error) {
        console.log(error)
      } 
      
    };

    loadUserData();
  }, []);

  if(!userData){
    return(<Text>Cargando...</Text>)
  }
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Bienvenido, <Text style= {{fontWeight:"bold"}}>{userData.name}</Text></Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={busqueda}
            onChangeText={setBusqueda}
            placeholder="¿Qué lote estás buscando?"
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
