import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Button,
  ScrollView,
} from "react-native";
import { COLORS } from "../../constants";
import styles from "./verOrden.styles";
import GenerarPDF from "../../components/generarPDF/generarpdf";
import GenerarQR from "../../components/generarQr/generarQR";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

const Home = () => {
  const auth = FIREBASE_AUTH;
  const route = useRoute();
  const id = route?.params?.id;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
          <Text style={styles.serialOrden}>SERIAL: {data.serialProducto}</Text>
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
                        }),
                      }
                    );

                    if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                    } else {
                      await fetchData();
                    }
                  } catch (error) {
                    console.log(
                      "Hubo un problema con la petición Fetch: " + error.message
                    );
                  }
                }}
              />
            </View>
          ) : (
            <View>
              <Text style={styles.estadoOrdenEspera}>{data.estadoOrden}</Text>

              <Button
                title="PROCESAR ORDEN"
                onPress={async () => {
                  try {
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
                        }),
                      }
                    );

                    if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                    } else {
                      await fetchData();
                    }
                  } catch (error) {
                    console.log(
                      "Hubo un problema con la petición Fetch: " + error.message
                    );
                  }
                }}
              />
            </View>
          )}
        </View>
      )}
      <ScrollView>{data ? <GenerarQR orden={id} /> : null}</ScrollView>
    </SafeAreaView>
  );
};

export default Home;
