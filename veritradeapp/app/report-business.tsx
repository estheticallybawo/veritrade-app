import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useReports } from '../contexts/ReportContext';
import { ReportCategory, setCurrentUserEmailForReports } from '../services/report';
import { useUser } from '../contexts/UserContext';

const REPORT_CATEGORIES: { label: string; value: ReportCategory; icon: string; description: string }[] = [
  { label: 'Fraud', value: 'fraud', icon: 'alert-circle', description: 'Suspicious or fraudulent activity' },
  { label: 'Incorrect Info', value: 'incorrect_info', icon: 'close-circle', description: 'Wrong business details' },
  { label: 'Inactive', value: 'inactive', icon: 'ban', description: 'Business no longer operating' },
  { label: 'Unresponsive', value: 'unresponsive', icon: 'call-outline', description: 'Cannot reach business' },
  { label: 'Poor Quality', value: 'poor_quality', icon: 'thumbs-down', description: 'Poor service or quality' },
  { label: 'Other', value: 'other', icon: 'help-circle', description: 'Other issues' },
];

export default function ReportBusinessScreen() {
  const { user } = useUser();
  const { submitReport, isLoading } = useReports();

  const [businessName, setBusinessName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<ReportCategory[]>([]);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCategoryToggle = (category: ReportCategory) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        // Remove if already selected
        return prev.filter((c) => c !== category);
      } else if (prev.length < 3) {
        // Add if not selected and less than 3
        return [...prev, category];
      }
      return prev;
    });
  };

  const handleSubmitReport = async () => {
    if (!businessName.trim()) {
      Alert.alert('Missing Information', 'Please enter the business name');
      return;
    }

    if (selectedCategories.length === 0) {
      Alert.alert('Missing Information', 'Please select at least one report category');
      return;
    }

    if (!description.trim() || description.trim().length < 10) {
      Alert.alert('Required Details', 'Please provide at least 10 characters of description');
      return;
    }

    setIsSubmitting(true);
    try {
      // Set current user for mock data
      if (user?.email) {
        setCurrentUserEmailForReports(user.email);
      }

      // Submit report with multiple categories as comma-separated string
      const newReport = await submitReport({
        business_name: businessName.trim(),
        registration_number: registrationNumber.trim() || undefined,
        category: selectedCategories[0], // Main category
        description: description.trim(),
        additional_categories: selectedCategories.slice(1),
      });

      // Generate report ID
      const reportId = `#RT-${String(newReport.id || Math.random()).padStart(6, '0')}`;
      const categoriesString = selectedCategories.join(',');

      // Navigate to report submitted screen
      router.replace({
        pathname: '/report-submitted',
        params: {
          reportId,
          businessName: businessName.trim(),
          categories: categoriesString,
        }
      });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to submit report. Please try again.');
      console.error('Report submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report a Business</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="information-circle" size={20} color="#0B78F5" />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Help Keep VeriTrade Safe</Text>
            <Text style={styles.bannerText}>
              Report businesses with fraudulent activities or inaccurate information to help protect our community.
            </Text>
          </View>
        </View>

        {/* Business Information Section */}
        <Text style={styles.sectionTitle}>BUSINESS INFORMATION</Text>

        {/* Business Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Business Name *</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="business-outline" size={20} color="#9CA3AF" />
            <TextInput
              style={styles.input}
              placeholder="Enter business name"
              placeholderTextColor="#9CA3AF"
              value={businessName}
              onChangeText={setBusinessName}
              editable={!isSubmitting}
              autoCapitalize="words"
            />
          </View>
        </View>

        {/* Registration Number Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Registration Number (Optional)</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="document-text-outline" size={20} color="#9CA3AF" />
            <TextInput
              style={styles.input}
              placeholder="RC-XXXXXX or BN-XXXXXX"
              placeholderTextColor="#9CA3AF"
              value={registrationNumber}
              onChangeText={setRegistrationNumber}
              editable={!isSubmitting}
              autoCapitalize="characters"
            />
          </View>
        </View>

        {/* Report Category Section */}
        <Text style={styles.sectionTitle}>REPORT CATEGORIES *</Text>
        <Text style={styles.sectionSubtitle}>Select up to 3 reasons for reporting this business:</Text>
        <Text style={styles.categoryCount}>{selectedCategories.length} / 3 selected</Text>

        <View style={styles.categoryGrid}>
          {REPORT_CATEGORIES.map((category) => {
            const isSelected = selectedCategories.includes(category.value);
            return (
              <TouchableOpacity
                key={category.value}
                style={[
                  styles.categoryCard,
                  isSelected && styles.categoryCardSelected,
                ]}
                onPress={() => handleCategoryToggle(category.value)}
                disabled={isSubmitting || (selectedCategories.length === 3 && !isSelected)}
              >
                {isSelected && (
                  <View style={styles.categoryCheckmark}>
                    <Ionicons name="checkmark-circle" size={20} color="#fff" />
                  </View>
                )}
                <View
                  style={[
                    styles.categoryIcon,
                    isSelected && styles.categoryIconSelected,
                  ]}
                >
                  <Ionicons
                    name={category.icon as any}
                    size={24}
                    color={isSelected ? '#fff' : '#1E3A5F'}
                  />
                </View>
                <Text
                  style={[
                    styles.categoryLabel,
                    isSelected && styles.categoryLabelSelected,
                  ]}
                >
                  {category.label}
                </Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Description Section */}
        <Text style={styles.sectionTitle}>REPORT DETAILS</Text>

        {/* Description Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description (min. 10 characters) *</Text>
          <View style={[styles.inputContainer, styles.textAreaContainer]}>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Provide detailed information about your report..."
              placeholderTextColor="#9CA3AF"
              value={description}
              onChangeText={setDescription}
              editable={!isSubmitting}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>
          <Text style={styles.charCount}>
            {description.length} / 500 characters
          </Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && { opacity: 0.6 }]}
          onPress={handleSubmitReport}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="send" size={20} color="#fff" />
              <Text style={styles.submitButtonText}>Submit Report</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Legal Note */}
        <View style={styles.legalNote}>
          <Text style={styles.legalText}>
            By submitting a report, you agree to our Terms of Service. False or malicious reports may result in account suspension.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  infoBanner: {
    backgroundColor: '#E2F1FE',
    borderRadius: 12,
    padding: 16,
    marginBottom: 28,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0B78F5',
    marginBottom: 4,
  },
  bannerText: {
    fontSize: 12,
    color: '#0B49F5',
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E3A5F',
    marginBottom: 12,
    letterSpacing: 1,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  textAreaContainer: {
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 14,
    color: '#1F2937',
  },
  textArea: {
    paddingVertical: 8,
  },
  charCount: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 6,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  categoryCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryCardSelected: {
    borderColor: '#1E3A5F',
    backgroundColor: '#F0F4F9',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIconSelected: {
    backgroundColor: '#1E3A5F',
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  categoryLabelSelected: {
    color: '#1E3A5F',
  },
  categoryDescription: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 14,
  },
  categoryCount: {
    fontSize: 11,
    color: '#0B78F5',
    fontWeight: '600',
    marginBottom: 12,
  },
  categoryCheckmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: '#1E3A5F',
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  legalNote: {
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  legalText: {
    fontSize: 11,
    color: '#7F1D1D',
    lineHeight: 16,
  },
});
