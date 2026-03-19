import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type TabType = 'summary' | 'risk' | 'network';

interface SummaryMetric {
  label: string;
  value: string;
  badge: string;
  badgeColor: string;
}

export default function AIReportScreen() {
  const params = useLocalSearchParams();
  const businessName = (params.businessName as string) || 'Aliko Logistics Ltd';
  
  const [activeTab, setActiveTab] = useState<TabType>('summary');

  const summaryMetrics: SummaryMetric[] = [
    {
      label: 'Entity Match',
      value: '99.8%',
      badge: 'EXACT',
      badgeColor: '#10B981',
    },
    {
      label: 'Director Integrity',
      value: 'Pass',
      badge: 'VERIFIED',
      badgeColor: '#10B981',
    },
    {
      label: 'Regional Benchmarking',
      value: 'Top 5%',
      badge: 'EXCEEDS',
      badgeColor: '#10B981',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F3057" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Ionicons name="sparkles" size={20} color="#10B981" style={styles.headerIcon} />
          <Text style={styles.headerTitle}>VERIPULSE AI</Text>
        </View>
        <TouchableOpacity style={styles.brainButton}>
          <Ionicons name="bulb" size={24} color="#10B981" />
        </TouchableOpacity>
      </View>

      {/* Title Section */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>AI Intelligence Report</Text>
        <Text style={styles.subtitle}>ANALYZING: {businessName.toUpperCase()}</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Natural Language Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Ionicons name="chatbox-ellipses-outline" size={20} color="#10B981" />
            <Text style={styles.summaryTitle}>NATURAL LANGUAGE SUMMARY</Text>
          </View>
          <View style={styles.summaryTextContainer}>
            <Text style={styles.summaryText}>
              "VeriPulse AI has completed its deep-web synthesis. Based on recent CAC filings and 48 independent data points, {businessName} demonstrates strong operational consistency. We detected a slight variance in tax clearance dates but overall network stability remains in the top 5th percentile for Lagos-based logistics firms."
            </Text>
          </View>
        </View>

        {/* Health & Risk Cards */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <View style={styles.metricIconContainer}>
              <Ionicons name="pulse" size={20} color="#3B82F6" />
              <Text style={styles.metricLabel}>HEALTH INDEX</Text>
            </View>
            <View style={styles.metricValueContainer}>
              <Text style={styles.metricValue}>9.4</Text>
              <Text style={styles.metricMax}>/10</Text>
            </View>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricIconContainer}>
              <Ionicons name="alert-circle-outline" size={20} color="#F59E0B" />
              <Text style={styles.metricLabel}>RISK LEVEL</Text>
            </View>
            <View style={styles.riskValueContainer}>
              <Text style={styles.riskValue}>Low</Text>
              <View style={styles.riskIndicator} />
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'summary' && styles.tabActive]}
            onPress={() => setActiveTab('summary')}
          >
            <Text style={[styles.tabText, activeTab === 'summary' && styles.tabTextActive]}>
              SUMMARY
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'risk' && styles.tabActive]}
            onPress={() => setActiveTab('risk')}
          >
            <Text style={[styles.tabText, activeTab === 'risk' && styles.tabTextActive]}>
              RISK
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'network' && styles.tabActive]}
            onPress={() => setActiveTab('network')}
          >
            <Text style={[styles.tabText, activeTab === 'network' && styles.tabTextActive]}>
              NETWORK
            </Text>
          </TouchableOpacity>
        </View>

        {/* Summary Metrics */}
        {activeTab === 'summary' && (
          <View style={styles.metricsContainer}>
            {summaryMetrics.map((metric, index) => (
              <View key={index} style={styles.summaryMetricCard}>
                <View style={styles.summaryMetricContent}>
                  <Text style={styles.summaryMetricLabel}>{metric.label}</Text>
                  <View style={styles.summaryMetricRight}>
                    <Text style={styles.summaryMetricValue}>{metric.value}</Text>
                    <View style={[styles.summaryBadge, { backgroundColor: metric.badgeColor }]}>
                      <Text style={styles.summaryBadgeText}>{metric.badge}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Risk Tab Content */}
        {activeTab === 'risk' && (
          <View style={styles.metricsContainer}>
            <View style={styles.summaryMetricCard}>
              <View style={styles.summaryMetricContent}>
                <Text style={styles.summaryMetricLabel}>Financial Risk</Text>
                <View style={styles.summaryMetricRight}>
                  <Text style={styles.summaryMetricValue}>Low</Text>
                  <View style={[styles.summaryBadge, { backgroundColor: '#10B981' }]}>
                    <Text style={styles.summaryBadgeText}>STABLE</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.summaryMetricCard}>
              <View style={styles.summaryMetricContent}>
                <Text style={styles.summaryMetricLabel}>Compliance Score</Text>
                <View style={styles.summaryMetricRight}>
                  <Text style={styles.summaryMetricValue}>95%</Text>
                  <View style={[styles.summaryBadge, { backgroundColor: '#10B981' }]}>
                    <Text style={styles.summaryBadgeText}>EXCELLENT</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.summaryMetricCard}>
              <View style={styles.summaryMetricContent}>
                <Text style={styles.summaryMetricLabel}>Fraud Indicators</Text>
                <View style={styles.summaryMetricRight}>
                  <Text style={styles.summaryMetricValue}>None</Text>
                  <View style={[styles.summaryBadge, { backgroundColor: '#10B981' }]}>
                    <Text style={styles.summaryBadgeText}>CLEAR</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Network Tab Content */}
        {activeTab === 'network' && (
          <View style={styles.metricsContainer}>
            <View style={styles.summaryMetricCard}>
              <View style={styles.summaryMetricContent}>
                <Text style={styles.summaryMetricLabel}>Director Network</Text>
                <View style={styles.summaryMetricRight}>
                  <Text style={styles.summaryMetricValue}>Clean</Text>
                  <View style={[styles.summaryBadge, { backgroundColor: '#10B981' }]}>
                    <Text style={styles.summaryBadgeText}>VERIFIED</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.summaryMetricCard}>
              <View style={styles.summaryMetricContent}>
                <Text style={styles.summaryMetricLabel}>Business Associations</Text>
                <View style={styles.summaryMetricRight}>
                  <Text style={styles.summaryMetricValue}>8 Active</Text>
                  <View style={[styles.summaryBadge, { backgroundColor: '#3B82F6' }]}>
                    <Text style={styles.summaryBadgeText}>NORMAL</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.summaryMetricCard}>
              <View style={styles.summaryMetricContent}>
                <Text style={styles.summaryMetricLabel}>Cross-Ownership</Text>
                <View style={styles.summaryMetricRight}>
                  <Text style={styles.summaryMetricValue}>2 Links</Text>
                  <View style={[styles.summaryBadge, { backgroundColor: '#10B981' }]}>
                    <Text style={styles.summaryBadgeText}>STANDARD</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Approve Button */}
        <TouchableOpacity 
          style={styles.approveButton}
          onPress={() => router.push('/home')}
        >
          <Text style={styles.approveButtonText}>Approve Recommendation</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.approveIcon} />
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/home')}
        >
          <Ionicons name="home" size={24} color="#1E3A5F" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>HOME</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="time-outline" size={24} color="#9CA3AF" />
          <Text style={styles.navLabel}>REQUEST</Text>
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
    backgroundColor: '#0F3057',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 24,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  headerIcon: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1,
  },
  brainButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    backgroundColor: '#0F3057',
    paddingHorizontal: 20,
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#93A8C1',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  // Summary Card Styles
  summaryCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -16,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 10,

  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E3A5F',
    marginLeft: 8,
    letterSpacing: 0.5,
    
  },
  summaryTextContainer: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
  },
  summaryText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  // Metrics Row Styles
  metricsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  metricIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  metricValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  metricValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1E3A5F',
  },
  metricMax: {
    fontSize: 16,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  riskValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  riskValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginRight: 8,
  },
  riskIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
  },
  // Tabs Styles
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 0.5,
  },
  tabTextActive: {
    color: '#1E3A5F',
  },
  // Summary Metrics Styles
  metricsContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    gap: 16,
  },
  summaryMetricCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryMetricContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryMetricLabel: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '600',
  },
  summaryMetricRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  summaryMetricValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E3A5F',
  },
  summaryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  summaryBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  // Approve Button Styles
  approveButton: {
    backgroundColor: '#1E3A5F',
    marginHorizontal: 20,
    marginTop: 32,
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
  approveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  approveIcon: {
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
