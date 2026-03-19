import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Share,
  Alert,
  ActivityIndicator
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { verificationService } from '../services/verification';

type VerificationStatus = 'verified' | 'pending' | 'rejected' | 'flagged' | 'cancelled';
type LifecycleStage = 'completed' | 'in-progress' | 'awaiting';

interface LifecycleStep {
  title: string;
  subtitle: string;
  status: LifecycleStage;
}

export default function RequestDetailScreen() {
  // Get params from navigation (don't try to get from context)
  const params = useLocalSearchParams();
  
  // Use params directly - they're passed from verification-history.tsx
  const requestId = (params.id as string) || '';
  const initialStatus = (params.status as VerificationStatus) || 'pending';
  const entityName = (params.entityName as string) || 'Unknown Business';
  const rcNumber = (params.rcNumber as string) || 'RC-000000';
  const statusDate = (params.statusDate as string) || new Date().toLocaleDateString();
  const [currentStatus, setCurrentStatus] = useState<VerificationStatus>(initialStatus);
  const [isCancelling, setIsCancelling] = useState(false);

  console.log('Request Detail Params:', { requestId, currentStatus, entityName, rcNumber, statusDate });

  const lifecycleSteps: LifecycleStep[] = [
    {
      title: 'Submitted',
      subtitle: statusDate,
      status: 'completed',
    },
    {
      title: 'Document Verification',
      subtitle:
        currentStatus === 'verified'
          ? 'Completed'
          : currentStatus === 'rejected'
            ? 'Failed'
            : currentStatus === 'flagged'
              ? 'In Progress'
              : currentStatus === 'cancelled'
                ? 'Cancelled by user'
                : 'In Progress',
      status:
        currentStatus === 'verified' || currentStatus === 'rejected' || currentStatus === 'cancelled'
          ? 'completed'
          : 'in-progress',
    },
    {
      title: 'CAC Matching',
      subtitle:
        currentStatus === 'verified'
          ? 'Completed'
          : currentStatus === 'rejected'
            ? 'Failed'
            : currentStatus === 'flagged'
              ? 'In Progress'
              : currentStatus === 'cancelled'
                ? 'Not processed'
                : 'Awaiting',
      status:
        currentStatus === 'verified' || currentStatus === 'rejected'
          ? 'completed'
          : currentStatus === 'flagged'
            ? 'in-progress'
            : 'awaiting',
    },
    {
      title: 'Final Trust Result',
      subtitle:
        currentStatus === 'verified'
          ? 'Verified'
          : currentStatus === 'rejected'
            ? 'Rejected'
            : currentStatus === 'flagged'
              ? 'Flagged for Review'
              : currentStatus === 'cancelled'
                ? 'Cancelled'
                : 'Awaiting',
      status:
        currentStatus === 'verified' ||
        currentStatus === 'rejected' ||
        currentStatus === 'flagged' ||
        currentStatus === 'cancelled'
          ? 'completed'
          : 'awaiting',
    },
  ];

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Verification Details - ${entityName} (${rcNumber})`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelRequest = () => {
    if (!requestId) {
      Alert.alert('Unable to cancel', 'Request ID is missing for this verification.');
      return;
    }

    Alert.alert(
      'Cancel Pending Request',
      'Are you sure you want to cancel this pending verification request?',
      [
        { text: 'Keep Request', style: 'cancel' },
        {
          text: 'Cancel Request',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsCancelling(true);
              const result = await verificationService.cancel(requestId);

              if (!result) {
                throw new Error('Request not found or cannot be cancelled');
              }

              setCurrentStatus('cancelled');
              Alert.alert('Request Cancelled', 'Your verification request has been cancelled.', [
                {
                  text: 'OK',
                  onPress: () => router.replace('/verification-history'),
                },
              ]);
            } catch (error: any) {
              Alert.alert('Cancel Failed', error.message || 'Failed to cancel this request. Please try again.');
            } finally {
              setIsCancelling(false);
            }
          },
        },
      ]
    );
  };

  const renderStatusCard = () => {
    if (currentStatus === 'verified') {
      return (
        <View style={[styles.statusCard, styles.statusCardVerified]}>
          <View style={styles.statusIconCircleGreen}>
            <Ionicons name="shield-checkmark" size={40} color="#fff" />
          </View>
          <Text style={styles.statusTitle}>Verified</Text>
          <Text style={styles.statusDate}>STATUS AS OF {statusDate}</Text>
          <Text style={styles.statusMessage}>
            "CAC Match Found. Active for 8 years."
          </Text>
        </View>
      );
    }

    if (currentStatus === 'flagged') {
      return (
        <View style={[styles.statusCard, styles.statusCardFlagged]}>
          <View style={styles.statusIconCircleOrange}>
            <Ionicons name="alert" size={40} color="#fff" />
          </View>
          <Text style={styles.statusTitle}>Flagged for Review</Text>
          <Text style={styles.statusDate}>STATUS AS OF {statusDate}</Text>
          <Text style={styles.statusMessage}>
            "This business has been flagged for inactivity. Conducting business with them is at your own risk"
          </Text>
        </View>
      );
    }

    if (currentStatus === 'rejected') {
      return (
        <View style={[styles.statusCard, styles.statusCardRejected]}>
          <View style={styles.statusIconCircleRed}>
            <Ionicons name="close-circle" size={40} color="#fff" />
          </View>
          <Text style={styles.statusTitle}>Not Verified</Text>
          <Text style={styles.statusDate}>STATUS AS OF {statusDate}</Text>
          <Text style={styles.statusMessage}>
            "Could not find matching CAC record. Please check the details."
          </Text>
        </View>
      );
    }

    if (currentStatus === 'cancelled') {
      return (
        <View style={[styles.statusCard, styles.statusCardCancelled]}>
          <View style={styles.statusIconCircleGray}>
            <Ionicons name="close-circle" size={40} color="#fff" />
          </View>
          <Text style={styles.statusTitle}>Cancelled</Text>
          <Text style={styles.statusDate}>STATUS AS OF {statusDate}</Text>
          <Text style={styles.statusMessage}>
            "This pending request was cancelled by you before review."
          </Text>
        </View>
      );
    }

    return (
      <View style={[styles.statusCard, styles.statusCardPending]}>
        <View style={styles.statusIconCircleBlue}>
          <Ionicons name="alert-circle-outline" size={40} color="#fff" />
        </View>
        <Text style={styles.statusTitle}>Pending</Text>
        <Text style={styles.statusDate}>STATUS AS OF {statusDate}</Text>
        <Text style={styles.statusMessage}>
          "Awaiting admin review..."
        </Text>
      </View>
    );
  };

  const renderLifecycleIcon = (stepStatus: LifecycleStage) => {
    if (stepStatus === 'completed') {
      return (
        <View style={styles.lifecycleIconCompleted}>
          <Ionicons name="checkmark" size={20} color="#fff" />
        </View>
      );
    }
    if (stepStatus === 'in-progress') {
      return (
        <View style={styles.lifecycleIconInProgress}>
          <View style={styles.loadingDot} />
        </View>
      );
    }
    return (
      <View style={styles.lifecycleIconAwaiting}>
        <View style={styles.awaitingDot} />
      </View>
    );
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
        <Text style={styles.headerTitle}>Request Detail</Text>
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={handleShare}
        >
          <Ionicons name="share-outline" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Status Card */}
        {renderStatusCard()}

        {/* Entity Details */}
        <View style={styles.detailsRow}>
          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>ENTITY NAME</Text>
            <Text style={styles.detailValue}>{entityName}</Text>
          </View>
          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>RC NUMBER</Text>
            <Text style={styles.detailValue}>{rcNumber}</Text>
          </View>
        </View>

        {/* Lifecycle Track */}
        <View style={styles.lifecycleContainer}>
          <Text style={styles.lifecycleTitle}>LIFECYCLE TRACK</Text>
          <View style={styles.lifecycleSteps}>
            {lifecycleSteps.map((step, index) => (
              <View key={index} style={styles.lifecycleStep}>
                {renderLifecycleIcon(step.status)}
                <View style={styles.lifecycleContent}>
                  <Text style={[
                    styles.lifecycleStepTitle,
                    step.status === 'awaiting' && styles.lifecycleStepTitleMuted
                  ]}>
                    {step.title}
                  </Text>
                  <Text style={styles.lifecycleStepSubtitle}>{step.subtitle}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        {currentStatus === 'verified' && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.downloadButton}>
              <Text style={styles.downloadButtonText}>Download Trust Certificate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewDocButton}>
              <Text style={styles.viewDocButtonText}>View Source Document</Text>
            </TouchableOpacity>
          </View>
        )}

        {currentStatus === 'pending' && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.downloadButton, styles.cancelButton]}
              onPress={handleCancelRequest}
              disabled={isCancelling}
            >
              {isCancelling ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.downloadButtonText}>Cancel Pending Request</Text>
              )}
            </TouchableOpacity>
          </View>
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
  scrollContent: {
    paddingBottom: 120,
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
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A5F',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  shareButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Status Card Styles
  statusCard: {
    marginHorizontal: 20,
    marginTop: 24,
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
  },
  statusCardVerified: {
    backgroundColor: '#ECFDF5',
    borderColor: '#D1FAE5',
  },
  statusCardPending: {
    backgroundColor: '#F0F9FF',
    borderColor: '#E0F2FE',
  },
  statusCardFlagged: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FEE3B1',
  },
  statusCardRejected: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  statusCardCancelled: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
  },
  statusIconCircleGreen: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusIconCircleBlue: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1E3A5F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusIconCircleOrange: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusIconCircleRed: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusIconCircleGray: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6B7280',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: 8,
  },
  statusDate: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  statusMessage: {
    fontSize: 14,
    color: '#1E3A5F',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 22,
  },
  // Details Row Styles
  detailsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  detailCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  // Lifecycle Track Styles
  lifecycleContainer: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  lifecycleTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E3A5F',
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  lifecycleSteps: {
    gap: 24,
  },
  lifecycleStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  lifecycleIconCompleted: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  lifecycleIconInProgress: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1E3A5F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  lifecycleIconAwaiting: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  awaitingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  lifecycleContent: {
    flex: 1,
  },
  lifecycleStepTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E3A5F',
    marginBottom: 4,
  },
  lifecycleStepTitleMuted: {
    color: '#9CA3AF',
  },
  lifecycleStepSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  // Action Buttons Styles
  actionButtons: {
    marginHorizontal: 20,
    marginTop: 24,
    gap: 16,
  },
  downloadButton: {
    backgroundColor: '#1E3A5F',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#1E3A5F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  cancelButton: {
    backgroundColor: '#EF4444',
    shadowColor: '#EF4444',
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  viewDocButton: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  viewDocButtonText: {
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
