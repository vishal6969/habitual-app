import { Dimensions } from "react-native";

export const HABIT_DAY_STATE = {
  COMPLETED: "completed",
  MISSED: "missed",
  OUT_OF_RANGE: "out_of_range",
  FUTURE: "future",
};

export const STATE_META = {
  [HABIT_DAY_STATE.COMPLETED]: { color: "#37c871", label: "Completed" },
  [HABIT_DAY_STATE.MISSED]: { color: "#FF6B6B", label: "Missed" },
  [HABIT_DAY_STATE.FUTURE]: { color: "#dce8f8", label: "Upcoming" },
  [HABIT_DAY_STATE.OUT_OF_RANGE]: { color: "transparent", label: "" },
};

export const LEGEND_STATES = [
  HABIT_DAY_STATE.COMPLETED,
  HABIT_DAY_STATE.MISSED,
  HABIT_DAY_STATE.FUTURE,
];

export const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const MODAL_H_MARGIN = 20;
export const CARD_H_PADDING = 16;
export const CELL_GAP = 4;

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const BASE_CELL_SIZE = Math.floor(
  (SCREEN_WIDTH - MODAL_H_MARGIN * 2 - CARD_H_PADDING * 2 - CELL_GAP * 6) / 7
);

export const CELL_SIZE = Math.floor(BASE_CELL_SIZE * 0.8);
export const CELL_RADIUS = Math.floor(CELL_SIZE / 2);
