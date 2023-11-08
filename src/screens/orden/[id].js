import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Button,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import styles from "./verOrden.styles";
import GenerarPDF from "../../components/generarPDF/generarpdf";
import GenerarQR from "../../components/generarQr/generarQR";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
const Home = () => {
  const auth = FIREBASE_AUTH;
  const email = auth?.currentUser?.email;

  const route = useRoute();
  const id = route?.params?.id;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState("");
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const options = {
        method: "GET",
        url: `https://daappserver-production.up.railway.app/api/ordenes/${id}`,
      };
      const response = await axios.request(options);
      setData(response.data);
    } catch (error) {
      setError(error.message); // Guardamos el mensaje de error en lugar del objeto error completo
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <SafeAreaView>
      <ScrollView>
        {!data ? (
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              marginVertical: 300,
            }}
          >
            ¡No se ha visitado ninguna orden!
          </Text>
        ) : isLoading ? (
          <ActivityIndicator size="large" color={COLORS.tertiary} />
        ) : error ? (
          <Text style={{ textAlign: "center" }}>{error}</Text>
        ) : (
          <View style={styles.containerOrden}>
            <Text style={styles.tituloOrden}>{data.nombreProducto}</Text>
            <Text style={styles.modeloOrden}>{data.marcaProducto}</Text>
            <Text style={styles.serialOrden}>{data.tipoProducto}</Text>
            <Text style={styles.serialOrden}>
              SERIAL: {data.serialProducto}
            </Text>
            <Text style={styles.subtituloOrden}>COMENTARIOS DEL EQUIPO</Text>
            <Text style={styles.serialOrden}>{data.comentarios}</Text>
            <Text style={styles.fechaRecepcion}>
              Recibido en la fecha: {data.fechaRecepcion}
            </Text>
            <View
              style={{
                borderBottomColor: "#C1C0C8",
                borderBottomWidth: 1,
              }}
            />

            <Text style={styles.nombreCliente}>
              Teléfono del cliente: {data.telefonoCliente}
            </Text>
            <Text style={styles.nombreCliente}>
              Dirección del cliente: {data.direccionCliente}{" "}
            </Text>
            {data.estadoOrden == "COMPLETADA" ? (
              <View>
                <Text style={styles.estadoOrdenCompletada}>
                  {data.estadoOrden}
                </Text>
                <GenerarPDF items={data} />
              </View>
            ) : data.estadoOrden == "EN PROCESO" ? (
              <View>
                <Text style={styles.estadoOrdenEnProceso}>
                  {data.estadoOrden}
                </Text>

                <Button
                  title="MARCAR ORDEN COMO COMPLETADA"
                  onPress={async () => {
                    try {
                      const options = {
                        method: "GET",
                        url: `https://daappserver-production.up.railway.app/api/empleados/${email}`,
                      };
                      const empResponse = await axios.request(options);
                      let nombreCompleto =
                        empResponse.data.nombre +
                        " " +
                        empResponse.data.apellido;
                      let response = await fetch(
                        `https://daappserver-production.up.railway.app/api/ordenes/${id}`,
                        {
                          method: "PUT",
                          headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            estadoOrden: "COMPLETADA",
                            completadoPor: nombreCompleto,
                          }),
                        }
                      );

                      if (!response.ok) {
                        throw new Error(
                          `HTTP error! status: ${response.status}`
                        );
                      } else {
                        await fetchData();
                      }
                    } catch (error) {
                      console.log(
                        "Hubo un problema con la petición Fetch: " +
                          error.message
                      );
                    }
                  }}
                />
                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    alignSelf: "center",
                    alignItems: "center",
                    borderRadius: 50,
                  }}
                  onPress={() => setModalVisible(true)}
                >
                  <MaterialIcons name="report-problem" size={42} color="red" />
                  <Text style={{ fontWeight: "bold" }}>SUSPENDER ORDEN</Text>
                </TouchableOpacity>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <AntDesign name="close" size={24} color="black" />
                      </TouchableOpacity>
                      <TextInput
                        style={styles.modalText}
                        onChangeText={(text) => setInputText(text)}
                        value={inputText}
                        placeholder="Ingrese el motivo de la suspensión"
                      />
                      <Button
                        title="Aceptar"
                        onPress={async () => {
                          setModalVisible(!modalVisible);
                          // Aquí puedes usar inputText en tu fetch
                          await RequestSuspender(inputText);
                        }}
                      />
                    </View>
                  </View>
                </Modal>
              </View>
            ) : (
              <View>
                <Text style={styles.estadoOrdenEspera}>{data.estadoOrden}</Text>

                <Button
                  title="PROCESAR ORDEN"
                  onPress={async () => {
                    try {
                      const options = {
                        method: "GET",
                        url: `https://daappserver-production.up.railway.app/api/empleados/${email}`,
                      };
                      const empResponse = await axios.request(options);
                      let nombreCompleto =
                        empResponse.data.nombre +
                        " " +
                        empResponse.data.apellido;
                      let response = await fetch(
                        `https://daappserver-production.up.railway.app/api/ordenes/${id}`,
                        {
                          method: "PUT",
                          headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            estadoOrden: "EN PROCESO",
                            procesadoPor: nombreCompleto,
                          }),
                        }
                      );

                      if (!response.ok) {
                        throw new Error(
                          `HTTP error! status: ${response.status}`
                        );
                      } else {
                        await fetchData();
                      }
                    } catch (error) {
                      console.log(
                        "Hubo un problema con la petición Fetch: " +
                          error.message
                      );
                    }
                  }}
                />
              </View>
            )}
          </View>
        )}
        <ScrollView>{data ? <GenerarQR orden={id} /> : null}</ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
