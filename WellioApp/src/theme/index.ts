import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

// Get device dimensions for responsive design
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Device detection for responsive features
export const deviceInfo = {
  screenWidth,
  screenHeight,
  isSmallDevice: screenWidth < 375, // iPhone SE, small Android
  isMediumDevice: screenWidth >= 375 && screenWidth < 414, // iPhone 12/13/14
  isLargeDevice: screenWidth >= 414, // iPhone 14 Pro Max, large Android
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  hasNotch: Platform.OS === 'ios' && screenHeight >= 812, // iPhone X and newer
  statusBarHeight: Platform.OS === 'ios' ? (screenHeight >= 812 ? 44 : 20) : StatusBar.currentHeight || 0,
};

// Dynamic spacing that adapts to screen size
const getResponsiveSpacing = () => {
  const baseSpacing = 16;
  if (deviceInfo.isSmallDevice) return Math.round(baseSpacing * 0.875); // 14px
  if (deviceInfo.isLargeDevice) return Math.round(baseSpacing * 1.125); // 18px
  return baseSpacing; // 16px
};

// Color Palette
export const colors = {
  // Primary Colors
  primary: '#28A0AE',
  primaryLight: 'rgba(40, 160, 174, 0.8)',
  primaryBackground: 'rgba(40, 160, 174, 0.1)',
  
  // Secondary Colors
  secondary: '#E2F9AD',
  secondaryBackground: 'rgba(226, 249, 173, 0.3)',
  secondaryLight: 'rgba(226, 249, 173, 0.2)',
  
  // Background Colors
  background: '#F3F4F6',
  backgroundLight: '#F9FAFB',
  white: '#FFFFFF',
  
  // Text Colors
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textTertiary: '#4B5563',
  textWhite: '#FFFFFF',
  
  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  warningBackground: '#FEF3C7',
  warningText: '#B45309',
  error: '#EF4444',
  errorBackground: '#FEE2E2',
  errorText: '#B91C1C',
  
  // Neutral Colors
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  
  // Border Colors
  border: '#CED4DA',
  borderLight: '#E5E7EB',
};

// Responsive Typography
export const typography = {
  fontFamily: Platform.select({
    ios: 'Inter',
    android: 'Inter',
    default: 'System',
  }),
  fontFamilyAlt: Platform.select({
    ios: 'Roboto', 
    android: 'Roboto',
    default: 'System',
  }),
  
  // Responsive Font Sizes
  fontSize: {
    xs: deviceInfo.isSmallDevice ? 11 : 12,
    sm: deviceInfo.isSmallDevice ? 13 : 14,
    base: deviceInfo.isSmallDevice ? 15 : 16,
    lg: deviceInfo.isSmallDevice ? 17 : 18,
    xl: deviceInfo.isSmallDevice ? 19 : 20,
    '2xl': deviceInfo.isSmallDevice ? 22 : 24,
    '3xl': deviceInfo.isSmallDevice ? 28 : 32,
  },
  
  // Font Weights
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
};

// Responsive Spacing
export const spacing = {
  xs: Math.round(getResponsiveSpacing() * 0.25), // ~4px
  sm: Math.round(getResponsiveSpacing() * 0.5),  // ~8px
  md: Math.round(getResponsiveSpacing() * 0.75), // ~12px
  base: getResponsiveSpacing(),                  // 14-18px
  lg: Math.round(getResponsiveSpacing() * 1.25), // ~20px
  xl: Math.round(getResponsiveSpacing() * 1.5),  // ~24px
  '2xl': Math.round(getResponsiveSpacing() * 2), // ~32px
  '3xl': Math.round(getResponsiveSpacing() * 3), // ~48px
  '4xl': Math.round(getResponsiveSpacing() * 4), // ~64px
};

// Responsive Border Radius
export const borderRadius = {
  sm: 4,
  base: deviceInfo.isSmallDevice ? 6 : 8,
  md: deviceInfo.isSmallDevice ? 10 : 12,
  lg: deviceInfo.isSmallDevice ? 14 : 16,
  xl: deviceInfo.isSmallDevice ? 20 : 24,
  full: 9999,
};

// Platform-specific Shadows
export const shadows = {
  sm: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: {
      elevation: 1,
    },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
  }),
  base: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    android: {
      elevation: 2,
    },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
  }),
  md: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 3,
    },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
  }),
  lg: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    android: {
      elevation: 4,
    },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
  }),
};

// Safe area constants for modern devices
export const safeArea = {
  top: deviceInfo.hasNotch ? 44 : (deviceInfo.isIOS ? 20 : 0),
  bottom: deviceInfo.hasNotch ? 34 : 0,
  left: 0,
  right: 0,
};

// Accessibility-compliant touch targets
export const touchTargets = {
  small: Math.max(36, spacing.base * 2.25), // Minimum for accessibility
  medium: Math.max(44, spacing.base * 2.75), // Apple's recommended
  large: Math.max(48, spacing.base * 3), // Material Design minimum
};

// Common Styles
export const commonStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  containerWhite: {
    flex: 1,
    backgroundColor: colors.white,
  },
  
  // Cards
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.base,
    ...shadows.sm,
  },
  
  cardLarge: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    ...shadows.sm,
  },
  
  // Headers with safe area support
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    paddingTop: Math.max(spacing.sm, safeArea.top + spacing.xs),
    ...shadows.sm,
  },
  
  headerGradient: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
  },
  
  // Typography Styles
  h1: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  
  h2: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  
  h3: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  
  bodyLarge: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  
  body: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
  },
  
  bodySmall: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.normal,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
  },
  
  // Buttons with proper touch targets
  buttonPrimary: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.base,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: touchTargets.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonSecondary: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.base,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: touchTargets.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonGray: {
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.base,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: touchTargets.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily,
  },
  
  buttonTextPrimary: {
    color: colors.textWhite,
  },
  
  buttonTextSecondary: {
    color: colors.primary,
  },
  
  buttonTextGray: {
    color: colors.textTertiary,
  },
  
  // Status Badges
  badgeSuccess: {
    backgroundColor: colors.secondaryBackground,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  
  badgeWarning: {
    backgroundColor: colors.warningBackground,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  
  badgeError: {
    backgroundColor: colors.errorBackground,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  
  badgeTextSuccess: {
    fontSize: typography.fontSize.xs,
    color: colors.primary,
    fontFamily: typography.fontFamily,
  },
  
  badgeTextWarning: {
    fontSize: typography.fontSize.xs,
    color: colors.warningText,
    fontFamily: typography.fontFamily,
  },
  
  badgeTextError: {
    fontSize: typography.fontSize.xs,
    color: colors.errorText,
    fontFamily: typography.fontFamily,
  },
  
  // Flex utilities
  row: {
    flexDirection: 'row',
  },
  
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  column: {
    flexDirection: 'column',
  },
  
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Spacing utilities
  mb1: { marginBottom: spacing.xs },
  mb2: { marginBottom: spacing.sm },
  mb3: { marginBottom: spacing.md },
  mb4: { marginBottom: spacing.base },
  mb5: { marginBottom: spacing.lg },
  mb6: { marginBottom: spacing.xl },
  
  mt1: { marginTop: spacing.xs },
  mt2: { marginTop: spacing.sm },
  mt3: { marginTop: spacing.md },
  mt4: { marginTop: spacing.base },
  mt5: { marginTop: spacing.lg },
  mt6: { marginTop: spacing.xl },
  
  p1: { padding: spacing.xs },
  p2: { padding: spacing.sm },
  p3: { padding: spacing.md },
  p4: { padding: spacing.base },
  p5: { padding: spacing.lg },
  p6: { padding: spacing.xl },
  
  px4: { paddingHorizontal: spacing.base },
  py4: { paddingVertical: spacing.base },
  
  // Avatar
  avatar: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray100,
  },
  
  avatarLarge: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray100,
  },
  
  // Icon containers
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  iconContainerSmall: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Screen-specific style generators
export const createScreenStyles = (customStyles: any = {}) => {
  return StyleSheet.create({
    container: {
      ...commonStyles.container,
      ...customStyles.container,
    },
    ...customStyles,
  });
};

// Utility functions for responsive design
export const getResponsiveSize = (size: number) => {
  if (deviceInfo.isSmallDevice) return Math.round(size * 0.9);
  if (deviceInfo.isLargeDevice) return Math.round(size * 1.1);
  return size;
};

export const isIPhoneWithNotch = () => {
  return deviceInfo.hasNotch;
};

export const getStatusBarHeight = () => {
  return deviceInfo.statusBarHeight;
};

export const getSafeAreaTop = () => {
  return safeArea.top;
};

export const getSafeAreaBottom = () => {
  return safeArea.bottom;
}; 