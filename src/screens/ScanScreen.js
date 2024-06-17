import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { COLORS, icons } from "../constants";
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

  const handleBarCodeScanned = ({ data }) => {
    setScannedData(data);
    const [type, id] = data.split(":");

    if (type === "lot" && id) {
      navigation.navigate(
        "Lote",
        { id: id.trim() },
        { stackPresentation: "replace" }
      );
    } else if (type === "product" && id) {
      navigation.navigate(
        "Producto",
        { id: id.trim() },
        { stackPresentation: "replace" }
      );
    } else {
      alert("Código QR no válido");
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
    return (
      <View style={styles.container}>
        <Text>Solicitando permiso a la cámara...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Sin acceso a la cámara</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleScanPress} style={styles.qrButton}>
        <Image source={icons.qrLogo} style={styles.qrImage} />
        <Text style={styles.qrButtonText}>¡Click para abrir el scanner!</Text>
      </TouchableOpacity>
      <Modal visible={scanning} animationType="slide" transparent={false}>
        <View style={styles.scannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFill}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleModalClose}
          >
            <Text style={styles.closeButtonText}>CERRAR</Text>
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
    backgroundColor: COLORS.white,
  },
  qrButton: {
    alignItems: "center",
  },
  qrImage: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
  qrButtonText: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 24,
    color: COLORS.primary,
  },
  scannerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  closeButton: {
    position: "absolute",
    bottom: 50,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 50,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
  },
});

export default QRScannerButton;
