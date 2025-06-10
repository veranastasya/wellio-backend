import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  heightFeet: string;
  heightInches: string;
  currentWeight: string;
  goalWeight: string;
  programType: 'Weight Loss' | 'Muscle Gain' | 'General Fitness' | 'Custom' | '';
  programDuration: string;
  startDate: string;
  additionalNotes: string;
  joinedDate: string;
  status: 'Active' | 'New' | 'Inactive';
}

interface ClientOnboardingScreenProps {
  navigation: any;
}

const ClientOnboardingScreen: React.FC<ClientOnboardingScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  // Form state
  const [formData, setFormData] = useState<Partial<Client>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    heightFeet: '',
    heightInches: '',
    currentWeight: '',
    goalWeight: '',
    programType: '',
    programDuration: '30 Days',
    startDate: '',
    additionalNotes: '',
  });

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Program type options
  const programTypes = [
    { id: 'Weight Loss', name: 'Weight Loss', icon: 'fitness-outline' },
    { id: 'Muscle Gain', name: 'Muscle Gain', icon: 'barbell-outline' },
    { id: 'General Fitness', name: 'General Fitness', icon: 'heart-outline' },
    { id: 'Custom', name: 'Custom', icon: 'settings-outline' },
  ];

  // Update form data
  const updateFormData = (field: keyof Client, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    
    // Clear error for this field
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
    
    // Validate form
    validateForm(newFormData);
  };

  // Validate form
  const validateForm = (data: Partial<Client>) => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!data.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!data.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!data.email?.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = 'Email is invalid';
    if (!data.programType) newErrors.programType = 'Program type is required';
    if (!data.programDuration) newErrors.programDuration = 'Program duration is required';
    
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  // Handle save
  const handleSave = () => {
    if (!isFormValid) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

    // Create client with generated ID and current date
    const newClient: Client = {
      id: Date.now().toString(),
      firstName: formData.firstName!,
      lastName: formData.lastName!,
      email: formData.email!,
      phone: formData.phone || '',
      age: formData.age || '',
      heightFeet: formData.heightFeet || '',
      heightInches: formData.heightInches || '',
      currentWeight: formData.currentWeight || '',
      goalWeight: formData.goalWeight || '',
      programType: formData.programType as Client['programType'],
      programDuration: formData.programDuration!,
      startDate: formData.startDate || new Date().toLocaleDateString(),
      additionalNotes: formData.additionalNotes || '',
      joinedDate: new Date().toLocaleDateString(),
      status: 'New',
    };

    // Success message and navigate back
    Alert.alert(
      'Success!', 
      `Client ${newClient.firstName} ${newClient.lastName} has been added successfully.`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('MainTabs', { screen: 'Clients' }),
        },
      ]
    );
  };

  // Generate welcome message (AI suggestion)
  const generateWelcomeMessage = () => {
    const clientName = formData.firstName || 'Client';
    const program = formData.programType || 'fitness program';
    Alert.alert(
      'Welcome Message Generated',
      `Hi ${clientName}! Welcome to your personalized ${program.toLowerCase()} journey. We're excited to help you achieve your health goals!`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Platform.OS === 'android' ? insets.top : 0 }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={16} color={colors.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add Client</Text>
          </View>
          <TouchableOpacity
            style={[styles.saveButton, { opacity: isFormValid ? 1 : 0.6 }]}
            onPress={handleSave}
            disabled={!isFormValid}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Basic Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>First Name*</Text>
            <TextInput
              style={[styles.input, errors.firstName && styles.inputError]}
              placeholder="Enter first name"
              placeholderTextColor="#ADAEBC"
              value={formData.firstName}
              onChangeText={(text) => updateFormData('firstName', text)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Last Name*</Text>
            <TextInput
              style={[styles.input, errors.lastName && styles.inputError]}
              placeholder="Enter last name"
              placeholderTextColor="#ADAEBC"
              value={formData.lastName}
              onChangeText={(text) => updateFormData('lastName', text)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email Address*</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Enter email address"
              placeholderTextColor="#ADAEBC"
              value={formData.email}
              onChangeText={(text) => updateFormData('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              placeholderTextColor="#ADAEBC"
              value={formData.phone}
              onChangeText={(text) => updateFormData('phone', text)}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Health Metrics Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Health Metrics</Text>
            <Text style={styles.optionalLabel}>Optional</Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Years"
              placeholderTextColor="#ADAEBC"
              value={formData.age}
              onChangeText={(text) => updateFormData('age', text)}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Height</Text>
            <View style={styles.heightInputs}>
              <TextInput
                style={[styles.input, styles.heightInput]}
                placeholder="ft"
                placeholderTextColor="#ADAEBC"
                value={formData.heightFeet}
                onChangeText={(text) => updateFormData('heightFeet', text)}
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.input, styles.heightInput]}
                placeholder="in"
                placeholderTextColor="#ADAEBC"
                value={formData.heightInches}
                onChangeText={(text) => updateFormData('heightInches', text)}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Current Weight</Text>
            <View style={styles.weightInput}>
              <TextInput
                style={styles.weightTextInput}
                placeholder="Enter weight"
                placeholderTextColor="#ADAEBC"
                value={formData.currentWeight}
                onChangeText={(text) => updateFormData('currentWeight', text)}
                keyboardType="numeric"
              />
              <View style={styles.weightUnit}>
                <Text style={styles.unitText}>lbs</Text>
              </View>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Goal Weight</Text>
            <View style={styles.weightInput}>
              <TextInput
                style={styles.weightTextInput}
                placeholder="Enter goal weight"
                placeholderTextColor="#ADAEBC"
                value={formData.goalWeight}
                onChangeText={(text) => updateFormData('goalWeight', text)}
                keyboardType="numeric"
              />
              <View style={styles.weightUnit}>
                <Text style={styles.unitText}>lbs</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Program Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Program Settings</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Program Type*</Text>
            <View style={styles.programTypeGrid}>
              {programTypes.map((program) => (
                <TouchableOpacity
                  key={program.id}
                  style={[
                    styles.programTypeButton,
                    formData.programType === program.id && styles.programTypeButtonSelected
                  ]}
                  onPress={() => updateFormData('programType', program.id)}
                >
                  <Ionicons 
                    name={program.icon as any} 
                    size={16} 
                    color={formData.programType === program.id ? colors.primary : colors.textSecondary} 
                  />
                  <Text style={[
                    styles.programTypeText,
                    formData.programType === program.id && styles.programTypeTextSelected
                  ]}>
                    {program.name}
                  </Text>
                  {formData.programType === program.id && (
                    <Ionicons name="checkmark" size={14} color={colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Program Duration*</Text>
            <View style={styles.dropdown}>
              <Text style={styles.dropdownText}>{formData.programDuration}</Text>
              <Ionicons name="chevron-down" size={16} color={colors.textPrimary} />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Start Date</Text>
            <View style={styles.dateInput}>
              <Text style={styles.dateText}>
                {formData.startDate || 'mm/dd/yyyy'}
              </Text>
              <Ionicons name="calendar-outline" size={24} color={colors.textPrimary} />
            </View>
          </View>
        </View>

        {/* Additional Notes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Notes</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Enter any additional notes about this client"
            placeholderTextColor="#ADAEBC"
            value={formData.additionalNotes}
            onChangeText={(text) => updateFormData('additionalNotes', text)}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        {/* AI Suggestion Section */}
        <View style={styles.aiSuggestionSection}>
          <View style={styles.aiSuggestionContent}>
            <View style={styles.aiIcon}>
              <Ionicons name="bulb-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.aiSuggestionText}>
              <Text style={styles.aiSuggestionTitle}>AI Suggestion</Text>
              <Text style={styles.aiSuggestionDescription}>
                Based on the client's profile, I recommend a 30-day weight loss program with a focus on nutrition. Would you like me to generate a welcome message?
              </Text>
              <TouchableOpacity style={styles.aiSuggestionButton} onPress={generateWelcomeMessage}>
                <Text style={styles.aiSuggestionButtonText}>Generate Welcome Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Bottom spacing for navigation */}
        <View style={{ height: 100 }} />
      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  headerLeft: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: '#1F2937',
  },
  saveButton: {
    backgroundColor: '#28A0AE',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500' as const,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#1F2937',
    marginBottom: 16,
  },
  optionalLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#374151',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1F2937',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  heightInputs: {
    flexDirection: 'row' as const,
    gap: 8,
  },
  heightInput: {
    flex: 1,
  },
  weightInput: {
    flexDirection: 'row' as const,
  },
  weightTextInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1F2937',
  },
  weightUnit: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: '#D1D5DB',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    minWidth: 48,
  },
  unitText: {
    fontSize: 16,
    color: '#374151',
  },
  programTypeGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: 8,
  },
  programTypeButton: {
    width: '48%' as const,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center' as const,
    minHeight: 68,
    justifyContent: 'center' as const,
  },
  programTypeButtonSelected: {
    borderColor: '#28A0AE',
    backgroundColor: 'rgba(40, 160, 174, 0.1)',
  },
  programTypeText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#1F2937',
    marginTop: 4,
  },
  programTypeTextSelected: {
    color: '#1F2937',
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  dropdownText: {
    fontSize: 16,
    color: '#1F2937',
  },
  dateInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  dateText: {
    fontSize: 18,
    color: '#000000',
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
    minHeight: 122,
  },
  aiSuggestionSection: {
    backgroundColor: 'rgba(226, 249, 173, 0.3)',
    borderWidth: 1,
    borderColor: '#E2F9AD',
    borderRadius: 12,
    padding: 17,
    marginBottom: 16,
  },
  aiSuggestionContent: {
    flexDirection: 'row' as const,
    gap: 12,
  },
  aiIcon: {
    width: 36,
    height: 32,
    backgroundColor: 'rgba(40, 160, 174, 0.2)',
    borderRadius: 9999,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  aiSuggestionText: {
    flex: 1,
  },
  aiSuggestionTitle: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#1F2937',
    marginBottom: 4,
  },
  aiSuggestionDescription: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 16.8,
    marginBottom: 12,
  },
  aiSuggestionButton: {
    backgroundColor: '#28A0AE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start' as const,
  },
  aiSuggestionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500' as const,
  },
};

export default ClientOnboardingScreen; 