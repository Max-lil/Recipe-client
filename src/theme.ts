import { createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "primary",
  defaultRadius: "xl",

  fontFamily: "Manrope, system-ui, sans-serif",
  headings: {
    fontFamily: "Manrope, system-ui, sans-serif",
    fontWeight: "600",
  },

  colors: {
    primary: [
      "#e8f8ee",
      "#c8efd6",
      "#9ee2b5",
      "#70d592",
      "#49cb74",
      "#00c853",
      "#00b44a",
      "#00963d",
      "#007731",
      "#005822",
    ],

    secondary: [
      "#e8f2ee",
      "#c9ddd4",
      "#a8c7bb",
      "#86b09f",
      "#5f9983",
      "#1b4332",
      "#163a2b",
      "#123124",
      "#0d271d",
      "#081d15",
    ],

    tertiary: [
      "#eefefb",
      "#d6fff8",
      "#c1fff3",
      "#a7ffeb",
      "#87f1dd",
      "#67dfcb",
      "#4dcab8",
      "#37b09f",
      "#279284",
      "#1c756a",
    ],

    neutral: [
      "#ffffff",
      "#f8fbf4",
      "#f1f8e9",
      "#ebf3e3",
      "#dce6d4",
      "#c9d2c2",
      "#a8afa2",
      "#7f877a",
      "#51584d",
      "#2a3127",
    ],

    danger: [
      "#fff1eb",
      "#ffd8c9",
      "#ffb59a",
      "#ff8e65",
      "#ff7043",
      "#d9480f",
      "#bd3e0c",
      "#9f3409",
      "#812907",
      "#661f05",
    ],
  },

  white: "#ffffff",
  black: "#2a3127",

  primaryShade: 5,

  other: {
    surface: "#f1f8e9",
    surfaceLow: "#ebf3e3",
    surfaceHigh: "#dce6d4",
    surfaceHighest: "#c9d2c2",
    surfaceLowest: "#ffffff",

    textPrimary: "#2a3127",
    textSecondary: "#51584d",
    outlineVariant: "#a8afa2",

    primaryGradient: "linear-gradient(135deg, #006a28 0%, #005d22 100%)",
    glassSurface: "rgba(241, 248, 233, 0.7)",
  },

  spacing: {
    xs: rem(8),
    sm: rem(12),
    md: rem(16),
    lg: rem(22),
    xl: rem(28),
  },

  radius: {
    xs: rem(8),
    sm: rem(12),
    md: rem(16),
    lg: rem(20),
    xl: rem(28),
  },

  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(22),
  },

  lineHeights: {
    xs: "1.3",
    sm: "1.4",
    md: "1.6",
    lg: "1.65",
    xl: "1.7",
  },

  shadows: {
    sm: "0 8px 24px rgba(42, 49, 39, 0.04)",
    md: "0 12px 32px rgba(42, 49, 39, 0.05)",
    lg: "0 20px 48px rgba(42, 49, 39, 0.06)",
  },

  components: {
    Paper: {
      defaultProps: {
        radius: "xl",
      },
      styles: {
        root: {
          backgroundColor: "#ebf3e3",
          border: "none",
        },
      },
    },

    Text: {
      defaultProps: {
        c: "dark",
      },
      styles: {
        root: {
          fontWeight: 500,
        },
      },
    },

    Card: {
      defaultProps: {
        radius: "xl",
        padding: "lg",
      },
      styles: {
        root: {
          backgroundColor: "#ffffff",
          border: "none",
        },
      },
    },

    Button: {
      defaultProps: {
        radius: "xl",
      },
      styles: {
        root: {
          fontWeight: 500,
        },
      },
    },

    TextInput: {
      defaultProps: {
        radius: "md",
      },
      styles: {
        input: {
          backgroundColor: "#dce6d4",
          border: "1px solid transparent",
          color: "#2a3127",
          transition: "all 150ms ease",
        },
      },
    },

    Input: {
      styles: {
        input: {
          backgroundColor: "#dce6d4",
          border: "1px solid transparent",
          color: "#2a3127",
        },
      },
    },

    ActionIcon: {
      defaultProps: {
        radius: "xl",
        variant: "subtle",
      },
    },

    Divider: {
      styles: {
        root: {
          borderColor: "rgba(168, 175, 162, 0.2)",
        },
      },
    },
  },
});
