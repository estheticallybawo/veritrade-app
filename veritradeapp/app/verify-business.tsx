import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function VerifyBusinessScreen() {
  const [businessName, setBusinessName] = useState('');
  const [rcNumber, setRcNumber] = useState('');
  const [document, setDocument] = useState<any>(null);

  const handleSubmit = () => {
    // Handle form submission
    console.log('Submitting verification:', { businessName, rcNumber, document });
    // Navigate to success screen
    router.push('/request-submitted');
  };

  const handleDocumentUpload = () => {
    // Handle document upload
    console.log('Upload document');
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
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Verify Business</Text>
          <Text style={styles.headerSubtitle}>STEP 1 OF 1</Text>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <View style={styles.infoIconCircle}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#1E3A5F" />
          </View>
          <Text style={styles.infoText}>
            Enter the details exactly as they appear on the CAC registration certificate for faster verification.
          </Text>
        </View>

        {/* Business Name Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Business Name</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="business-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="e.g. Aliko & Sons Ltd"
              placeholderTextColor="#9CA3AF"
              value={businessName}
              onChangeText={setBusinessName}
            />
          </View>
        </View>

        {/* RC/BN Number Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>RC / BN Number</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.hashIcon}>#</Text>
            <TextInput
              style={styles.input}
              placeholder="RC-123456"
              placeholderTextColor="#9CA3AF"
              value={rcNumber}
              onChangeText={setRcNumber}
            />
          </View>
          <Text style={styles.formatHint}>Format: RC followed by 6-8 digits</Text>
        </View>

        {/* Supporting Document */}
        <View style={styles.documentSection}>
          <Text style={styles.sectionLabel}>ADDITIONAL SUPPORTING DOCUMENT</Text>
          <TouchableOpacity 
            style={styles.uploadCard}
            onPress={handleDocumentUpload}
          >
            <View style={styles.cameraIconCircle}>
              <Ionicons name="camera-outline" size={32} color="#1E3A5F" />
            </View>
            <Text style={styles.uploadTitle}>Upload CAC Certificate</Text>
            <Text style={styles.uploadSubtitle}>PDF, JPG or PNG (Max 5MB)</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit for Review</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.submitArrow} />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/home')}
        >
          <Ionicons name="home-outline" size={24} color="#9CA3AF" />
          <Text style={styles.navLabel}>HOME</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="time-outline" size={24} color="#1E3A5F" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>REQUEST</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#9CA3AF" />
          <Text style={styles.navLabel}>PROFILE</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings-outline" size={24} color="#9CA3AF" />
          <Text style={styles.navLabel}>SETTINGS</Text>
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
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  // Info Banner Styles
  infoBanner: {
    backgroundColor: '#EFF6FF',
    marginHorizontal: 20,
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  infoIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#1E3A5F',
    lineHeight: 20,
  },
  // Input Styles
  inputSection: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  hashIcon: {
    fontSize: 18,
    color: '#9CA3AF',
    marginRight: 12,
    fontWeight: '600',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A1A',
  },
  formatHint: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
  },
  // Document Section Styles
  documentSection: {
    marginHorizontal: 20,
    marginTop: 32,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  uploadCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    padding: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  uploadSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  // Bottom Container Styles
  bottomContainer: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F9FAFB',
  },
  submitButton: {
    backgroundColor: '#1E3A5F',
    paddingVertical: 18,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1E3A5F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  submitArrow: {
    marginLeft: 8,
  },
  // Bottom Navigation Styles
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  navLabelActive: {
    color: '#1E3A5F',
    fontWeight: '700',
  },
});
