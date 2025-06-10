import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AvatarPlaceholder from '../../components/AvatarPlaceholder';

const AnalyticsScreen = () => {
  const screenWidth = Dimensions.get('window').width;

  const clientsAtRisk = [
    { name: 'James', risk: 'High' },
    { name: 'Mike', risk: 'High' },
    { name: 'Sarah', risk: 'Medium' },
    { name: 'Anna', risk: 'Medium' },
    { name: 'Robert', risk: 'Medium' },
  ];

  const optimalSlots = [
    { day: 'Tuesdays', time: '7:00-9:00 AM' },
    { day: 'Wednesdays', time: '5:30-7:30 PM' },
    { day: 'Fridays', time: '4:00-6:00 PM' },
    { day: 'Saturdays', time: '9:00-11:00 AM' },
  ];

  const chartData = [
    { month: 'May', actual: 40, predicted: 50 },
    { month: 'Jun', actual: 45, predicted: 60 },
    { month: 'Jul', actual: 50, predicted: 65 },
    { month: 'Aug', actual: 60, predicted: 75 },
    { month: 'Sep', actual: 70, predicted: 85 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wellio</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={16} color="#28A0AE" />
          </TouchableOpacity>
          <View style={styles.profileContainer}>
            <AvatarPlaceholder name="Coach" size={28} />
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Predictive Analytics Section */}
        <View style={styles.section}>
          <LinearGradient
            colors={['#28A0AE', 'rgba(40, 160, 174, 0.8)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.predictiveCard}
          >
            <View style={styles.predictiveHeader}>
              <View style={styles.predictiveTextContainer}>
                <Text style={styles.predictiveTitle}>Predictive Analytics</Text>
                <Text style={styles.predictiveSubtitle}>AI-powered insights for your business</Text>
              </View>
              <View style={styles.chartIconContainer}>
                <MaterialIcons name="pie-chart" size={24} color="#E2F9AD" />
              </View>
            </View>
            <View style={styles.predictiveButtons}>
              <TouchableOpacity style={styles.filterButton}>
                <Ionicons name="filter" size={12} color="#FFFFFF" />
                <Text style={styles.filterButtonText}>Filter</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exportButton}>
                <Ionicons name="download-outline" size={12} color="#28A0AE" />
                <Text style={styles.exportButtonText}>Export</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Performance Metrics Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Performance Metrics</Text>
            <View style={styles.timeFilterContainer}>
              <Text style={styles.timeFilterText}>This Month</Text>
              <Ionicons name="chevron-down" size={12} color="#28A0AE" />
            </View>
          </View>
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricTitle}>Client Retention Rate</Text>
              <View style={styles.metricChangeContainer}>
                <Ionicons name="trending-up" size={9} color="#059669" />
                <Text style={styles.metricChange}>8%</Text>
              </View>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <LinearGradient
                  colors={['#28A0AE', '#E2F9AD']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.progressBarFill, { width: '85%' }]}
                />
              </View>
              <Text style={styles.progressPercentage}>85%</Text>
            </View>
            <Text style={styles.predictionText}>Predicted to increase by 3% next month</Text>
          </View>
        </View>

        {/* AI Predictions Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>AI Predictions</Text>
            <TouchableOpacity>
              <Text style={styles.refreshText}>Refresh</Text>
            </TouchableOpacity>
          </View>

          {/* Churn Risk Prediction */}
          <View style={styles.predictionCard}>
            <View style={styles.predictionHeader}>
              <View style={styles.predictionIconContainer}>
                <Ionicons name="people-outline" size={17} color="#28A0AE" />
              </View>
              <Text style={styles.predictionTitle}>Churn Risk Prediction</Text>
            </View>
            <Text style={styles.predictionDescription}>
              5 clients show signs of disengagement and{'\n'}might not renew.
            </Text>
                         <View style={styles.clientsAtRiskContainer}>
               {clientsAtRisk.map((client, index) => (
                 <View key={index} style={styles.clientRiskItem}>
                   <View style={styles.riskAvatarContainer}>
                     <AvatarPlaceholder name={client.name} size={40} />
                   </View>
                   <Text style={styles.clientName}>{client.name}</Text>
                   <Text style={[
                     styles.riskLevel,
                     { color: client.risk === 'High' ? '#EF4444' : '#F59E0B' }
                   ]}>
                     {client.risk}
                   </Text>
                 </View>
               ))}
             </View>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>View Retention Plan</Text>
            </TouchableOpacity>
          </View>

          {/* Optimal Scheduling */}
          <View style={styles.predictionCard}>
            <View style={styles.predictionHeader}>
              <View style={styles.predictionIconContainer}>
                <Ionicons name="calendar-outline" size={12} color="#28A0AE" />
              </View>
              <Text style={styles.predictionTitle}>Optimal Scheduling</Text>
            </View>
            <Text style={styles.predictionDescription}>
              AI suggests these optimal time slots to increase{'\n'}bookings:
            </Text>
            <View style={styles.schedulingGrid}>
              {optimalSlots.map((slot, index) => (
                <View key={index} style={styles.timeSlotCard}>
                  <Text style={styles.dayText}>{slot.day}</Text>
                  <Text style={styles.timeText}>{slot.time}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Update Availability</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Client Insights Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Client Insights</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Emma Johnson */}
          <View style={styles.clientInsightCard}>
                         <View style={styles.clientInsightHeader}>
               <View style={styles.clientInfoContainer}>
                 <View style={styles.avatarContainer}>
                   <AvatarPlaceholder name="Emma Johnson" size={48} />
                 </View>
                 <View style={styles.clientDetailsContainer}>
                   <Text style={styles.clientInsightName}>Emma Johnson</Text>
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBarSmall}>
                      <View style={[styles.progressFillSmall, { width: '75%' }]} />
                    </View>
                    <Text style={styles.goalText}>75% Goal</Text>
                  </View>
                </View>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Improving</Text>
              </View>
            </View>
            <View style={styles.insightTextContainer}>
              <Ionicons name="bulb-outline" size={11} color="#28A0AE" />
              <Text style={styles.insightText}>
                Based on recent progress, Emma will likely reach her goals 2 weeks ahead of schedule.
              </Text>
            </View>
            <View style={styles.clientActions}>
              <TouchableOpacity style={styles.detailsButton}>
                <Ionicons name="document-text-outline" size={16} color="#4B5563" />
                <Text style={styles.detailsButtonText}>Details</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageButton}>
                <Ionicons name="chatbubble-outline" size={14} color="#28A0AE" />
                <Text style={styles.messageButtonText}>Message</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* David Chen */}
          <View style={styles.clientInsightCard}>
                         <View style={styles.clientInsightHeader}>
               <View style={styles.clientInfoContainer}>
                 <View style={styles.avatarContainer}>
                   <AvatarPlaceholder name="David Chen" size={48} />
                 </View>
                 <View style={styles.clientDetailsContainer}>
                   <Text style={styles.clientInsightName}>David Chen</Text>
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBarSmall}>
                      <View style={[
                        styles.progressFillSmall, 
                        { width: '45%', backgroundColor: '#F59E0B' }
                      ]} />
                    </View>
                    <Text style={styles.goalText}>45% Goal</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: '#FEF3C7' }]}>
                <Text style={[styles.statusText, { color: '#B45309' }]}>Needs Focus</Text>
              </View>
            </View>
            <View style={styles.insightTextContainer}>
              <Ionicons name="bulb-outline" size={11} color="#28A0AE" />
              <Text style={styles.insightText}>
                David's nutrition plan adherence has dropped by 15% in the last two weeks.
              </Text>
            </View>
            <View style={styles.clientActions}>
              <TouchableOpacity style={styles.detailsButton}>
                <Ionicons name="document-text-outline" size={16} color="#4B5563" />
                <Text style={styles.detailsButtonText}>Details</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageButton}>
                <Ionicons name="chatbubble-outline" size={14} color="#28A0AE" />
                <Text style={styles.messageButtonText}>Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Business Growth Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Business Growth</Text>
            <TouchableOpacity>
              <Text style={styles.moreText}>More</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.businessGrowthCard}>
            <Text style={styles.revenueTitle}>Revenue Forecast</Text>
            
            {/* Chart Container */}
            <View style={styles.chartContainer}>
              <View style={styles.chartLabels}>
                {chartData.map((data, index) => (
                  <Text key={index} style={styles.chartLabel}>{data.month}</Text>
                ))}
              </View>
              <View style={styles.chartBars}>
                {chartData.map((data, index) => (
                  <View key={index} style={styles.barContainer}>
                    <View style={[styles.predictedBar, { height: data.predicted * 0.8 }]} />
                    <View style={[styles.actualBar, { height: data.actual * 0.8 }]} />
                  </View>
                ))}
              </View>
              <View style={styles.chartLegend}>
                <View style={styles.legendItem}>
                  <View style={styles.actualLegendColor} />
                  <Text style={styles.legendText}>Actual</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={styles.predictedLegendColor} />
                  <Text style={styles.legendText}>Predicted</Text>
                </View>
              </View>
            </View>

            {/* Growth Metrics */}
            <View style={styles.growthMetrics}>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Projected Growth</Text>
                <Text style={styles.metricValue}>18%</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>New Clients</Text>
                <Text style={styles.metricValue}>+12</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Avg. Session Value</Text>
                <Text style={styles.metricValue}>$68</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>View Growth Opportunities</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Add some bottom padding */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#28A0AE',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    width: 30,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(226, 249, 173, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
     profileContainer: {
     width: 32,
     height: 32,
     borderRadius: 16,
     borderWidth: 2,
     borderColor: '#28A0AE',
     overflow: 'hidden',
     justifyContent: 'center',
     alignItems: 'center',
   },
  scrollContainer: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  predictiveCard: {
    borderRadius: 16,
    padding: 16,
  },
  predictiveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  predictiveTextContainer: {
    flex: 1,
  },
  predictiveTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  predictiveSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  chartIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  predictiveButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    gap: 6,
  },
  filterButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 7,
    backgroundColor: '#E2F9AD',
    borderRadius: 16,
    gap: 6,
  },
  exportButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#28A0AE',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  timeFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeFilterText: {
    fontSize: 14,
    color: '#6B7280',
  },
  refreshText: {
    fontSize: 14,
    color: '#28A0AE',
  },
  viewAllText: {
    fontSize: 14,
    color: '#28A0AE',
  },
  moreText: {
    fontSize: 14,
    color: '#28A0AE',
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  metricChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  metricChange: {
    fontSize: 14,
    color: '#059669',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBarBackground: {
    flex: 1,
    height: 60,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginRight: 12,
    justifyContent: 'center',
  },
  progressBarFill: {
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    position: 'absolute',
    left: '40%',
    top: 20,
  },
  predictionText: {
    fontSize: 12,
    color: '#6B7280',
  },
  predictionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  predictionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  predictionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(40, 160, 174, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  predictionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  predictionDescription: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 16,
    lineHeight: 17,
  },
  clientsAtRiskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
     clientRiskItem: {
     alignItems: 'center',
     width: 60,
   },
   riskAvatarContainer: {
     marginBottom: 4,
   },
  
  clientName: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 5,
  },
  riskLevel: {
    fontSize: 10,
    fontWeight: '400',
  },
  actionButton: {
    backgroundColor: '#E2F9AD',
    borderRadius: 8,
    paddingVertical: 9,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#28A0AE',
  },
  schedulingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timeSlotCard: {
    width: '48%',
    backgroundColor: 'rgba(226, 249, 173, 0.2)',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 11,
    color: '#4B5563',
  },
  clientInsightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  clientInsightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
     clientInfoContainer: {
     flexDirection: 'row',
     alignItems: 'center',
     flex: 1,
   },
   avatarContainer: {
     marginRight: 12,
   },
  
  clientDetailsContainer: {
    flex: 1,
  },
  clientInsightName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 6,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarSmall: {
    width: 96,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginRight: 8,
  },
  progressFillSmall: {
    height: 6,
    backgroundColor: '#28A0AE',
    borderRadius: 3,
  },
  goalText: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusBadge: {
    backgroundColor: '#D1FAE5',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#047857',
  },
  insightTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 4,
  },
  insightText: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
  },
  clientActions: {
    flexDirection: 'row',
    gap: 8,
  },
  detailsButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 9,
    gap: 4,
  },
  detailsButtonText: {
    fontSize: 14,
    color: '#4B5563',
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E2F9AD',
    borderRadius: 8,
    paddingVertical: 9,
    gap: 4,
  },
  messageButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#28A0AE',
  },
  businessGrowthCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  revenueTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 16,
  },
  chartContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  chartLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 80,
    marginBottom: 8,
  },
  barContainer: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  actualBar: {
    width: 30,
    backgroundColor: '#28A0AE',
    borderRadius: 2,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  predictedBar: {
    width: 30,
    backgroundColor: 'rgba(40, 160, 174, 0.4)',
    borderRadius: 2,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    position: 'absolute',
    bottom: 0,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actualLegendColor: {
    width: 8,
    height: 8,
    backgroundColor: '#28A0AE',
    borderRadius: 2,
  },
  predictedLegendColor: {
    width: 8,
    height: 8,
    backgroundColor: 'rgba(40, 160, 174, 0.4)',
    borderRadius: 2,
  },
  legendText: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  growthMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#28A0AE',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#28A0AE',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default AnalyticsScreen; 