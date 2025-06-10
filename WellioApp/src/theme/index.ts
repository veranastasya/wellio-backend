import { StyleSheet } from 'react-native';

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

// Typography
export const typography = {
  fontFamily: 'Inter', // Primary font family
  fontFamilyAlt: 'Roboto', // Alternative font family
  
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
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

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
};

// Border Radius
export const borderRadius = {
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// Shadows
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
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
  
  // Headers
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
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
  
  // Buttons
  buttonPrimary: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.base,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonSecondary: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.base,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonGray: {
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.base,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
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