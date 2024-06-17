import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  container: {
    flex: 1,
    padding: SIZES.medium,
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
  companyId: {
    fontSize: SIZES.medium,
    textAlign: "center",
    color: COLORS.darkGray,
    marginBottom: SIZES.small,
  },
  lotes: {
    fontSize: 14,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    marginBottom: 6,
  },
  separator: {
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 1,
    marginVertical: SIZES.medium,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
    marginBottom: SIZES.medium,
  },
  noDataText: {
    fontSize: SIZES.large,
    textAlign: "center",
    marginVertical: 200,
  },
  errorText: {
    fontSize: SIZES.large,
    textAlign: "center",
    color: COLORS.error,
    marginVertical: 200,
  },
});

export default styles;
