import { StyleSheet } from "react-native";
import { CARD_H_PADDING, CELL_GAP, CELL_RADIUS, CELL_SIZE, MODAL_H_MARGIN } from "./constants";

export default StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: MODAL_H_MARGIN,
  },
  card: {
    backgroundColor: "#fcfcff",
    borderRadius: 6,
    paddingHorizontal: CARD_H_PADDING,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  goalTitle: {
    flex: 1,
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    color: "#2f2f2f",
    marginRight: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginTop: 12,
    marginBottom: 16,
  },
  monthNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  monthLabel: {
    fontFamily: "Nunito-Bold",
    fontSize: 16,
    color: "#2f2f2f",
  },
  navDisabled: {
    opacity: 0.3,
  },
  weekDayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  weekDayLabel: {
    width: CELL_SIZE,
    textAlign: "center",
    fontFamily: "Nunito-SemiBold",
    fontSize: 10,
    color: "#a2a2a2",
  },
  grid: {
    marginBottom: 20,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: CELL_GAP,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: CELL_RADIUS,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  todayCell: {
    borderWidth: 1,
    borderColor: "#2f2f2f",
  },
  dayNumber: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 13,
    color: "#2f2f2f",
  },
  outOfRangeDayNum: {
    color: "#d8d8d8",
  },
  lightDayNum: {
    color: "#fff",
  },
  todayDayNum: {
    color: "#ff5c00",
    fontFamily: "Nunito-Bold",
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendSwatch: {
    width: 12,
    height: 12,
    borderRadius: 3,
    marginRight: 5,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  legendLabel: {
    fontFamily: "Nunito-Medium",
    fontSize: 12,
    color: "#666",
  },
});
