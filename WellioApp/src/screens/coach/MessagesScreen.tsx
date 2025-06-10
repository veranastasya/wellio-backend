import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
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
  <Ionicons name="chevron-back" size={20} color={colors.textTertiary} />
);

const MenuIcon = () => (
  <Ionicons name="ellipsis-vertical" size={20} color={colors.primary} />
);

const SearchIcon = () => (
  <Ionicons name="search" size={16} color={colors.gray400} />
);

const EditIcon = () => (
  <Ionicons name="create-outline" size={20} color={colors.white} />
);

// Types
interface Message {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  avatar: string;
  unreadCount?: number;
}

// Sample data
const UNREAD_MESSAGES: Message[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    message: 'Thanks for the new workout plan! Quick question about...',
    timestamp: '12m ago',
    avatar: 'https://example.com/avatar1.jpg',
    unreadCount: 3,
  },
  {
    id: '2',
    name: 'David Chen',
    message: "Here's my meal log for today 📸",
    timestamp: '45m ago',
    avatar: 'https://example.com/avatar2.jpg',
    unreadCount: 1,
  },
];

const RECENT_CONVERSATIONS: Message[] = [
  {
    id: '3',
    name: 'Sarah Kim',
    message: 'Great session today! See you next week 🙌',
    timestamp: '2h ago',
    avatar: 'https://example.com/avatar3.jpg',
  },
  {
    id: '4',
    name: 'Lisa Patel',
    message: 'Could you share that meditation guide?',
    timestamp: 'Yesterday',
    avatar: 'https://example.com/avatar4.jpg',
  },
  {
    id: '5',
    name: 'Mike Thomas',
    message: 'You: Let me know if you need to reschedule',
    timestamp: 'Yesterday',
    avatar: 'https://example.com/avatar5.jpg',
  },
];

const MessagesScreen = () => {
  const [searchText, setSearchText] = useState('');

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <TouchableOpacity style={styles.headerButton}>
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      <TouchableOpacity style={styles.headerMenuButton}>
        <MenuIcon />
      </TouchableOpacity>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <SearchIcon />
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations..."
          placeholderTextColor={colors.gray400}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
    </View>
  );

  const renderAutomatedMessaging = () => (
    <View style={styles.automatedMessagingContainer}>
      <View style={styles.automatedMessagingContent}>
        <View style={styles.automatedMessagingText}>
          <Text style={styles.automatedMessagingTitle}>Automated Messaging</Text>
          <Text style={styles.automatedMessagingSubtitle}>
            Stay connected with clients automatically
          </Text>
        </View>
        <TouchableOpacity style={styles.setUpButton}>
          <Text style={styles.setUpButtonText}>Set Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderMessageItem = ({ item, showBadge = false }: { item: Message; showBadge?: boolean }) => (
    <TouchableOpacity style={styles.messageCard}>
      <View style={styles.messageContent}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar} />
          {showBadge && item.unreadCount && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
        <View style={styles.messageDetails}>
          <Text style={styles.messageName}>{item.name}</Text>
          <Text style={styles.messageText} numberOfLines={1}>
            {item.message}
          </Text>
        </View>
      </View>
      <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
    </TouchableOpacity>
  );

  const renderUnreadMessages = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Unread Messages (9)</Text>
      <FlatList
        data={UNREAD_MESSAGES}
        renderItem={({ item }) => renderMessageItem({ item, showBadge: true })}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );

  const renderRecentConversations = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Recent Conversations</Text>
      <FlatList
        data={RECENT_CONVERSATIONS}
        renderItem={({ item }) => renderMessageItem({ item, showBadge: false })}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderSearchBar()}
        {renderAutomatedMessaging()}
        {renderUnreadMessages()}
        {renderRecentConversations()}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.floatingActionButton}>
        <EditIcon />
      </TouchableOpacity>
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

  headerButton: {
    marginRight: spacing.sm,
    padding: spacing.xs,
  } as const,

  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    fontFamily: typography.fontFamily,
  } as const,

  headerMenuButton: {
    backgroundColor: colors.secondaryLight,
    padding: spacing.xs,
    borderRadius: borderRadius.full,
    minWidth: touchTargets.small,
    minHeight: touchTargets.small,
    justifyContent: 'center',
    alignItems: 'center',
  } as const,

  // Content
  content: {
    flex: 1,
  } as const,

  scrollContent: {
    paddingBottom: 100, // Space for floating button
  } as const,

  // Search Bar
  searchContainer: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    backgroundColor: colors.backgroundLight,
  } as const,

  searchInputContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.gray100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    minHeight: 46,
  } as const,

  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily,
    color: colors.textPrimary,
  } as const,

  // Automated Messaging
  automatedMessagingContainer: {
    marginHorizontal: spacing.base,
    marginBottom: spacing.lg,
  } as const,

  automatedMessagingContent: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
  } as const,

  automatedMessagingText: {
    marginBottom: spacing.base,
  } as const,

  automatedMessagingTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.white,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.xs,
  } as const,

  automatedMessagingSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.white,
    fontFamily: typography.fontFamily,
  } as const,

  setUpButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  } as const,

  setUpButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary,
    fontFamily: typography.fontFamily,
  } as const,

  // Sections
  sectionContainer: {
    marginHorizontal: spacing.base,
    marginBottom: spacing.lg,
  } as const,

  sectionTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.base,
  } as const,

  // Message Cards
  messageCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.base,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.sm,
  } as const,

  messageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  } as const,

  avatarContainer: {
    position: 'relative',
    marginRight: spacing.md,
  } as const,

  avatar: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray200,
  } as const,

  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  } as const,

  notificationBadgeText: {
    fontSize: 10,
    fontWeight: typography.fontWeight.normal,
    color: colors.white,
    fontFamily: typography.fontFamily,
  } as const,

  messageDetails: {
    flex: 1,
  } as const,

  messageName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.xs,
  } as const,

  messageText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
  } as const,

  messageTimestamp: {
    fontSize: typography.fontSize.xs,
    color: colors.gray400,
    fontFamily: typography.fontFamily,
    marginLeft: spacing.sm,
  } as const,

  // Floating Action Button
  floatingActionButton: {
    position: 'absolute',
    bottom: 90, // Account for bottom navigation
    right: spacing.base,
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.lg,
  } as const,
};

export default MessagesScreen; 