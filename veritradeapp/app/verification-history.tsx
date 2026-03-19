import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useVerifications } from '../contexts/VerificationContext';

export default function VerificationHistoryScreen() {
  const { verifications } = useVerifications();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'rejected':
        return '#EF4444';
      case 'flagged':
        return '#EF4444';
      default:
        return '#9CA3AF';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return 'checkmark-circle';
      case 'pending':
        return 'time';
      case 'rejected':
        return 'close-circle';
      case 'flagged':
        return 'alert-circle';
      default:
        return 'help-circle';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options).toUpperCase();
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
        <Text style={styles.headerTitle}>Verification History</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Total Count */}
        <View style={styles.countContainer}>
          <Text style={styles.countText}>
            {verifications.length} Total Request{verifications.length !== 1 ? 's' : ''}
          </Text>
        </View>

        {/* Verification List */}
        {verifications.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="document-text-outline" size={48} color="#9CA3AF" />
            </View>
            <Text style={styles.emptyTitle}>No Verifications Yet</Text>
            <Text style={styles.emptyDescription}>
              Start by verifying your first business
            </Text>
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={() => router.push('/verify-business')}
            >
              <Text style={styles.emptyButtonText}>New Verification</Text>
            </TouchableOpacity>
          </View>
        ) : (
          verifications.map((verification) => (
            <TouchableOpacity
              key={verification.id}
              style={styles.verificationCard}
              onPress={() => router.push({
                pathname: '/request-detail',
                params: {
                  id: verification.id,
                  status: verification.status,
                  entityName: verification.businessName,
                  rcNumber: verification.registrationNumber,
                  statusDate: formatDate(verification.submittedDate)
                }
              })}
            >
              {/* Status Badge */}
              <View style={styles.cardHeader}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(verification.status) + '20' }]}>
                  <Ionicons 
                    name={getStatusIcon(verification.status)} 
                    size={16} 
                    color={getStatusColor(verification.status)} 
                  />
                  <Text style={[styles.statusText, { color: getStatusColor(verification.status) }]}>
                    {verification.status.toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.verificationId}>{verification.id}</Text>
              </View>

              {/* Business Info */}
              <Text style={styles.businessName}>{verification.businessName}</Text>
              <Text style={styles.rcNumber}>{verification.registrationNumber}</Text>

              {/* CAC Info if verified */}
              {verification.cacData && (
                <View style={styles.cacInfo}>
                  <View style={styles.cacRow}>
                    <Ionicons name="business-outline" size={14} color="#666" />
                    <Text style={styles.cacText}>{verification.cacData.business_type}</Text>
                  </View>
                  <View style={styles.cacRow}>
                    <Ionicons name="location-outline" size={14} color="#666" />
                    <Text style={styles.cacText}>{verification.cacData.state}</Text>
                  </View>
                </View>
              )}

              {/* Date */}
              <View style={styles.dateContainer}>
                <Ionicons name="calendar-outline" size={14} color="#9CA3AF" />
                <Text style={styles.dateText}>
                  Submitted: {formatDate(verification.submittedDate)}
                </Text>
              </View>

              {/* Arrow */}
              <View style={styles.arrowContainer}>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          ))
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
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="time-outline" size={24} color="#1E3A5F" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>HISTORY</Text>
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
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  countContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  countText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  verificationCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  verificationId: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  businessName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  rcNumber: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 12,
  },
  cacInfo: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  cacRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cacText: {
    fontSize: 12,
    color: '#666',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  arrowContainer: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -10,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#1E3A5F',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9CA3AF',
    letterSpacing: 0.5,
  },
  navLabelActive: {
    color: '#1E3A5F',
  },
});
