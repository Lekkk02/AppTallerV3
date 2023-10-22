import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.OrdenCompletada,
    borderRadius: 6,
    marginBottom: 6,
    paddingEnd: 6,
    paddingBottom: 4,
    paddingHorizontal: 12,
  },
  fecha: {
    fontSize: SIZES.small,
    fontStyle: "italic",
    fontWeight: "300",
    alignSelf: "flex-end",
    marginTop: 12,
  },
  client_name: {
    marginTop: 6,
  },
  logoContainer: (selectedJob, item) => ({
    width: 50,
    height: 50,
    backgroundColor: selectedJob === item.job_id ? "#FFF" : COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  }),
  logoImage: {
    width: "70%",
    height: "70%",
  },

  jobName: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
  },
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: (selectedJob) => ({
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.bold,
    color: selectedJob === item.job_id ? COLORS.white : COLORS.primary,
  }),
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});

export default styles;
