import useFetch from "../../hook/useFetch";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Button,
  ScrollView,
} from "react-native";
import { COLORS, icons, images, SIZES } from "../../constants";
import { ScreenHeaderBtn } from "../../components";
import styles from "./verOrden.styles";
import GenerarPDF from "../../components/generarPDF/generarpdf";
import GenerarQR from "../../components/generarQr/generarQR";
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";

const Home = () => {
  const params = useGlobalSearchParams();
  const id = params.id;
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetch(id);

  if (isLoading) <ActivityIndicator size="large" color={COLORS.tertiary} />;

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: `ORDEN N°${id}`,
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension={"60%"}
              handlePress={() => router.back()}
            />
          ),
        }}
      />
      {!data ? (
        <Text>No existe esa orden</Text>
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
            <Text style={styles.estadoOrdenCompletada}>{data.estadoOrden}</Text>
          ) : data.estadoOrden == "EN PROCESO" ? (
            <Text style={styles.estadoOrdenEnProceso}>{data.estadoOrden}</Text>
          ) : (
            <Text style={styles.estadoOrdenEspera}>{data.estadoOrden}</Text>
          )}

          {data.estadoOrden == "COMPLETADA" ? (
            <GenerarPDF items={data} />
          ) : data.estadoOrden == "EN PROCESO" ? (
            <Button
              title="MARCAR ORDEN COMO COMPLETADA"
              onPress={async () => {
                try {
                  let response = await fetch(
                    `http://192.168.31.97:6498/api/ordenes/${id}`,
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
                    await refetch();
                  }
                } catch (error) {
                  console.log(
                    "Hubo un problema con la petición Fetch: " + error.message
                  );
                }
              }}
            />
          ) : (
            <Button
              title="PROCESAR ORDEN"
              onPress={async () => {
                try {
                  let response = await fetch(
                    `http://192.168.31.97:6498/api/ordenes/${id}`,
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
                    await refetch();
                  }
                } catch (error) {
                  console.log(
                    "Hubo un problema con la petición Fetch: " + error.message
                  );
                }
              }}
            />
          )}
        </View>
      )}
      <ScrollView>{data ? <GenerarQR orden={id} /> : null}</ScrollView>
    </SafeAreaView>
  );
};

export default Home;
