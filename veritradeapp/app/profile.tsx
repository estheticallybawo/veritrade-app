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
import { useUser } from '../contexts/UserContext';
import { verificationService } from '../services/verification';

export default function ProfileScreen() {
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company_name: user?.company_name || '',
    registration_number: user?.registration_number || '',
    industry: '',
    employee_count: '',
    website: '',
    hotline: '',
    address: ''
  });

  const [verificationStatus, setVerificationStatus] = useState<any>(null);

  React.useEffect(() => {
    // Load verification status if user has registration number
    if (user?.registration_number) {
      loadVerificationStatus();
    }
  }, [user?.registration_number]);

  const loadVerificationStatus = async () => {
    try {
      if (user?.registration_number) {
        // In mock mode, this will return from local data
        const status = await verificationService.getByStatus('verified');
        setVerificationStatus(status);
      }
    } catch (error) {
      console.error('Failed to load verification status:', error);
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      Alert.alert('Missing Information', 'Name and email are required');
      return;
    }

    setIsSaving(true);
    try {
      // Update user data
      updateUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company_name: formData.company_name.trim() || undefined,
        registration_number: formData.registration_number.trim() || undefined,
      });

      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error: any) {
      Alert.alert('Error', 'Failed to update profile');
      console.error('Update error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const isVerified = user?.verified_status === 'verified';

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
        <Text style={styles.headerTitle}>Business Profile</Text>
        {!isEditing ? (
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Ionicons name="pencil" size={20} color="#1E3A5F" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator size="small" color="#1E3A5F" />
            ) : (
              <Text style={styles.saveButtonText}>SAVE</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Picture */}
        <View style={styles.profilePictureContainer}>
          <View style={styles.profilePicture}>
            <Ionicons name="person-circle" size={80} color="#1E3A5F" />
          </View>
          {isEditing && (
            <TouchableOpacity style={styles.cameraButton}>
              <Ionicons name="camera" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        {/* Verification Status */}
        <View style={styles.verificationSection}>
          {isVerified ? (
            <View style={styles.verifiedStatus}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={styles.verifiedStatusText}>ACTIVE VERIFICATION</Text>
            </View>
          ) : (
            <View style={styles.unverifiedStatus}>
              <Ionicons name="alert-circle" size={16} color="#0b78f5" />
              <Text style={styles.unverifiedStatusText}>PENDING KYC VERIFICATION</Text>
            </View>
          )}
        </View>

        {/* CORE DETAILS Section */}
        <Text style={styles.sectionTitle}>CORE DETAILS</Text>

        {/* Legal Entity Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Legal Entity Name</Text>
          <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
            <Ionicons name="business-outline" size={20} color="#9CA3AF" />
            <TextInput
              style={styles.input}
              placeholder="Enter company name"
              placeholderTextColor="#9CA3AF"
              value={formData.company_name}
              onChangeText={(text) => setFormData({ ...formData, company_name: text })}
              editable={isEditing}
              autoCapitalize="words"
            />
          </View>
        </View>

        {/* Registration Number (if verified, show as locked) */}
        {isVerified && formData.registration_number && (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Registration Number</Text>
              <View style={[styles.inputContainer, styles.inputDisabled]}>
                <Ionicons name="lock-closed" size={20} color="#9CA3AF" />
                <TextInput
                  style={styles.input}
                  value={formData.registration_number}
                  editable={false}
                />
              </View>
            </View>
          </>
        )}

        {/* Industry & Employee Count */}
        <View style={styles.rowContainer}>
          <View style={[styles.inputGroup, styles.halfInput]}>
            <Text style={styles.label}>Industry</Text>
            <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
              <Ionicons name="briefcase-outline" size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                placeholder="Select industry"
                placeholderTextColor="#9CA3AF"
                value={formData.industry}
                onChangeText={(text) => setFormData({ ...formData, industry: text })}
                editable={isEditing}
              />
            </View>
          </View>
          <View style={[styles.inputGroup, styles.halfInput]}>
            <Text style={styles.label}>Employee Count</Text>
            <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
              <Ionicons name="people-outline" size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                placeholder="1-10"
                placeholderTextColor="#9CA3AF"
                value={formData.employee_count}
                onChangeText={(text) => setFormData({ ...formData, employee_count: text })}
                editable={isEditing}
              />
            </View>
          </View>
        </View>

        {/* Business Website */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Business Website</Text>
          <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
            <Ionicons name="globe-outline" size={20} color="#9CA3AF" />
            <TextInput
              style={styles.input}
              placeholder="https://company.com"
              placeholderTextColor="#9CA3AF"
              value={formData.website}
              onChangeText={(text) => setFormData({ ...formData, website: text })}
              editable={isEditing}
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* CONTACT & REACH Section */}
        <Text style={styles.sectionTitle}>CONTACT & REACH</Text>

        {/* Official Hotline */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Official Hotline</Text>
          <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
            <Ionicons name="call-outline" size={20} color="#9CA3AF" />
            <TextInput
              style={styles.input}
              placeholder="+234 XXX XXX XXXX"
              placeholderTextColor="#9CA3AF"
              value={formData.hotline}
              onChangeText={(text) => setFormData({ ...formData, hotline: text })}
              editable={isEditing}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Corporate Address */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Corporate Address</Text>
          <View style={[styles.inputContainer, !isEditing && styles.inputDisabled, { minHeight: 90 }]}>
            <Ionicons name="location-outline" size={20} color="#9CA3AF" style={{ marginTop: 16 }} />
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Enter full address"
              placeholderTextColor="#9CA3AF"
              value={formData.address}
              onChangeText={(text) => setFormData({ ...formData, address: text })}
              editable={isEditing}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Verified Status Lockdown Warning 
        /* {isVerified && (
          <View style={styles.warningBox}>
            <Ionicons name="shield-alert-outline" size={16} color="#DC2626" />
            <View style={styles.warningContent}>
              <Text style={styles.warningTitle}>VERIFIED STATUS LOCKDOWN</Text>
              <Text style={styles.warningText}>
                Your registration number and legal name cannot be changed while a verified status is active. Contact support for re-verification.
              </Text>
            </View>
          </View>
        )} */}

        {/* Save Button when editing */}
        {isEditing && (
          <TouchableOpacity 
            style={styles.saveBtnLarge}
            onPress={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveBtnText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/home')}
        >
          <Ionicons name="home-outline" size={24} color="#9CA3AF" />
          <Text style={styles.navLabel}>HOME</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/verification-history')}
        >
          <Ionicons name="time-outline" size={24} color="#9CA3AF" />
          <Text style={styles.navLabel}>HISTORY</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#1E3A5F" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>PROFILE</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/settings')}
        >
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
  editButton: {
    padding: 8,
  },
  saveButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  saveButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E3A5F',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  profilePictureContainer: {
    alignItems: 'center',
    position: 'relative',
    marginTop: 24,
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8F0FA',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cameraButton: {
    position: 'absolute',
    bottom: -8,
    right: '28%',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1E3A5F',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  verificationSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  verifiedStatus: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  verifiedStatusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
    letterSpacing: 0.5,
  },
  unverifiedStatus: {
    backgroundColor: '#e2f1fe',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  unverifiedStatusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0b49f5',
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E3A5F',
    marginHorizontal: 20,
    marginBottom: 16,
    marginTop: 24,
    letterSpacing: 1,
  },
  inputGroup: {
    marginHorizontal: 20,
    marginBottom: 16,
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
    paddingVertical: 14,
    backgroundColor: '#fff',
  },
  inputDisabled: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 14,
    color: '#1F2937',
  },
  multilineInput: {
    textAlignVertical: 'top',
    paddingVertical: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 0,
    marginBottom: 16,
  },
  warningBox: {
    backgroundColor: '#FEF2F2',
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  warningContent: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  warningText: {
    fontSize: 12,
    color: '#991B1B',
    lineHeight: 18,
  },
  saveBtnLarge: {
    backgroundColor: '#1E3A5F',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
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
