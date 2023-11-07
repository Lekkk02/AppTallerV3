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
        const {
          nombreCliente,
          cedulaCliente,
          tipoProducto,
          marcaProducto,
          direccionCliente,
          serialProducto,
          telefonoCliente,
          idOrden,
          comentarios,
          procesadoPor,
          completadoPor,
          fechaRecepcion,
          estadoOrden,
        } = item;

        let tableContent = `
          <div style="height: 50%;">
            <table style="height: 80%;">
              <tr>
                <th colspan="4">Orden ${idOrden}</th>
              </tr>
              <tr>
                <td><strong>Nombre Cliente:</strong></td>
                <td>${nombreCliente}</td>
                <td><strong>Cédula:</strong></td>
                <td>${cedulaCliente}</td>
              </tr>
              <tr>
                <td><strong>Tipo de Producto:</strong></td>
                <td>${tipoProducto}</td>
                <td><strong>Marca del Producto:</strong></td>
                <td>${marcaProducto}</td>
              </tr>
              <tr>
                <td><strong>Dirección:</strong></td>
                <td>${direccionCliente}</td>
                <td><strong>Serial:</strong></td>
                <td>${serialProducto}</td>
              </tr>
              <tr>
                <td><strong>Teléfono:</strong></td>
                <td>${telefonoCliente}</td>
                <td><strong>ID de la Orden:</strong></td>
                <td>${idOrden}</td>
              </tr>
              <tr>
                <td><strong>Comentarios:</strong></td>
                <td colspan="4">${comentarios}</td>
              </tr>
              <tr>
              <td><strong>Fecha de recepción:</strong></td>
              <td colspan="4">${fechaRecepcion}</td>
            </tr>
              <tr>
                <td colspan="1"><strong>Procesado por:</strong> ${
                  procesadoPor !== "undefined undefined"
                    ? procesadoPor
                    : "NO PROCESADO"
                }</td>
                <td colspan="1"><strong>Completado por:</strong> ${
                  completadoPor !== "undefined undefined"
                    ? completadoPor
                    : "NO COMPLETADO"
                }</td>
                <td colspan="2"><strong>Estado: </strong>${estadoOrden}</td>
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
