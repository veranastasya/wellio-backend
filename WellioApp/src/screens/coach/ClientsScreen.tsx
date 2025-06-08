import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

interface Client {
  id: string;
  name: string;
  program: string;
  status: 'active' | 'attention';
}

const DUMMY_CLIENTS: Client[] = [
  { id: '1', name: 'Sarah Johnson', program: 'Fitness Training', status: 'active' },
  { id: '2', name: 'Mike Chen', program: 'Nutrition Plan', status: 'attention' },
  { id: '3', name: 'Emma Wilson', program: 'Wellness Coaching', status: 'active' },
  { id: '4', name: 'James Brown', program: 'Fitness Training', status: 'active' },
];

const ClientsScreen = () => {
  const renderClient = ({ item }: { item: Client }) => (
    <TouchableOpacity style={styles.clientCard}>
      <View style={styles.clientInfo}>
        <Text style={styles.clientName}>{item.name}</Text>
        <Text style={styles.clientProgram}>{item.program}</Text>
      </View>
      <View style={[styles.statusBadge, item.status === 'attention' && styles.attentionBadge]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_CLIENTS}
        renderItem={renderClient}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  clientCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  clientProgram: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
  },
  attentionBadge: {
    backgroundColor: '#FF9800',
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
});

export default ClientsScreen; 