import React, { useState } from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import { COLORS } from "../../constants";

export default function App({ items }) {
  // Asumiendo que 'items' es un array de objetos
  const [saved, setSaved] = useState(false);

  async function savePDF() {
    try {
      let itemsArray = Array.isArray(items) ? items : [items];
      let htmlContent = itemsArray
        .map((item) => {
          const { nombre, apellido, cedula, correo, telefono, id } = item;

          return `
          <div class="container">
            <h2>Reporte de Producto</h2>
            <p><strong>Nombre del empleado:</strong> ${nombre} ${apellido}</p>
            <p><strong>Cédula del empleado:</strong> ${cedula}</p>
            <p><strong>Correo del empleado:</strong> ${correo}</p>
            <p><strong>telefono del Cliente:</strong> ${telefono}</p>
            <p><strong>ID del empleado:</strong> ${id}</p>
          </div>
        `;
        })
        .join("");

      const options = {
        html: `
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333; }
              .container { padding: 18px; }
              h2 { color: #444; }
              p { margin: 10px 0; border-bottom: 1px solid #ddd; padding-bottom: 8px; }
              strong { color: #555; }
            </style>
          </head>
          <body>${htmlContent}</body>
          </html>
        `,
        width: 500,
        height: 500,
      };

      let result = await Print.printAsync(options);

      if (!result) {
        console.log("Print result was null, but continuing...");
        result = { pdfBase64: "" };
      }

      const filePath = FileSystem.documentDirectory + "hello.pdf";

      await FileSystem.writeAsStringAsync(filePath, result.pdfBase64);

      setSaved(true);
    } catch (error) {
      if (error === "Print failed") {
        console.log("Print failed but continuing...");
        return;
      }

      console.error("Real error:", error);
    }
  }

  return (
    <View>
      <TouchableOpacity
        onPress={savePDF}
        style={{
          backgroundColor: COLORS.gray2,
          padding: 12,
          maxWidth: "50%",
          borderRadius: 16,
          alignSelf: "center",
        }}
      >
        <Text>DESCARGAR REPORTE</Text>
      </TouchableOpacity>
      {saved && (
        <Text
          style={{
            alignSelf: "center",
          }}
        >
          ¡Archivo guardado!
        </Text>
      )}
    </View>
  );
}
