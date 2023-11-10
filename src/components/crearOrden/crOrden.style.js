import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    height: "auto",
  },
  labelInput: {
    fontSize: SIZES.medium,
    fontWeight: "normal",
  },
  dataInfo: {
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
    margin: 12,
    padding: 4,
    width: "100%",
    textAlign: "center",
  },
  searchWrapper: {
    backgroundColor: COLORS.lightWhite,
    marginHorizontal: SIZES.small,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    width: "100%",
    height: "auto",
    padding: 6,
    marginTop: 2,
    textAlign: "center",
    overflow: "scroll",
  },

  boton: {
    height: "100%",
    backgroundColor: COLORS.green,
    marginTop: 32,
    padding: 12,
  },
  botonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: SIZES.large,
  },
});

export default styles;
