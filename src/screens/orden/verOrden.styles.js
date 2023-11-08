import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  containerOrden: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
  },
  tituloOrden: {
    fontWeight: "bold",
    fontSize: SIZES.xLarge,
    textAlign: "center",
  },
  subtituloOrden: {
    fontWeight: "bold",
    fontSize: SIZES.large,
    textAlign: "center",
  },
  idOrden: {
    fontWeight: "400",
    fontSize: SIZES.medium,
    textAlign: "center",
    fontWeight: "bold",
  },
  modeloOrden: {
    textAlign: "center",
    fontSize: SIZES.large,
    fontWeight: "bold",
  },
  serialOrden: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: SIZES.medium,
  },
  fechaRecepcion: {
    textAlign: "center",
    fontWeight: "light",
    fontSize: 13,
    fontStyle: "italic",
  },
  estadoOrdenCompletada: {
    marginVertical: 12,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: SIZES.large,
    borderWidth: 0.5,
    borderColor: COLORS.white,
    borderRadius: SIZES.large,
    backgroundColor: COLORS.OrdenCompletada,
    width: "50%",
    alignSelf: "center",
    padding: 6,
    elevation: 5,
  },
  estadoOrdenEnProceso: {
    marginVertical: 12,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: SIZES.large,
    borderWidth: 0.5,
    borderColor: COLORS.white,
    borderRadius: 64,
    backgroundColor: COLORS.OrdenEspera,
    alignSelf: "center",
    width: "50%",
    padding: 12,
    elevation: 5,
  },
  estadoOrdenEspera: {
    marginVertical: 12,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: SIZES.large,
    borderWidth: 0.5,
    borderColor: COLORS.white,
    borderRadius: 64,
    backgroundColor: COLORS.ordenes,
    alignSelf: "center",
    padding: 14,
    elevation: 5,
  },
  nombreCliente: {
    fontSize: SIZES.large,
    textAlign: "center",
  },
  cliente: {
    textAlign: "center",
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 55,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    backgroundColor: COLORS.lightWhite,
    padding: 15,
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
});

export default styles;
