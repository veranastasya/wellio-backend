import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isFromCoach: boolean;
  attachment?: {
    type: 'file' | 'image';
    name: string;
    url?: string;
  };
}

interface ChatScreenProps {
  navigation: any;
  route?: {
    params?: {
      clientName?: string;
      clientAvatar?: string;
      isOnline?: boolean;
    };
  };
}

const ChatScreen: React.FC<ChatScreenProps> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { clientName = 'Emma Johnson', clientAvatar, isOnline = true } = route?.params || {};
  const scrollViewRef = useRef<ScrollView>(null);

  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi Coach! Thanks for the new workout plan 🏋️‍♀️',
      timestamp: '10:05',
      isFromCoach: false,
    },
    {
      id: '2',
      text: "Quick question about tomorrow's session!",
      timestamp: '10:06',
      isFromCoach: false,
    },
    {
      id: '3',
      text: 'Of course, Emma! What would you like to ask? 🙂',
      timestamp: '10:07',
      isFromCoach: true,
    },
    {
      id: '4',
      text: '',
      timestamp: '10:08',
      isFromCoach: false,
      attachment: {
        type: 'file',
        name: 'progress_photo.jpg',
      },
    },
    {
      id: '5',
      text: "Got your photo! You're making great progress 👏",
      timestamp: '10:09',
      isFromCoach: true,
    },
  ]);

  const [inputText, setInputText] = useState('');

  // Quick suggestion options
  const quickSuggestions = [
    "Let me check that for you",
    "Would you like to reschedule?", 
    "Awesome job! 👍",
    "How was your day?",
    "Great progress!",
    "Keep it up! 💪",
  ];

  // Send message
  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        isFromCoach: true,
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      
      // Auto scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  // Send quick suggestion
  const sendQuickSuggestion = (suggestion: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: suggestion,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      isFromCoach: true,
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Auto scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // Handle attachments
  const handleAttachment = () => {
    Alert.alert(
      'Add Attachment',
      'Choose attachment type:',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Photo', onPress: () => handlePhotoAttachment() },
        { text: 'File', onPress: () => handleFileAttachment() },
      ]
    );
  };

  const handlePhotoAttachment = () => {
    Alert.alert('Photo Attachment', 'Photo attachment feature coming soon!');
  };

  const handleFileAttachment = () => {
    Alert.alert('File Attachment', 'File attachment feature coming soon!');
  };

  // Render message bubble
  const renderMessage = (message: Message) => {
    const isCoach = message.isFromCoach;
    
    return (
      <View key={message.id} style={[styles.messageContainer, isCoach && styles.coachMessageContainer]}>
        {!isCoach && (
          <Image 
            source={{ uri: clientAvatar || 'https://via.placeholder.com/32x32' }} 
            style={styles.messageAvatar}
          />
        )}
        
        <View style={styles.messageBubbleContainer}>
          <View style={[
            styles.messageBubble,
            isCoach ? (message.text.includes('progress') ? styles.secondaryCoachBubble : styles.coachMessageBubble) : styles.clientMessageBubble
          ]}>
            {message.attachment ? (
              <View style={styles.attachmentContainer}>
                <Ionicons name="attach" size={12} color={colors.primary} />
                <Text style={styles.attachmentText}>{message.attachment.name}</Text>
              </View>
            ) : (
              <Text style={[
                styles.messageText,
                isCoach ? styles.coachMessageText : styles.clientMessageText,
                message.text.includes('progress') && styles.secondaryMessageText
              ]}>
                {message.text}
              </Text>
            )}
          </View>
          <Text style={[styles.messageTime, isCoach && styles.coachMessageTime]}>
            {message.timestamp}
          </Text>
        </View>

        {isCoach && (
          <Image 
            source={{ uri: 'https://via.placeholder.com/32x32' }} 
            style={styles.messageAvatar}
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Platform.OS === 'android' ? insets.top : 0 }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={16} color="#4B5563" />
            </TouchableOpacity>
            <View style={styles.clientInfo}>
              <Image 
                source={{ uri: clientAvatar || 'https://via.placeholder.com/36x36' }} 
                style={styles.headerAvatar}
              />
              <View style={styles.clientDetails}>
                <Text style={styles.clientName}>{clientName}</Text>
                <Text style={styles.onlineStatus}>{isOnline ? 'Online' : 'Offline'}</Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="ellipsis-vertical" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.chatContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.chatContent}
      >
        {/* Today separator */}
        <View style={styles.dateSeparator}>
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>Today</Text>
          </View>
        </View>

        {/* Messages */}
        {messages.map(renderMessage)}
      </ScrollView>

      {/* Quick Suggestions */}
      <View style={styles.quickSuggestionsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickSuggestionsContent}
        >
          {quickSuggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionButton}
              onPress={() => sendQuickSuggestion(suggestion)}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <View style={styles.inputContent}>
          <TouchableOpacity style={styles.inputButton}>
            <Ionicons name="happy-outline" size={20} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.inputButton} onPress={handleAttachment}>
            <Ionicons name="attach" size={16} color={colors.primary} />
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            placeholder="Type your message..."
            placeholderTextColor="#ADAEBC"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />

          <TouchableOpacity 
            style={[styles.sendButton, { opacity: inputText.trim() ? 1 : 0.6 }]}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  headerContent: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  headerLeft: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    flex: 1,
  },
  backButton: {
    marginRight: 12,
  },
  clientInfo: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#E2F9AD',
    marginRight: 12,
  },
  clientDetails: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#28A0AE',
    marginBottom: 2,
  },
  onlineStatus: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  menuButton: {
    width: 20,
    height: 32,
    backgroundColor: 'rgba(226, 249, 173, 0.5)',
    borderRadius: 16,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  chatContent: {
    paddingVertical: 16,
  },
  dateSeparator: {
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  dateBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  dateText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  messageContainer: {
    flexDirection: 'row' as const,
    marginBottom: 16,
    alignItems: 'flex-end' as const,
  },
  coachMessageContainer: {
    flexDirection: 'row-reverse' as const,
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  messageBubbleContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  messageBubble: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    maxWidth: '85%' as const,
  },
  clientMessageBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 2,
  },
  coachMessageBubble: {
    backgroundColor: '#28A0AE',
    borderBottomRightRadius: 2,
    alignSelf: 'flex-end' as const,
  },
  secondaryCoachBubble: {
    backgroundColor: '#E2F9AD',
    borderBottomRightRadius: 2,
    alignSelf: 'flex-end' as const,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 17,
  },
  clientMessageText: {
    color: '#1F2937',
  },
  coachMessageText: {
    color: '#FFFFFF',
  },
  secondaryMessageText: {
    color: '#111827',
  },
  messageTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    marginLeft: 8,
  },
  coachMessageTime: {
    textAlign: 'right' as const,
    marginLeft: 0,
    marginRight: 8,
  },
  attachmentContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  attachmentText: {
    fontSize: 14,
    color: '#28A0AE',
    textDecorationLine: 'underline' as const,
    marginLeft: 8,
  },
  quickSuggestionsContainer: {
    paddingVertical: 8,
  },
  quickSuggestionsContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  suggestionButton: {
    backgroundColor: '#E2F9AD',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#28A0AE',
    textAlign: 'center' as const,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  inputContent: {
    flexDirection: 'row' as const,
    alignItems: 'flex-end' as const,
    gap: 8,
  },
  inputButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1F2937',
    maxHeight: 100,
  },
  sendButton: {
    width: 34,
    height: 36,
    backgroundColor: '#28A0AE',
    borderRadius: 17,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
};

export default ChatScreen; 