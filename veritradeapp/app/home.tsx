import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useVerifications } from '../contexts/VerificationContext';
import { useUser } from '../contexts/UserContext';


export default function HomeScreen() {
  const { stats } = useVerifications();
  const { user } = useUser();
  const userName = user?.name?.split(' ')[0] || 'User';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hi, {userName}</Text>
          <View style={styles.tierBadge}>
            <Text style={styles.tierText}>SME Starter</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => router.push('/profile')}
        >
          <View style={styles.profileIcon}>
            <Ionicons name="person-circle" size={32} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Trust Integrity Score Card */}
        <View style={styles.scoreCard}>
          <View style={styles.scoreCardHeader}>
            <View style={styles.scoreCardLeft}>
              <Text style={styles.scoreLabel}>TRUST INTEGRITY SCORE</Text>
              <View style={styles.scoreRow}>
                <Text style={styles.scoreValue}>75</Text>
                <View style={styles.scoreIncrease}>
                  <Ionicons name="arrow-up" size={14} color="#10B981" />
                  <Text style={styles.scoreIncreaseText}>+2.4%</Text>
                </View>
              </View>
            </View>
            <View style={styles.fingerprintCircle}>
              <Ionicons name="finger-print" size={32} color="#10B981" />
            </View>
          </View>
          
          <View style={styles.securityRow}>
            <Text style={styles.securityLabel}>SECURITY STRENGTH</Text>
            <Text style={styles.securityValue}>ADVANCED</Text>
          </View>
          
          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <LinearGradient
              colors={['#3B82F6', '#10B981']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.progressBar}
            />
          </View>
          
          {/* Deep Scan Account Button 
          <TouchableOpacity style={styles.deepScanButton}>
            <Ionicons name="flash" size={20} color="#1E3A5F" style={styles.deepScanIcon} />
            <Text style={styles.deepScanText}>Deep Scan Account</Text>
          </TouchableOpacity>*/}
        </View> 

        {/* VERIPULSE AI Section */}
        <View style={styles.aiCard}>
          <View style={styles.aiHeader}>
            <View style={styles.aiIconCircle}>
              <Ionicons name="add" size={24} color="#fff" />
            </View>
            <Text style={styles.aiTitle}>VERIPULSE AI</Text>
          </View>
          <Text style={styles.aiHeading}>AI Intelligence Report</Text>
          <Text style={styles.aiDescription}>
            Synthesize 50+ data points including CAC filings and tax history in seconds.
          </Text>
          <TouchableOpacity 
            style={styles.aiButton}
            onPress={() => router.push('/ai-loading')}>
            <Text style={styles.aiButtonText}
            >GET STARTED</Text>
            <Ionicons name="arrow-forward" size={16} color="#10B981" style={styles.aiArrow} />
          </TouchableOpacity>
        </View>

        {/* Action Cards Section - Horizontally Scrollable */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.actionCardsScrollContent}
          style={styles.actionCardsRow}
        >
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/verify-business')}
          >
            <View style={styles.actionIconCircleBlue}>
              <Ionicons name="add" size={28} color="#fff" />
            </View>
            <Text style={styles.actionCardTitle}>New Verify</Text>
            <Text style={styles.actionCardSubtitle}>CAC & Identity</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/report-business')}
          >
            <View style={styles.actionIconCircleRed}>
              <Ionicons name="alert-circle" size={28} color="#fff" />
            </View>
            <Text style={styles.actionCardTitle}>Report Business</Text>
            <Text style={styles.actionCardSubtitle}>Fraud & Issues</Text>
          </TouchableOpacity>


          <TouchableOpacity 
            style={[styles.actionCard, styles.actionCardDisabled]}
            disabled={true}
          >

            <View style={styles.comingSoonBadge}>
              <Text style={styles.comingSoonText}>COMING SOON</Text>
            </View>
            <View style={[styles.actionIconCircleGreen, styles.actionIconDisabled]}>
              <MaterialCommunityIcons name="scan-helper" size={28} color="#A0A0A0" />
            </View>
            <Text style={[styles.actionCardTitle, styles.actionCardTitleDisabled]}>Scan Invoice</Text>
            <Text style={[styles.actionCardSubtitle, styles.actionCardSubtitleDisabled]}>OCR Fraud Detect</Text>
          </TouchableOpacity>

          
        </ScrollView>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statIconCircleGreen}>
              <Ionicons name="shield-checkmark" size={20} color="#10B981" />
            </View>
            <Text style={styles.statNumber}>{stats.verified}</Text>
            <Text style={styles.statLabel}>VERIFIED</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconCircleOrange}>
              <Ionicons name="time-outline" size={20} color="#F59E0B" />
            </View>
            <Text style={styles.statNumber}>{stats.pending}</Text>
            <Text style={styles.statLabel}>PENDING</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconCircleRed}>
              <Ionicons name="alert-circle" size={20} color="#EF4444" />
            </View>
            <Text style={styles.statNumber}>{stats.flagged}</Text>
            <Text style={styles.statLabel}>ALERTS</Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.recentHeader}>
          <Text style={styles.recentTitle}>RECENT ACTIVITY</Text>
          <TouchableOpacity onPress={() => router.push('/verification-history')}>
            <Text style={styles.viewHistory}>VIEW HISTORY</Text>
          </TouchableOpacity>
        </View>

        {/* Activity Items */}
        <TouchableOpacity 
          style={styles.activityCard}
          onPress={() => router.push({
            pathname: '/request-detail',
            params: {
              status: 'verified',
              entityName: 'Deji Logistics Ltd',
              rcNumber: 'RC-982341',
              statusDate: 'FEB 18, 2026'
            }
          })}
        >
          <View style={styles.activityRow}>
            <View style={styles.activityIconGreen}>
              <Ionicons name="shield-checkmark" size={24} color="#10B981" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityName}>Deji Logistics Ltd</Text>
              <Text style={styles.activityMeta}>RC-982341 • 18 FEB 2026</Text>
            </View>
            <View style={styles.activityStatusVerified}>
              <Text style={styles.statusVerifiedText}>VERIFIED</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.activityCard, styles.activityCardMargin]}
          onPress={() => router.push({
            pathname: '/request-detail',
            params: {
              status: 'flagged',
              entityName: 'Glow Beauty & Spa',
              rcNumber: 'RC742053',
              statusDate: 'FEB 19, 2026'
              
            }
          })}
        >
          <View style={styles.activityRow}>
            <View style={styles.activityIconRed}>
              <Ionicons name="alert-circle" size={24} color="#EF4444" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityName}>Glow Beauty & Spa</Text>
              <Text style={styles.activityMeta}>BN-112233 • 19 FEB 2026</Text>
            </View>
            <View style={styles.activityStatusFlagged}>
              <Text style={styles.statusFlaggedText}>FLAGGED</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Upgrade Banner */}
        <TouchableOpacity 
          style={styles.upgradeBanner}
          onPress={() => router.push('/subscription')}
        >
          <View style={styles.upgradeBannerIcon}>
            <MaterialCommunityIcons name="chart-line" size={28} color="#fff" />
          </View>
          <View style={styles.upgradeBannerContent}>
            <Text style={styles.upgradeText}>Need deep due diligence?</Text>
            <Text style={styles.upgradeBold}>UPGRADE TO VERITRADE ELITE FOR PHYSICAL SITE VISITS.</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#1E3A5F" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>HOME</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/verification-history')}
        >
          <Ionicons name="time-outline" size={24} color="#9CA3AF" />
          <Text style={styles.navLabel}>HISTORY</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/profile')}
        >
          <Ionicons name="person-outline" size={24} color="#9CA3AF" />
          <Text style={styles.navLabel}>PROFILE</Text>
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
    backgroundColor: '#F0F3F9',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  tierBadge: {
    backgroundColor: '#E3E9F3',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  tierText: {
    fontSize: 11,
    color: '#1E3A5F',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F3F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1E3A5F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIconText: {
    fontSize: 20,
  },
  // Trust Integrity Score Card Styles
  scoreCard: {
    backgroundColor: '#1E3A5F',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  scoreCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  scoreCardLeft: {
    flex: 1,
  },
  scoreLabel: {
    fontSize: 11,
    color: '#93A8C1',
    marginBottom: 12,
    letterSpacing: 1,
    fontWeight: '600',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 12,
    lineHeight: 70,
  },
  scoreIncrease: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 2,
  },
  scoreIncreaseText: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '700',
  },
  fingerprintCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  securityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  securityLabel: {
    fontSize: 11,
    color: '#93A8C1',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  securityValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#10B981',
    letterSpacing: 0.5,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: 'rgba(59, 130, 246, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    width: '75%',
    borderRadius: 3,
  },
  deepScanButton: {
    backgroundColor: '#E8F0FA',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deepScanIcon: {
    marginRight: 8,
  },
  deepScanText: {
    color: '#1E3A5F',
    fontSize: 14,
    fontWeight: '700',
  },
  // VERIPULSE AI Card Styles
  aiCard: {
    backgroundColor: '#1A2D4A',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  aiTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
    letterSpacing: 1,
  },
  aiHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  aiDescription: {
    fontSize: 13,
    color: '#93A8C1',
    lineHeight: 20,
    marginBottom: 16,
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  aiButtonText: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  aiArrow: {
    marginLeft: 6,
  },
  // Action Cards Styles
  actionCardsRow: {
    marginTop: 20,
  },
  actionCardsScrollContent: {
    paddingHorizontal: 20,
    gap: 12,
    paddingRight: 20,
  },
  actionCard: {
    width: 160,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  actionCardDisabled: {
    opacity: 0.5,
    backgroundColor: '#F9FAFB',
  },
  comingSoonBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 1,
  },
  comingSoonText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  actionIconDisabled: {
    backgroundColor: '#E5E7EB',
  },
  actionCardTitleDisabled: {
    color: '#9CA3AF',
  },
  actionCardSubtitleDisabled: {
    color: '#D1D5DB',
  },
  actionIconCircleBlue: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1E3A5F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionIconCircleGreen: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionIconCircleRed: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  actionCardSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  // Stats Row Styles
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statIconCircleGreen: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIconCircleOrange: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF3E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIconCircleRed: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  // Recent Activity Styles
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  recentTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
    letterSpacing: 0.5,
  },
  viewHistory: {
    fontSize: 12,
    color: '#1E3A5F',
    fontWeight: '600',
  },
  activityCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  activityCardMargin: {
    marginTop: 12,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIconGreen: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIconOrange: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF3E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIconRed: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  activityMeta: {
    fontSize: 11,
    color: '#999',
  },
  activityStatusVerified: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusVerifiedText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  activityStatusReview: {
    backgroundColor: '#FEF3E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusReviewText: {
    color: '#F59E0B',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  activityStatusFlagged: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusFlaggedText: {
    color: '#EF4444',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  // Upgrade Banner Styles
  upgradeBanner: {
    backgroundColor: '#1A1A1A',
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  upgradeBannerIcon: {
    marginRight: 16,
  },
  upgradeBannerContent: {
    flex: 1,
  },
  upgradeText: {
    color: '#fff',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 4,
  },
  upgradeBold: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 12,
    letterSpacing: 0.5,
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