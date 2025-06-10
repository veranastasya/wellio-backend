import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  commonStyles,
  touchTargets,
  getSafeAreaTop,
} from '../../theme';

// Header Icons
const ArrowLeftIcon = () => (
  <Ionicons name="chevron-back" size={20} color={colors.primary} />
);

const SearchIcon = () => (
  <Ionicons name="search" size={20} color={colors.primary} />
);

const BellIcon = () => (
  <Ionicons name="notifications-outline" size={20} color={colors.primary} />
);

// Action Icons
const MessageIcon = () => (
  <Ionicons name="chatbubble-outline" size={14} color={colors.textTertiary} />
);

const ScheduleIcon = () => (
  <Ionicons name="calendar-outline" size={14} color={colors.textTertiary} />
);

const ProfileIcon = () => (
  <Ionicons name="person-outline" size={14} color={colors.primary} />
);

const MenuIcon = () => (
  <Ionicons name="ellipsis-vertical" size={16} color={colors.gray400} />
);

const SortIcon = () => (
  <Ionicons name="swap-vertical" size={16} color={colors.textTertiary} />
);

const GridIcon = () => (
  <Ionicons name="grid-outline" size={16} color={colors.textTertiary} />
);

const AddIcon = () => (
  <Ionicons name="add" size={20} color={colors.primary} />
);

const ImportIcon = () => (
  <Ionicons name="download-outline" size={16} color={colors.primary} />
);

const GroupIcon = () => (
  <Ionicons name="people-outline" size={16} color={colors.primary} />
);

// Types
interface Client {
  id: string;
  name: string;
  joinedDate: string;
  program: string;
  nextSession: string;
  status?: 'needsAttention';
  avatar: string;
}

type FilterTab = 'all' | 'active' | 'new' | 'inactive';
type CategoryFilter = 'all' | 'yoga' | 'nutrition' | 'fitness' | 'meditation';

// Sample data
const CLIENTS: Client[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    joinedDate: 'March 15, 2025',
    program: 'yoga',
    nextSession: 'May 15, 2025',
    avatar: 'https://example.com/avatar1.jpg',
  },
  {
    id: '2',
    name: 'David Chen',
    joinedDate: 'January 8, 2025',
    program: 'nutrition',
    nextSession: 'Today, 2:15 PM',
    avatar: 'https://example.com/avatar2.jpg',
  },
  {
    id: '3',
    name: 'Sarah Kim',
    joinedDate: 'February 22, 2025',
    program: 'yoga',
    nextSession: 'May 15, 2025',
    status: 'needsAttention',
    avatar: 'https://example.com/avatar3.jpg',
  },
  {
    id: '4',
    name: 'James Wilson',
    joinedDate: 'April 3, 2025',
    program: 'fitness',
    nextSession: 'May 18, 2025',
    avatar: 'https://example.com/avatar4.jpg',
  },
  {
    id: '5',
    name: 'Lisa Patel',
    joinedDate: 'March 30, 2025',
    program: 'meditation',
    nextSession: 'May 16, 2025',
    avatar: 'https://example.com/avatar5.jpg',
  },
];

const CATEGORY_COUNTS = {
  all: 28,
  yoga: 12,
  nutrition: 8,
  fitness: 5,
  meditation: 3,
};

const ClientsScreen = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [showActionSheet, setShowActionSheet] = useState(false);

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Clients</Text>
      </View>
      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.headerActionButton}>
          <SearchIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerActionButton}>
          <BellIcon />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFilterTabs = () => (
    <View style={styles.filterTabsContainer}>
      <View style={styles.filterTabs}>
        {[
          { key: 'all', label: 'All Clients' },
          { key: 'active', label: 'Active' },
          { key: 'new', label: 'New' },
          { key: 'inactive', label: 'Inactive' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.filterTab,
              activeTab === tab.key && styles.filterTabActive,
            ]}
            onPress={() => setActiveTab(tab.key as FilterTab)}
          >
            <Text
              style={[
                styles.filterTabText,
                activeTab === tab.key && styles.filterTabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderCategoryFilters = () => (
    <View style={styles.categoryFiltersContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryFilters}
      >
        {[
          { key: 'all', label: `All (${CATEGORY_COUNTS.all})` },
          { key: 'yoga', label: `Yoga (${CATEGORY_COUNTS.yoga})` },
          { key: 'nutrition', label: `Nutrition (${CATEGORY_COUNTS.nutrition})` },
          { key: 'fitness', label: `Fitness (${CATEGORY_COUNTS.fitness})` },
          { key: 'meditation', label: `Meditation (${CATEGORY_COUNTS.meditation})` },
        ].map((category) => (
          <TouchableOpacity
            key={category.key}
            style={[
              styles.categoryPill,
              activeCategory === category.key && styles.categoryPillActive,
            ]}
            onPress={() => setActiveCategory(category.key as CategoryFilter)}
          >
            <Text
              style={[
                styles.categoryPillText,
                activeCategory === category.key && styles.categoryPillTextActive,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderClientListHeader = () => (
    <View style={styles.clientListHeader}>
      <Text style={styles.clientListTitle}>28 Clients</Text>
      <View style={styles.clientListActions}>
        <TouchableOpacity style={styles.clientListActionButton}>
          <SortIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.clientListActionButton}>
          <GridIcon />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderClientCard = ({ item }: { item: Client }) => (
    <View style={styles.clientCard}>
      <View style={styles.clientCardHeader}>
        <View style={styles.clientInfo}>
          <View style={styles.clientAvatar}>
            <View style={commonStyles.avatarLarge} />
          </View>
          <View style={styles.clientDetails}>
            <Text style={styles.clientName}>{item.name}</Text>
            <Text style={styles.clientJoinedDate}>Joined: {item.joinedDate}</Text>
            <View style={styles.clientMeta}>
              <View style={styles.programTag}>
                <Text style={styles.programTagText}>
                  {item.program.charAt(0).toUpperCase() + item.program.slice(1)}
                </Text>
              </View>
              {item.status === 'needsAttention' && (
                <View style={styles.statusTag}>
                  <Text style={styles.statusTagText}>Needs Attention</Text>
                </View>
              )}
              {!item.status && (
                <Text style={styles.nextSession}>Next: {item.nextSession}</Text>
              )}
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <MenuIcon />
        </TouchableOpacity>
      </View>
      
      <View style={styles.clientActions}>
        <TouchableOpacity style={styles.actionButton}>
          <MessageIcon />
          <Text style={styles.actionButtonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <ScheduleIcon />
          <Text style={styles.actionButtonText}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButtonPrimary}>
          <ProfileIcon />
          <Text style={styles.actionButtonPrimaryText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderActionSheet = () => (
    <Modal
      visible={showActionSheet}
      transparent
      animationType="slide"
      onRequestClose={() => setShowActionSheet(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.actionSheet}>
          <View style={styles.actionSheetHandle} />
          <Text style={styles.actionSheetTitle}>Client Actions</Text>
          
          <View style={styles.actionSheetOptions}>
            <View style={styles.actionSheetOption}>
              <View style={styles.actionSheetIconContainer}>
                <AddIcon />
              </View>
              <Text style={styles.actionSheetOptionText}>Add Client</Text>
            </View>
            <View style={styles.actionSheetOption}>
              <View style={styles.actionSheetIconContainer}>
                <ImportIcon />
              </View>
              <Text style={styles.actionSheetOptionText}>Import</Text>
            </View>
            <View style={styles.actionSheetOption}>
              <View style={styles.actionSheetIconContainer}>
                <GroupIcon />
              </View>
              <Text style={styles.actionSheetOptionText}>Manage Groups</Text>
            </View>
          </View>

          <View style={styles.actionSheetButtons}>
            <TouchableOpacity style={styles.actionSheetPrimaryButton}>
              <Text style={styles.actionSheetPrimaryButtonText}>Add New Client</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionSheetSecondaryButton}
              onPress={() => setShowActionSheet(false)}
            >
              <Text style={styles.actionSheetSecondaryButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}
      {renderFilterTabs()}
      {renderCategoryFilters()}
      
      <View style={styles.clientListContainer}>
        {renderClientListHeader()}
        <FlatList
          data={CLIENTS}
          renderItem={renderClientCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.clientList}
        />
      </View>

      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => setShowActionSheet(true)}
      >
        <AddIcon />
      </TouchableOpacity>

      {renderActionSheet()}
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },

  // Header
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.sm,
  } as const,

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  } as const,

  backButton: {
    marginRight: spacing.sm,
    padding: spacing.xs,
  } as const,

  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    fontFamily: typography.fontFamily,
  } as const,

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  } as const,

  headerActionButton: {
    backgroundColor: colors.gray100,
    padding: spacing.sm,
    borderRadius: borderRadius.full,
    marginLeft: spacing.sm,
    minWidth: touchTargets.small,
    minHeight: touchTargets.small,
    justifyContent: 'center',
    alignItems: 'center',
  } as const,

  // Filter Tabs
  filterTabsContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    ...shadows.sm,
  } as const,

  filterTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  } as const,

  filterTab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  } as const,

  filterTabActive: {
    borderBottomColor: colors.primary,
  } as const,

  filterTabText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
  } as const,

  filterTabTextActive: {
    color: colors.primary,
  } as const,

  // Category Filters
  categoryFiltersContainer: {
    backgroundColor: colors.white,
    paddingVertical: spacing.md,
  } as const,

  categoryFilters: {
    paddingHorizontal: spacing.base,
  } as const,

  categoryPill: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
    minHeight: 32,
    justifyContent: 'center',
    ...shadows.sm,
  } as const,

  categoryPillActive: {
    backgroundColor: colors.primary,
  } as const,

  categoryPillText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    color: colors.gray700,
    fontFamily: typography.fontFamily,
  } as const,

  categoryPillTextActive: {
    color: colors.white,
  } as const,

  // Client List
  clientListContainer: {
    flex: 1,
    marginTop: spacing.base,
  } as const,

  clientListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    marginBottom: spacing.base,
  } as const,

  clientListTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  } as const,

  clientListActions: {
    flexDirection: 'row',
  } as const,

  clientListActionButton: {
    backgroundColor: colors.white,
    padding: spacing.xs,
    borderRadius: borderRadius.base,
    marginLeft: spacing.xs,
    minWidth: 28,
    minHeight: 26,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  } as const,

  clientList: {
    paddingHorizontal: spacing.base,
  } as const,

  // Client Card
  clientCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.base,
    marginBottom: spacing.md,
    ...shadows.sm,
  } as const,

  clientCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.base,
  } as const,

  clientInfo: {
    flexDirection: 'row',
    flex: 1,
  } as const,

  clientAvatar: {
    marginRight: spacing.base,
  } as const,

  clientDetails: {
    flex: 1,
  } as const,

  clientName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.xs,
  } as const,

  clientJoinedDate: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.normal,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.sm,
  } as const,

  clientMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  } as const,

  programTag: {
    backgroundColor: colors.secondaryBackground,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
  } as const,

  programTagText: {
    fontSize: typography.fontSize.xs,
    color: colors.primary,
    fontFamily: typography.fontFamily,
  } as const,

  statusTag: {
    backgroundColor: colors.warningBackground,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginLeft: spacing.sm,
  } as const,

  statusTagText: {
    fontSize: typography.fontSize.xs,
    color: colors.warningText,
    fontFamily: typography.fontFamily,
  } as const,

  nextSession: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
    marginLeft: spacing.sm,
  } as const,

  menuButton: {
    padding: spacing.xs,
    minWidth: touchTargets.small,
    minHeight: touchTargets.small,
    justifyContent: 'center',
    alignItems: 'center',
  } as const,

  // Client Actions
  clientActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  } as const,

  actionButton: {
    backgroundColor: colors.gray100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.base,
    flex: 1,
    marginRight: spacing.xs,
  } as const,

  actionButtonPrimary: {
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.base,
    flex: 1,
  } as const,

  actionButtonText: {
    fontSize: typography.fontSize.xs,
    color: colors.textTertiary,
    fontFamily: typography.fontFamily,
    marginLeft: spacing.xs,
  } as const,

  actionButtonPrimaryText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary,
    fontFamily: typography.fontFamily,
    marginLeft: spacing.xs,
  } as const,

  // Floating Action Button
  floatingActionButton: {
    position: 'absolute',
    bottom: 90,
    right: spacing.base,
    backgroundColor: colors.primary,
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.lg,
  } as const,

  // Action Sheet
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  } as const,

  actionSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    paddingBottom: getSafeAreaTop(),
    ...shadows.lg,
  } as const,

  actionSheetHandle: {
    width: 48,
    height: 4,
    backgroundColor: colors.gray300,
    borderRadius: borderRadius.full,
    alignSelf: 'center',
    marginTop: spacing.base,
    marginBottom: spacing.lg,
  } as const,

  actionSheetTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
    paddingHorizontal: spacing.base,
    marginBottom: spacing.lg,
  } as const,

  actionSheetOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.base,
    marginBottom: spacing.xl,
  } as const,

  actionSheetOption: {
    alignItems: 'center',
    flex: 1,
  } as const,

  actionSheetIconContainer: {
    backgroundColor: colors.secondary,
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  } as const,

  actionSheetOptionText: {
    fontSize: typography.fontSize.xs,
    color: colors.gray700,
    fontFamily: typography.fontFamily,
    textAlign: 'center',
  } as const,

  actionSheetButtons: {
    paddingHorizontal: spacing.base,
    gap: spacing.md,
  } as const,

  actionSheetPrimaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    minHeight: touchTargets.medium,
    justifyContent: 'center',
  } as const,

  actionSheetPrimaryButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.white,
    fontFamily: typography.fontFamily,
  } as const,

  actionSheetSecondaryButton: {
    backgroundColor: colors.gray100,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    minHeight: touchTargets.medium,
    justifyContent: 'center',
  } as const,

  actionSheetSecondaryButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    color: colors.gray700,
    fontFamily: typography.fontFamily,
  } as const,
};

export default ClientsScreen; 