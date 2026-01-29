import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "green",
  defaultRadius: "md",

  colors: {
    green: [
      "#eef7f3",
      "#d6ebe2",
      "#aed8c6",
      "#83c4a8",
      "#5eb28d",
      "#45a77b",
      "#339f71",
      "#278c62",
      "#1d7b55",
      "#0f5c3e"
    ],
    orange: [
      "#fff3e6",
      "#ffe2c7",
      "#ffc48a",
      "#ffa64d",
      "#ff8c1a",
      "#ff7a00",
      "#e66d00",
      "#cc6000",
      "#b35400",
      "#804000"
    ],
    gray: [
      "#f8f9fa",
      "#f1f3f5",
      "#e9ecef",
      "#dee2e6",
      "#ced4da",
      "#adb5bd",
      "#868e96",
      "#495057",
      "#343a40",
      "#212529"
    ]
  },

  fontFamily: "Inter, system-ui, sans-serif",
  headings: { fontFamily: "Inter, system-ui, sans-serif", fontWeight: "600" }
});
