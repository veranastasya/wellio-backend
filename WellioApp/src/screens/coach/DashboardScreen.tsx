import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles, spacing, borderRadius, shadows, typography, deviceInfo, safeArea, touchTargets } from '../../theme';

const DashboardScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.brandName}>Wellio</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notificationButton}>
              <Text style={styles.notificationIcon}>🔔</Text>
            </TouchableOpacity>
            <Image 
              source={{ uri: 'https://via.placeholder.com/32x32' }} 
              style={styles.avatar}
            />
          </View>
        </View>
      </View>

      {/* Welcome Card */}
      <View style={styles.welcomeSection}>
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeContent}>
            <View style={styles.welcomeText}>
              <Text style={styles.welcomeTitle}>Welcome back, Alex!</Text>
              <Text style={styles.welcomeSubtitle}>You have 3 sessions scheduled today</Text>
            </View>
            <View style={styles.welcomeIcon}>
              <Text style={styles.handWave}>👋</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.sessionsButton}>
            <Text style={styles.sessionsIcon}>📅</Text>
            <Text style={styles.sessionsText}>Sessions</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsSection}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>👥</Text>
            </View>
            <Text style={styles.statNumber}>28</Text>
            <Text style={styles.statLabel}>Active Clients</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>📊</Text>
            </View>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>New Insights</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>💬</Text>
            </View>
            <Text style={styles.statNumber}>9</Text>
            <Text style={styles.statLabel}>Unread Messages</Text>
          </View>
        </View>
      </View>

      {/* Upcoming Sessions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.sessionCard}>
          <View style={styles.sessionHeader}>
            <View style={styles.sessionInfo}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/48x48' }} 
                style={styles.clientAvatar}
              />
              <View style={styles.sessionDetails}>
                <Text style={styles.clientName}>Emma Johnson</Text>
                <Text style={styles.sessionType}>Yoga Session • 60 min</Text>
              </View>
            </View>
            <View style={styles.timeBadge}>
              <Text style={styles.timeText}>10:30 AM</Text>
            </View>
          </View>
          <View style={styles.sessionActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>📹</Text>
              <Text style={styles.actionText}>Join</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>💬</Text>
              <Text style={styles.actionText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sessionCard}>
          <View style={styles.sessionHeader}>
            <View style={styles.sessionInfo}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/48x48' }} 
                style={styles.clientAvatar}
              />
              <View style={styles.sessionDetails}>
                <Text style={styles.clientName}>David Chen</Text>
                <Text style={styles.sessionType}>Nutrition Coaching • 45 min</Text>
              </View>
            </View>
            <View style={styles.timeBadge}>
              <Text style={styles.timeText}>2:15 PM</Text>
            </View>
          </View>
          <View style={styles.sessionActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>📹</Text>
              <Text style={styles.actionText}>Join</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>💬</Text>
              <Text style={styles.actionText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Client Onboarding */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Client Onboarding</Text>
        <View style={styles.onboardingCard}>
          <TouchableOpacity style={styles.primaryOnboardingButton}>
            <Text style={styles.onboardingIcon}>👤</Text>
            <Text style={styles.primaryButtonText}>Add Client Manually</Text>
            <Text style={styles.chevronIcon}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryOnboardingButton}>
            <Text style={styles.onboardingIcon}>📝</Text>
            <Text style={styles.secondaryButtonText}>Send Questionnaire</Text>
            <Text style={styles.chevronIcon}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* AI Insights */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>AI Insights</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>More</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <View style={styles.insightIconContainer}>
              <Text style={styles.insightIcon}>💡</Text>
            </View>
            <Text style={styles.insightTitle}>Client Retention Opportunity</Text>
          </View>
          <Text style={styles.insightDescription}>
            3 clients haven't booked in 2+ weeks. Consider sending a re-engagement message.
          </Text>
          <TouchableOpacity style={styles.insightButton}>
            <Text style={styles.insightButtonText}>Send Message Template</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <View style={styles.insightIconContainer}>
              <Text style={styles.insightIcon}>📈</Text>
            </View>
            <Text style={styles.insightTitle}>Progress Trends</Text>
          </View>
          <Text style={styles.insightDescription}>
            Your clients are showing 12% better adherence to programs compared to last month.
          </Text>
          <TouchableOpacity style={styles.insightButton}>
            <Text style={styles.insightButtonText}>View Full Report</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Clients */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Clients</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.recentClientsContainer}>
          <View style={styles.clientCard}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/56x56' }} 
              style={styles.clientCardAvatar}
            />
            <Text style={styles.clientCardName}>Sarah Kim</Text>
            <Text style={styles.clientCardDate}>Last: May 9</Text>
            <View style={styles.statusBadgeSuccess}>
              <Text style={styles.statusBadgeTextSuccess}>On Track</Text>
            </View>
          </View>

          <View style={styles.clientCard}>
            <View style={styles.initialsAvatar}>
              <Text style={styles.initialsText}>JW</Text>
            </View>
            <Text style={styles.clientCardName}>James Wilson</Text>
            <Text style={styles.clientCardDate}>Last: May 10</Text>
            <View style={styles.statusBadgeWarning}>
              <Text style={styles.statusBadgeTextWarning}>Needs Attention</Text>
            </View>
          </View>

          <View style={styles.clientCard}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/56x56' }} 
              style={styles.clientCardAvatar}
            />
            <Text style={styles.clientCardName}>Lisa Patel</Text>
            <Text style={styles.clientCardDate}>Last: May 11</Text>
            <View style={styles.statusBadgeSuccess}>
              <Text style={styles.statusBadgeTextSuccess}>On Track</Text>
            </View>
          </View>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Header
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    ...shadows.sm,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: deviceInfo.hasNotch ? spacing.xs : spacing.sm,
  },
  brandName: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    fontFamily: typography.fontFamily,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  notificationButton: {
    width: Math.max(32, touchTargets.small),
    height: Math.max(32, touchTargets.small),
    backgroundColor: colors.secondaryLight,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    fontSize: 16,
  },
  avatar: {
    width: deviceInfo.isSmallDevice ? 28 : 32,
    height: deviceInfo.isSmallDevice ? 28 : 32,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    borderColor: colors.primary,
  },

  // Welcome Section
  welcomeSection: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.lg,
  },
  welcomeCard: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
  },
  welcomeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.base,
  },
  welcomeText: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textWhite,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.xs,
  },
  welcomeSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textWhite,
    fontFamily: typography.fontFamily,
    opacity: 0.9,
  },
  welcomeIcon: {
    width: 30,
    height: 24,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handWave: {
    fontSize: 16,
  },
  sessionsButton: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs,
  },
  sessionsIcon: {
    fontSize: 12,
  },
  sessionsText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary,
    fontFamily: typography.fontFamily,
  },

  // Stats Section
  statsSection: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  statIcon: {
    fontSize: 16,
  },
  statNumber: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
    textAlign: 'center',
  },

  // Sections
  section: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  viewAllText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontFamily: typography.fontFamily,
  },

  // Session Cards
  sessionCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.base,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  sessionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  clientAvatar: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    marginRight: spacing.md,
  },
  sessionDetails: {
    flex: 1,
  },
  clientName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.xs,
  },
  sessionType: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
  },
  timeBadge: {
    backgroundColor: colors.secondaryBackground,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  timeText: {
    fontSize: typography.fontSize.xs,
    color: colors.primary,
    fontFamily: typography.fontFamily,
  },
  sessionActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.base,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
  },
  actionIcon: {
    fontSize: 12,
  },
  actionText: {
    fontSize: typography.fontSize.sm,
    color: colors.textTertiary,
    fontFamily: typography.fontFamily,
  },

  // Onboarding Section
  onboardingCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.base,
    ...shadows.sm,
    gap: spacing.md,
  },
  primaryOnboardingButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.base,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  secondaryOnboardingButton: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.base,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  onboardingIcon: {
    fontSize: 16,
  },
  primaryButtonText: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textWhite,
    fontFamily: typography.fontFamily,
  },
  secondaryButtonText: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary,
    fontFamily: typography.fontFamily,
  },
  chevronIcon: {
    fontSize: 20,
    color: colors.textWhite,
  },

  // Insight Cards
  insightCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.base,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  insightIconContainer: {
    width: 32,
    height: 32,
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  insightIcon: {
    fontSize: 14,
  },
  insightTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  insightDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.textTertiary,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.base,
    lineHeight: 20,
  },
  insightButton: {
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.base,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  insightButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textTertiary,
    fontFamily: typography.fontFamily,
  },

  // Recent Clients
  recentClientsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  clientCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  clientCardAvatar: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    marginBottom: spacing.sm,
  },
  initialsAvatar: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  initialsText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
    fontFamily: typography.fontFamily,
  },
  clientCardName: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  clientCardDate: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  statusBadgeSuccess: {
    backgroundColor: colors.secondaryBackground,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  statusBadgeWarning: {
    backgroundColor: colors.warningBackground,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  statusBadgeTextSuccess: {
    fontSize: typography.fontSize.xs,
    color: colors.primary,
    fontFamily: typography.fontFamily,
  },
  statusBadgeTextWarning: {
    fontSize: typography.fontSize.xs,
    color: colors.warningText,
    fontFamily: typography.fontFamily,
  },
});

export default DashboardScreen; 