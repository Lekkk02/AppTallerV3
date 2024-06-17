import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  container: {
    padding: SIZES.medium,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    marginBottom: SIZES.medium,
    backgroundColor: "#E8F0FF",
    borderRadius: SIZES.small,
    padding: SIZES.small,
  },
  title: {
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: SIZES.small,
  },
  description: {
    fontSize: SIZES.medium,
    textAlign: "center",
    color: COLORS.darkGray,
    marginBottom: SIZES.small,
  },
  upc: {
    fontSize: SIZES.medium,
    textAlign: "center",
    color: COLORS.darkGray,
    marginBottom: SIZES.small,
  },
  separator: {
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 1,
    marginVertical: SIZES.medium,
  },
  loteInfo: {
    marginBottom: SIZES.medium,
  },
  infoTitle: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    marginBottom: SIZES.small,
  },
  infoText: {
    fontSize: SIZES.medium,
    marginBottom: SIZES.small,
  },
  qrButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.large,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SIZES.medium,
  },
  qrButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 40,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  modalInput: {
    width: "100%",
    padding: 10,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 5,
  },
});
export default styles;
