import React, { useRef } from "react";
import { Button, View, Platform, PermissionsAndroid } from "react-native";
import QRCode from "react-native-qrcode-svg";

import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
const GenerarQR = ({ typeID }) => {
  const viewRef = useRef();
  const qrValue = typeID;
  const saveQR = async () => {
    if (Platform.OS === "android") {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Necesitamos permisos de acceso a tus fotos para guardar el QR.");
        return;
      }
    }

    viewRef.current.capture().then(async (uri) => {
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("QR Codes", asset, false);
      alert('QR guardado en la galería en el álbum "QR Codes".');
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 34,
      }}
    >
      <ViewShot ref={viewRef} options={{ format: "png", quality: 1.0 }}>
        <View style={{ backgroundColor: "white", padding: 14 }}>
          <QRCode value={qrValue} size={125} />
        </View>
      </ViewShot>
      <Button title="Guardar QR" onPress={saveQR} />
    </View>
  );
};

export default GenerarQR;
