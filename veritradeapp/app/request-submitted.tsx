import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RequestSubmittedScreen() {
  const params = useLocalSearchParams();
  const verificationId = (params.verificationId as string) || '#VT-0000';
  const status = (params.status as string) || 'pending';

  const getStatusMessage = () => {
    switch (status) {
      case 'verified':
        return 'Your verification has been completed instantly! The business is registered and verified.';
      case 'rejected':
        return 'We could not verify this business. Please check the details and try again.';
      case 'flagged':
        return 'This business has been flagged. Business transations with this company is not advised.';
      default:
        return 'Your verification request has been received. Our team will review it within 24-48 hours.';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={[
            styles.successCircle,
            status === 'verified' && styles.verifiedCircle,
            status === 'rejected' && styles.rejectedCircle,
            status === 'flagged' && styles.flaggedCircle
          ]}>
            <Ionicons 
              name={status === 'verified' ? 'checkmark' : status === 'rejected' ? 'close' : status === 'flagged' ? 'alert' : 'checkmark'} 
              size={48} 
              color="#fff" 
            />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>
          {status === 'verified' ? 'Verified!' : status === 'rejected' ? 'Not Found' : status === 'flagged' ? 'Flagged for Review' : 'Request Submitted!'}
        </Text>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            {status !== 'pending' && 'Verification Request '}
            <Text style={styles.requestId}>{verificationId}</Text>
            {'\n\n'}
            {getStatusMessage()}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('/verification-history')}
          >
            <Text style={styles.primaryButtonText}>View History</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.buttonIcon} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.push('/home')}
          >
            <Text style={styles.secondaryButtonText}>Go to Dashboard</Text>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 120,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 40,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  verifiedCircle: {
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
  },
  rejectedCircle: {
    backgroundColor: '#EF4444',
    shadowColor: '#EF4444',
  },
  flaggedCircle: {
    backgroundColor: '#F59E0B',
    shadowColor: '#F59E0B',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: 24,
    textAlign: 'center',
  },
  descriptionContainer: {
    marginBottom: 48,
  },
  description: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  requestId: {
    fontWeight: '700',
    color: '#1E3A5F',
  },
  timeframe: {
    fontWeight: '700',
    color: '#1E3A5F',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
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
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#1E3A5F',
    fontSize: 16,
    fontWeight: '700',
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
