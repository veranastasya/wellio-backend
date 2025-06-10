import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AvatarPlaceholderProps {
  name: string;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
}

const AvatarPlaceholder: React.FC<AvatarPlaceholderProps> = ({
  name,
  size = 40,
  backgroundColor,
  textColor = '#FFFFFF'
}) => {
  const getInitials = (fullName: string) => {
    const names = fullName.split(' ');
    if (names.length >= 2) {
      return `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase();
    }
    return fullName.charAt(0).toUpperCase();
  };

  const getBackgroundColor = (fullName: string) => {
    if (backgroundColor) return backgroundColor;
    
    // Generate a consistent color based on the name
    const colors = [
      '#28A0AE', '#E2F9AD', '#6366F1', '#8B5CF6', 
      '#EC4899', '#EF4444', '#F59E0B', '#10B981',
      '#3B82F6', '#6B7280'
    ];
    
    let hash = 0;
    for (let i = 0; i < fullName.length; i++) {
      hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <View 
      style={[
        styles.avatar, 
        { 
          width: size, 
          height: size, 
          borderRadius: size / 2,
          backgroundColor: getBackgroundColor(name)
        }
      ]}
    >
      <Text style={[styles.initials, { color: textColor, fontSize: size * 0.4 }]}>
        {getInitials(name)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontWeight: '600',
  },
});

export default AvatarPlaceholder; 