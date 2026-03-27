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
import { reportService } from '../services/report';

interface HistoryItem {
  id: string | number;
  type: 'verification' | 'report';
  business_name: string;
  registration_number?: string;
  status: string;
  submitted_at: string;
  categories?: string[];
  description?: string;
  admin_notes?: string;
}

export default function VerificationHistoryScreen() {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  const fetchAllHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Fetch verifications
      const verificationResponse = await verificationService.getMyRequests();
      const responseObj = verificationResponse as any;
      
      let verificationArray: any[] = [];
      if (Array.isArray(verificationResponse)) {
        verificationArray = verificationResponse;
      } else if (typeof verificationResponse === 'object' && verificationResponse !== null && 'data' in verificationResponse) {
        if (responseObj.data && Array.isArray(responseObj.data)) {
          verificationArray = responseObj.data;
        } else if (responseObj.verifications && Array.isArray(responseObj.verifications)) {
          verificationArray = responseObj.verifications;
        } else if (responseObj.data?.verifications && Array.isArray(responseObj.data.verifications)) {
          verificationArray = responseObj.data.verifications;
        }
      }

      // Load reports - use try-catch to handle potential errors
      let fetchedReports: any[] = [];
      try {
        fetchedReports = await reportService.getMyReports();
      } catch (reportError) {
        console.error('Error fetching reports:', reportError);
        fetchedReports = [];
      }

      // Convert verifications to history items
      const verificationItems: HistoryItem[] = verificationArray.map((v: any) => ({
        id: v.id,
        type: 'verification',
        business_name: v.business_name,
        registration_number: v.registration_number,
        status: v.status,
        submitted_at: v.submitted_at || v.createdAt,
        admin_notes: v.admin_notes,
      }));

      // Convert reports to history items
      const reportItems: HistoryItem[] = (fetchedReports || []).map((r: any) => ({
        id: r.id,
        type: 'report',
        business_name: r.business_name,
        registration_number: r.registration_number,
        status: 'submitted',
        submitted_at: r.submitted_at,
        categories: r.additional_categories ? [r.category, ...r.additional_categories] : [r.category],
        description: r.description,
      }));

      // Combine and sort by date (newest first)
      const combined = [...verificationItems, ...reportItems];
      combined.sort((a, b) => {
        const dateA = new Date(a.submitted_at).getTime();
        const dateB = new Date(b.submitted_at).getTime();
        return dateB - dateA;
      });

      setHistoryItems(combined);
      setHasLoadedOnce(true);
    } catch (error: any) {
      console.error('Failed to fetch history:', error);
      setHistoryItems([]);
      setHasLoadedOnce(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Load data only on first visit
      if (!hasLoadedOnce) {
        fetchAllHistory();
      }
    }, [hasLoadedOnce, fetchAllHistory])
  );

  const handleRefresh = useCallback(async () => {
    setHasLoadedOnce(false);
    await fetchAllHistory();
  }, [fetchAllHistory]);

  const getStatusColor = (status: string, type: string) => {
    if (type === 'report') {
      return '#0B78F5'; // Blue for reports
    }
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
      case 'submitted':
        return '#0B78F5';
      default:
        return '#9CA3AF';
    }
  };

  const getStatusIcon = (status: string, type: string) => {
    if (type === 'report') {
      return 'alert-circle';
    }
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
      case 'submitted':
        return 'alert-circle';
      default:
        return 'help-circle';
    }
  };

  const getTypeLabel = (type: string) => {
    return type === 'report' ? 'REPORT' : 'VERIFICATION';
  };

  const getStatusLabel = (type: string, status: string) => {
    const typeLabel = getTypeLabel(type);
    const statusLabel = status.toUpperCase();
    return `${typeLabel} - ${statusLabel}`;
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
          onPress={handleRefresh}
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
            {historyItems.length} Total Request{historyItems.length !== 1 ? 's' : ''}
          </Text>
        </View>

        {/* History List */}
        {historyItems.length === 0 ? (
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
          historyItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.verificationCard}
              onPress={() => {
                if (item.type === 'verification') {
                  router.push({
                    pathname: '/request-detail',
                    params: {
                      id: item.id,
                      status: item.status,
                      entityName: item.business_name,
                      rcNumber: item.registration_number,
                      statusDate: formatDate(item.submitted_at)
                    }
                  });
                } else if (item.type === 'report') {
                  router.push({
                    pathname: '/report-submitted',
                    params: {
                      reportId: item.id,
                      businessName: item.business_name,
                      categories: item.categories ? item.categories.join(', ') : ''
                    }
                  });
                }
              }}
            >
              {/* Status Badge */}
              <View style={styles.cardHeader}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status, item.type) + '20' }]}>
                  <Ionicons 
                    name={getStatusIcon(item.status, item.type)} 
                    size={16} 
                    color={getStatusColor(item.status, item.type)} 
                  />
                  <Text style={[styles.statusText, { color: getStatusColor(item.status, item.type) }]}>
                    {getStatusLabel(item.type, item.status)}
                  </Text>
                </View>
                <Text style={styles.verificationId}>#{item.id}</Text>
              </View>

              {/* Business Info */}
              <Text style={styles.businessName}>{item.business_name}</Text>
              {item.registration_number && (
                <Text style={styles.rcNumber}>{item.registration_number}</Text>
              )}

              {/* Categories for reports */}
              {item.type === 'report' && item.categories && item.categories.length > 0 && (
                <View style={styles.categoriesContainer}>
                  {item.categories.map((category, idx) => (
                    <View key={idx} style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>{category}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Admin Notes if present */}
              {item.admin_notes && (
                <View style={styles.cacInfo}>
                  <View style={styles.cacRow}>
                    <Ionicons name="information-circle-outline" size={14} color="#666" />
                    <Text style={styles.cacText}>{item.admin_notes}</Text>
                  </View>
                </View>
              )}

              {/* Date */}
              <View style={styles.dateContainer}>
                <Ionicons name="calendar-outline" size={14} color="#9CA3AF" />
                <Text style={styles.dateText}>
                  Submitted: {formatDate(item.submitted_at)}
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
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#0B78F5',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0B78F5',
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
