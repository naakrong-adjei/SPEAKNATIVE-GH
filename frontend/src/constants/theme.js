import { COLORS } from "./colors";

export const LightTheme = {
  dark: false,

  colors: {
    background: COLORS.background,
    card: COLORS.white,

    primary: COLORS.primaryGreen,
    accent: COLORS.goldAccent,

    text: COLORS.textPrimary,
    textSecondary: COLORS.textSecondary,

    border: COLORS.divider,

    success: COLORS.success,
    error: COLORS.error,
    warning: COLORS.warning,
    info: COLORS.info,

    icon: COLORS.primaryGreen,
  },
};


export const DarkTheme = {
  dark: true,

  colors: {
    background: COLORS.mainBackgroundDark,
    card: COLORS.cardBgDark ,

    primary: COLORS.primaryGreenDark,
    accent: COLORS.softGold,

    text: COLORS.white,
    textSecondary: COLORS.textSecondaryDark,
    border: COLORS.dividerDark,

    success: COLORS.success,
    error: COLORS.error,
    warning: COLORS.warning,
    info: COLORS.info,

    icon: COLORS.softGold,
  },
};