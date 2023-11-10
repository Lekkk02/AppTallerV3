import React, { useState } from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import { COLORS } from "../../constants";

export default function App({ items }) {
  const [saved, setSaved] = useState(false);

  async function savePDF() {
    try {
      let itemsArray = Array.isArray(items) ? items : [items];
      const tableElements = itemsArray.reduce((acc, item, index) => {
        const { nombre, apellido, cedula, correo, telefono, id } = item;

        let tableContent = `
          <div style="height: 50%;">
            <table style="height: 50%;">
              <tr>
                <th colspan="4"> ${nombre} ${apellido}</th>
              </tr>
              <tr>
                <td><strong>Nombre:</strong></td>
                <td>${nombre}</td>
                <td><strong>Apellido:</strong></td>
                <td>${apellido}</td>
              </tr>
              <tr>
                <td><strong>Cédula:</strong></td>
                <td>${cedula}</td>
                <td><strong>Correo:</strong></td>
                <td>${correo}</td>
              </tr>
              <tr>
                <td><strong>Teléfono:</strong></td>
                <td>${telefono}</td>
                <td><strong>ID:</strong></td>
                <td>${id}</td>
              </tr>
          
            </table>
          </div>
        `;

        if (index % 2 !== 0) {
          // Si el índice es impar, se agrega un salto de página
          tableContent += '<div style="page-break-after: auto;"></div>';
        }

        acc.push(tableContent);
        return acc;
      }, []);

      const htmlContent = `
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            table {
              width: 100%;
              border: 1px solid #ddd;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            td, th {
              padding: 8px;
              border: 1px solid #ddd;
              text-align: left;
            }
            th {
              background-color: #3399ff;
              color: white;
              text-align:center
            }
            tr:nth-child(even) {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          ${tableElements.join("")}
        </body>
        </html>
      `;

      const options = {
        html: htmlContent,
        width: 400,
        height: 842, // Half of the standard A4 size in pixels (842)
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
      {saved && <Text style={{ alignSelf: "center" }}>¡Archivo guardado!</Text>}
    </View>
  );
}
