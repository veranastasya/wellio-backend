import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AvatarPlaceholder from '../../components/AvatarPlaceholder';

interface QuestionnaireScreenProps {
  navigation: any;
}

interface Questionnaire {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  estimatedTime: string;
  category: string;
  isPopular?: boolean;
  icon: keyof typeof MaterialIcons.glyphMap;
}

const QuestionnaireScreen: React.FC<QuestionnaireScreenProps> = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Weight Loss', 'Muscle Gain', 'Nutrition', 'Fitness'];

  const questionnaires: Questionnaire[] = [
    {
      id: '1',
      title: 'Weight Loss Assessment',
      description: 'Comprehensive assessment for new weight loss clients',
      questionCount: 15,
      estimatedTime: '~5 min to complete',
      category: 'Weight Loss',
      isPopular: true,
      icon: 'scale',
    },
    {
      id: '2',
      title: 'Muscle Building Questionnaire',
      description: 'For clients focused on strength and muscle gain',
      questionCount: 12,
      estimatedTime: '~4 min to complete',
      category: 'Muscle Gain',
      icon: 'fitness-center',
    },
    {
      id: '3',
      title: 'Nutrition Habits Assessment',
      description: 'Evaluates current eating patterns and preferences',
      questionCount: 10,
      estimatedTime: '~3 min to complete',
      category: 'Nutrition',
      icon: 'restaurant',
    },
    {
      id: '4',
      title: 'Fitness Level Evaluation',
      description: 'Assesses current activity level and fitness goals',
      questionCount: 8,
      estimatedTime: '~2 min to complete',
      category: 'Fitness',
      icon: 'directions-run',
    },
  ];

  const filteredQuestionnaires = questionnaires.filter(questionnaire => {
    const matchesSearch = questionnaire.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         questionnaire.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || questionnaire.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSendToClient = (questionnaire: Questionnaire) => {
    Alert.alert(
      'Send Questionnaire',
      `Send "${questionnaire.title}" to a client?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Choose Client', onPress: () => {
          // TODO: Navigate to client selection screen
          Alert.alert('Success', 'Questionnaire sent successfully!');
        }},
      ]
    );
  };

  const handleEditQuestionnaire = (questionnaire: Questionnaire) => {
    Alert.alert('Edit Questionnaire', `Edit "${questionnaire.title}" functionality coming soon!`);
  };

  const handleCreateNew = () => {
    Alert.alert('Create Questionnaire', 'Create new questionnaire functionality coming soon!');
  };

  const renderFilterButton = (filter: string) => (
    <TouchableOpacity
      key={filter}
      style={[
        styles.filterButton,
        selectedFilter === filter && styles.filterButtonActive
      ]}
      onPress={() => setSelectedFilter(filter)}
    >
      <Text style={[
        styles.filterButtonText,
        selectedFilter === filter && styles.filterButtonTextActive
      ]}>
        {filter}
      </Text>
    </TouchableOpacity>
  );

  const renderQuestionnaireCard = (questionnaire: Questionnaire) => (
    <View key={questionnaire.id} style={styles.questionnaireCard}>
      <View style={styles.cardHeader}>
        <View style={styles.cardInfo}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardTitle}>{questionnaire.title}</Text>
            {questionnaire.isPopular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>Popular</Text>
              </View>
            )}
          </View>
          <Text style={styles.cardDescription}>{questionnaire.description}</Text>
        </View>
        <View style={styles.iconContainer}>
          <MaterialIcons name={questionnaire.icon} size={16} color="#28A0AE" />
        </View>
      </View>

      <View style={styles.cardMeta}>
        <View style={styles.metaItem}>
          <Ionicons name="list-outline" size={12} color="#6B7280" />
          <Text style={styles.metaText}>{questionnaire.questionCount} questions</Text>
        </View>
        <Text style={styles.metaSeparator}>•</Text>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={12} color="#6B7280" />
          <Text style={styles.metaText}>{questionnaire.estimatedTime}</Text>
        </View>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => handleSendToClient(questionnaire)}
        >
          <Text style={styles.sendButtonText}>Send to Client</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEditQuestionnaire(questionnaire)}
        >
          <Ionicons name="create-outline" size={16} color="#4B5563" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={16} color="#4B5563" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Questionnaires</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={16} color="#4B5563" />
            </TouchableOpacity>
            <View style={styles.profileContainer}>
              <AvatarPlaceholder name="Coach" size={40} />
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={16} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search questionnaires"
              placeholderTextColor="#ADAEBC"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContainer}
          >
            {filters.map(renderFilterButton)}
          </ScrollView>
        </View>

        {/* Create New Button */}
        <View style={styles.createSection}>
          <TouchableOpacity style={styles.createButton} onPress={handleCreateNew}>
            <Ionicons name="add" size={16} color="#1F2937" style={styles.createIcon} />
            <Text style={styles.createButtonText}>Create New Questionnaire</Text>
          </TouchableOpacity>
        </View>

        {/* Pre-created Questionnaires */}
        <View style={styles.questionnairesSection}>
          <Text style={styles.sectionTitle}>Pre-created Questionnaires</Text>
          {filteredQuestionnaires.map(renderQuestionnaireCard)}
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 22,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    width: 30,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  profileContainer: {
    borderWidth: 2,
    borderColor: '#28A0AE',
    borderRadius: 20,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 46,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
  },
  filterSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 15,
    minWidth: 50,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#28A0AE',
    borderColor: '#28A0AE',
  },
  filterButtonText: {
    fontSize: 12,
    color: '#374151',
    textAlign: 'center',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  createSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E2F9AD',
    borderRadius: 8,
    paddingVertical: 16,
  },
  createIcon: {
    marginRight: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  questionnairesSection: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  questionnaireCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 12,
    padding: 17,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardInfo: {
    flex: 1,
    marginRight: 12,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginRight: 8,
  },
  popularBadge: {
    backgroundColor: 'rgba(226, 249, 173, 0.5)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  popularText: {
    fontSize: 12,
    color: '#374151',
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 17,
  },
  iconContainer: {
    width: 30,
    height: 30,
    backgroundColor: 'rgba(40, 160, 174, 0.1)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  metaSeparator: {
    fontSize: 12,
    color: '#6B7280',
    marginHorizontal: 8,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  sendButton: {
    flex: 1,
    backgroundColor: '#28A0AE',
    borderRadius: 8,
    paddingVertical: 11,
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  editButton: {
    width: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuestionnaireScreen; 