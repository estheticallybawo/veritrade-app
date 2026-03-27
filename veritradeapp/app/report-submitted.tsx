import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ReportSubmittedScreen() {
  const params = useLocalSearchParams();
  const reportId = (params.reportId as string) || '#RT-0000';
  const businessName = (params.businessName as string) || 'Business';
  const categories = (params.categories as string)?.split(',') || ['Unknown'];

  const getCategoryLabel = (category: string) => {
    const categoryMap: Record<string, string> = {
      'fraud': 'Fraud',
      'incorrect_info': 'Incorrect Info',
      'inactive': 'Inactive',
      'unresponsive': 'Unresponsive',
      'poor_quality': 'Poor Quality',
      'other': 'Other'
    };
    return categoryMap[category] || category;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.successCircle}>
            <Ionicons name="checkmark" size={48} color="#fff" />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Report Submitted!</Text>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Your report for
            <Text style={styles.businessName}>{' '}{businessName}</Text>
            {' '}has been successfully submitted.
          </Text>
        </View>

        {/* Report Details Card */}
        <View style={styles.detailsCard}>
          {/* Report ID */}
          <View style={styles.detailRow}>
            <View style={styles.detailLabel}>
              <Ionicons name="document-outline" size={16} color="#1E3A5F" />
              <Text style={styles.detailLabelText}>Report ID</Text>
            </View>
            <Text style={styles.detailValue}>{reportId}</Text>
          </View>

          {/* Status */}
          <View style={styles.detailRow}>
            <View style={styles.detailLabel}>
              <Ionicons name="checkmark-circle-outline" size={16} color="#1E3A5F" />
              <Text style={styles.detailLabelText}>Status</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>UNDER INVESTIGATION</Text>
            </View>
          </View>

          {/* Report Categories */}
          <View style={styles.detailSection}>
            <View style={styles.detailLabel}>
              <Ionicons name="list-outline" size={16} color="#1E3A5F" />
              <Text style={styles.detailLabelText}>Report Categories</Text>
            </View>
            <View style={styles.categoriesContainer}>
              {categories.map((category, index) => (
                <View key={index} style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{getCategoryLabel(category.trim())}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Investigation Info */}
        <View style={styles.infoBanner}>
          <Ionicons name="information-circle" size={20} color="#0B78F5" />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Investigation in Progress</Text>
            <Text style={styles.bannerText}>
              Our team will review your report and take appropriate action within 24-48 hours. You can track the progress in your report history.
            </Text>
          </View>
        </View>

        {/* What Happens Next */}
        <View style={styles.nextStepsContainer}>
          <Text style={styles.nextStepsTitle}>What Happens Next?</Text>
          
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepLabel}>Review</Text>
              <Text style={styles.stepDescription}>Our verification team reviews your report</Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepLabel}>Investigation</Text>
              <Text style={styles.stepDescription}>We investigate the reported issues</Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepLabel}>Action</Text>
              <Text style={styles.stepDescription}>Appropriate action is taken and you're notified</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push('/home')}
        >
          <Text style={styles.primaryButtonText}>Go to Dashboard</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 120,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  descriptionContainer: {
    marginBottom: 28,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  businessName: {
    fontWeight: '700',
    color: '#1E3A5F',
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  detailSection: {
    paddingVertical: 16,
  },
  detailLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabelText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    fontFamily: 'monospace',
  },
  statusBadge: {
    backgroundColor: '#E2F1FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0B78F5',
    letterSpacing: 0.5,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  categoryBadge: {
    backgroundColor: '#F0F4F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1E0F3',
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E3A5F',
  },
  infoBanner: {
    backgroundColor: '#E2F1FE',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    gap: 12,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0B78F5',
    marginBottom: 4,
  },
  bannerText: {
    fontSize: 12,
    color: '#0B49F5',
    lineHeight: 18,
  },
  nextStepsContainer: {
    marginBottom: 24,
  },
  nextStepsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1E3A5F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  stepContent: {
    flex: 1,
    justifyContent: 'center',
  },
  stepLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  stepDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: '#1E3A5F',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  buttonIcon: {
    marginLeft: 4,
  },
});
