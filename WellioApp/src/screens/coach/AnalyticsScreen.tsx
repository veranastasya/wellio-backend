import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';

const AnalyticsScreen = () => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Analytics Dashboard</Text>
        <Text style={styles.headerSubtitle}>Track your coaching performance</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>85%</Text>
          <Text style={styles.statLabel}>Client Retention</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>4.8</Text>
          <Text style={styles.statLabel}>Avg Rating</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Monthly Progress</Text>
        <View style={styles.chartContainer}>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartText}>Sessions Completed</Text>
            <Text style={styles.chartNumber}>127</Text>
            <Text style={styles.chartSubtext}>+12% from last month</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Client Engagement</Text>
        <View style={styles.engagementContainer}>
          <View style={styles.engagementItem}>
            <Text style={styles.engagementLabel}>Check-ins</Text>
            <Text style={styles.engagementValue}>92%</Text>
          </View>
          <View style={styles.engagementItem}>
            <Text style={styles.engagementLabel}>Goal Achievement</Text>
            <Text style={styles.engagementValue}>78%</Text>
          </View>
          <View style={styles.engagementItem}>
            <Text style={styles.engagementLabel}>Program Completion</Text>
            <Text style={styles.engagementValue}>84%</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Performing Programs</Text>
        <View style={styles.programCard}>
          <Text style={styles.programName}>Weight Loss Bootcamp</Text>
          <Text style={styles.programStats}>95% success rate • 18 clients</Text>
        </View>
        <View style={styles.programCard}>
          <Text style={styles.programName}>Strength Building</Text>
          <Text style={styles.programStats}>88% success rate • 14 clients</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#4A90E2',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chartPlaceholder: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  chartText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  chartNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 4,
  },
  chartSubtext: {
    fontSize: 14,
    color: '#2ECC71',
    fontWeight: '500',
  },
  engagementContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  engagementItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  engagementLabel: {
    fontSize: 16,
    color: '#333',
  },
  engagementValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A90E2',
  },
  programCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  programName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  programStats: {
    fontSize: 14,
    color: '#666',
  },
});

export default AnalyticsScreen; 