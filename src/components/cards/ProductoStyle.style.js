import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 6,
    marginBottom: 6,
    paddingEnd: 6,
    paddingBottom: 4,
    paddingHorizontal: 12,
    borderColor: "#e3e3e3",
    borderWidth: 1,
  },
  productName: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
  },
  productDescription: {
    marginTop: 6,
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
  productUPC: {
    fontSize: SIZES.small,
    fontStyle: "italic",
    fontWeight: "300",
    alignSelf: "flex-end",
    marginTop: 12,
  },
});

export default styles;
