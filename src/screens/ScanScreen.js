import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import { COLORS, icons } from "../constants";

import useFetch from "../hook/useFetch";

import { useNavigation } from "@react-navigation/native";

const QRScannerButton = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const checkOrden = (id) => {
    const { data: orden, error, isLoading } = useFetch(`${id}`);
    console.log(orden);
    console.log(orden.length);
    if (orden.length === 0) {
      return false;
    } else {
      return true;
    }
  };
  const handleBarCodeScanned = ({ data }) => {
    setScannedData(data);
    if (checkOrden) {
      navigation.navigate(
        "Orden",
        { id: data },
        { stackPresentation: "replace" }
      );
    }

    setScanning(false);
  };

  const handleScanPress = () => {
    setScanning(true);
  };

  const handleModalClose = () => {
    setScanning(false);
    setScannedData(null);
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>Sin acceso a la cámara</Text>;
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setScanning(true);
        }}
      >
        <View style={{ alignSelf: "center" }}>
          <Image
            source={icons.qrLogo}
            style={{ width: 300, height: 300, borderRadius: 75 }}
          />
          <Text
            style={{ alignSelf: "center", fontWeight: "bold", fontSize: 24 }}
          >
            ¡Click para abrir el scanner!
          </Text>
        </View>
      </TouchableOpacity>
      <Modal visible={scanning} animationType="slide" transparent={false}>
        <View style={styles.scannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFill}
          />
          <TouchableOpacity style={styles.btnCerrar} onPress={handleModalClose}>
            <Text style={styles.txtbtnCerrar}>CERRAR</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scannerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
  },
  btnCerrar: {
    backgroundColor: COLORS.OrdenEspera,
    paddingHorizontal: 32,
    padding: 12,
    top: 290,
    borderRadius: 50,
  },
  txtbtnCerrar: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default QRScannerButton;
