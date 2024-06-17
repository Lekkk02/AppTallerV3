import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  touchable: {
    marginVertical: 8,
  },
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderColor: "#e3e3e3",
    borderWidth: 1,
  },
  loteName: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  loteDescription: {
    marginTop: 8,
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS.darkGray,
  },
  productUPC: {
    marginTop: 8,
    fontSize: SIZES.small,
    fontFamily: FONT.italic,
    color: COLORS.gray,
  },
  productDetails: {
    marginTop: 8,
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    color: COLORS.secondary,
  },
});

export default styles;
