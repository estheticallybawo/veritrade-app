import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { verificationService } from '../services/verification';

export default function VerificationHistoryScreen() {
  const [verifications, setVerifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVerifications = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await verificationService.getMyRequests();
      const responseObj = response as any;
      
      // Log everything to see exact structure
      console.log('=== FULL RESPONSE ===');
      console.log('Type:', typeof response);
      console.log('Response:', response);
      console.log('Response keys:', Object.keys(response || {}));
      console.log('Response.data:', responseObj?.data);
      console.log('Response.verifications:', responseObj?.verifications);
      console.log('=== END ===');
      
      // Handle different response structures
      let verificationArray = [];
      
      if (Array.isArray(response)) {
        verificationArray = response;
      } else if (typeof response === 'object' && response !== null && 'data' in response) {
        if (responseObj.data && Array.isArray(responseObj.data)) {
          verificationArray = responseObj.data;
        } else if (responseObj.verifications && Array.isArray(responseObj.verifications)) {
          verificationArray = responseObj.verifications;
        } else if (responseObj.data?.verifications && Array.isArray(responseObj.data.verifications)) {
          verificationArray = responseObj.data.verifications;
        }
      }

      console.log('Parsed verifications:', verificationArray);
      setVerifications(verificationArray);
    } catch (error: any) {
      console.error('Failed to fetch verifications:', error);
      Alert.alert('Error', 'Failed to load verification history');
      setVerifications([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchVerifications();
    }, [fetchVerifications])
  );

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
      case 'cancelled':
        return '#6B7280';
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
      case 'cancelled':
        return 'close-circle';
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

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#1E3A5F" />
        <Text style={{ marginTop: 16, color: '#666' }}>Loading history...</Text>
      </View>
    );
  }

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
        <TouchableOpacity 
          style={styles.placeholder}
          onPress={fetchVerifications}
        >
          <Ionicons name="refresh" size={24} color="#1A1A1A" />
        </TouchableOpacity>
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
                  entityName: verification.business_name,
                  rcNumber: verification.registration_number,
                  statusDate: formatDate(verification.createdAt || verification.submitted_at)
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
                <Text style={styles.verificationId}>#{verification.id}</Text>
              </View>

              {/* Business Info */}
              <Text style={styles.businessName}>{verification.business_name}</Text>
              <Text style={styles.rcNumber}>{verification.registration_number}</Text>

              {/* Admin Notes if present */}
              {verification.admin_notes && (
                <View style={styles.cacInfo}>
                  <View style={styles.cacRow}>
                    <Ionicons name="information-circle-outline" size={14} color="#666" />
                    <Text style={styles.cacText}>{verification.admin_notes}</Text>
                  </View>
                </View>
              )}

              {/* Date */}
              <View style={styles.dateContainer}>
                <Ionicons name="calendar-outline" size={14} color="#9CA3AF" />
                <Text style={styles.dateText}>
                  Submitted: {formatDate(verification.createdAt || verification.submitted_at)}
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
        
        <TouchableOpacity style={styles.navItem}
         onPress={() => router.push('/profile')}
        >
          <Ionicons name="person-outline" size={24} color="#9CA3AF" />
          <Text style={styles.navLabel}>PROFILE</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}
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
