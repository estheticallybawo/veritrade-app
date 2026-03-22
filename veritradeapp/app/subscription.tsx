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

interface PlanFeature {
  text: string;
  included: boolean;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: PlanFeature[];
  isCurrent?: boolean;
  isBestValue?: boolean;
  buttonText: string;
}

export default function SubscriptionScreen() {
  const plans: SubscriptionPlan[] = [
    {
      id: 'starter',
      name: 'SME Starter',
      price: '₦0',
      period: 'Per Month',
      features: [
        { text: '2 Biz Reports Investigations', included: true },
        { text: '5 Scans', included: true },
        { text: 'Basic CAC Check', included: true },
        { text: 'Email Support', included: true },
      ],
      isCurrent: true,
      buttonText: 'Current Plan',
    },
    {
      id: 'pro',
      name: 'SME Pro',
      price: '₦15,000',
      period: 'Per Month',
      features: [
        { text: '4 Biz Reports Investigations', included: true },
        { text: 'Unlimited Scans', included: true },
        { text: 'Deep Fraud Detection', included: true },
        { text: 'Priority Support', included: true },
        { text: 'Bulk Export', included: true },
        { text: 'Risk API Access', included: true },
      ],
      isBestValue: true,
      buttonText: 'Upgrade Now',
    },
    {
      id: 'elite',
      name: 'VERITRADE Elite',
      price: '₦80,000',
      period: 'Per Month',
      features: [
        { text: 'Everything in Pro', included: true },
        { text: 'Unlimited Biz Reports Investigations', included: true },
        { text: 'Physical Site Verification', included: true },
        { text: 'Dedicated Account Manager', included: true },
        { text: 'Custom Integration Support', included: true },
        { text: 'Legal Documentation Support', included: true },
        { text: 'Advanced Analytics Dashboard', included: true },
      ],
      buttonText: 'Upgrade to Elite',
    },
  ];

  const handleUpgrade = (planId: string) => {
    if (process.env.NODE_ENV === 'development') {
    console.log('Upgrading to:', planId);
    } else {
    console.log('Upgrading to:');}
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
        <Text style={styles.headerTitle}>Subscription</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Upgrade to Pro Banner */}
        <View style={styles.promoBanner}>
          <View style={styles.promoIconCircle}>
            <Ionicons name="sparkles" size={28} color="#F59E0B" />
          </View>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Upgrade to Pro</Text>
            <Text style={styles.promoDescription}>
              Get unlimited access to CAC data and advanced risk intelligence for your business.
            </Text>
            <View style={styles.enterpriseBadge}>
              <Ionicons name="flash" size={16} color="#1E3A5F" />
              <Text style={styles.enterpriseText}>ENTERPRISE READY</Text>
            </View>
          </View>
        </View>

        {/* Subscription Plans */}
        {plans.map((plan, index) => (
          <View 
            key={plan.id} 
            style={[
              styles.planCard,
              plan.isBestValue && styles.planCardBestValue,
              index > 0 && styles.planCardMargin
            ]}
          >
            {plan.isBestValue && (
              <View style={styles.bestValueBadge}>
                <Text style={styles.bestValueText}>BEST VALUE</Text>
              </View>
            )}

            <View style={styles.planHeader}>
              <Text style={styles.planName}>{plan.name}</Text>
              <View style={styles.planPriceContainer}>
                <Text style={styles.planPrice}>{plan.price}</Text>
                <Text style={styles.planPeriod}>{plan.period}</Text>
              </View>
            </View>

            <View style={styles.featuresList}>
              {plan.features.map((feature, featureIndex) => (
                <View key={featureIndex} style={styles.featureItem}>
                  <View style={[
                    styles.featureCheckCircle,
                    !feature.included && styles.featureCheckCircleDisabled
                  ]}>
                    <Ionicons 
                      name="checkmark" 
                      size={16} 
                      color={feature.included ? '#10B981' : '#D1D5DB'} 
                    />
                  </View>
                  <Text style={[
                    styles.featureText,
                    !feature.included && styles.featureTextDisabled
                  ]}>
                    {feature.text}
                  </Text>
                </View>
              ))}
            </View>

            <TouchableOpacity 
              style={[
                styles.planButton,
                plan.isCurrent && styles.planButtonCurrent,
                plan.isBestValue && styles.planButtonBestValue
              ]}
              onPress={() => handleUpgrade(plan.id)}
              disabled={plan.isCurrent}
            >
              <Text style={[
                styles.planButtonText,
                plan.isCurrent && styles.planButtonTextCurrent,
                plan.isBestValue && styles.planButtonTextBestValue
              ]}>
                {plan.buttonText}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Enterprise Contact */}
        <View style={styles.enterpriseCard}>
          <Text style={styles.enterpriseTitle}>Need a custom solution?</Text>
          <Text style={styles.enterpriseDescription}>
            Contact our sales team for enterprise pricing and custom packages tailored to your needs.
          </Text>
          <TouchableOpacity style={styles.contactButton}>
            <Ionicons name="mail-outline" size={20} color="#1E3A5F" style={styles.contactIcon} />
            <Text style={styles.contactButtonText}>Contact Sales</Text>
          </TouchableOpacity>
        </View>
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
          <Ionicons name="time-outline" size={24} color="#9CA3AF" />
          <Text style={styles.navLabel}>HISTORY</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#9CA3AF" />
          <Text style={styles.navLabel}>PROFILE</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings-outline" size={24} color="#1E3A5F" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>SETTINGS</Text>
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
  },
  headerSpacer: {
    width: 48,
  },
  // Promo Banner Styles
  promoBanner: {
    backgroundColor: '#1E3A5F',
    marginHorizontal: 20,
    marginTop: 24,
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  promoIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  promoContent: {
    gap: 12,
  },
  promoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  promoDescription: {
    fontSize: 14,
    color: '#93A8C1',
    lineHeight: 22,
  },
  enterpriseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(232, 240, 250, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    gap: 6,
  },
  enterpriseText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E3A5F',
    letterSpacing: 0.5,
  },
  // Plan Card Styles
  planCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 24,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  planCardBestValue: {
    borderColor: '#1E3A5F',
    borderWidth: 3,
  },
  planCardMargin: {
    marginTop: 20,
  },
  bestValueBadge: {
    position: 'absolute',
    top: -12,
    right: 24,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  bestValueText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  planHeader: {
    marginBottom: 24,
  },
  planName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 12,
  },
  planPriceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPrice: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1E3A5F',
  },
  planPeriod: {
    fontSize: 16,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  featuresList: {
    gap: 16,
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureCheckCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureCheckCircleDisabled: {
    backgroundColor: '#F3F4F6',
  },
  featureText: {
    fontSize: 15,
    color: '#1A1A1A',
    flex: 1,
  },
  featureTextDisabled: {
    color: '#9CA3AF',
  },
  planButton: {
    backgroundColor: '#1E3A5F',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#1E3A5F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  planButtonCurrent: {
    backgroundColor: '#E8F0FA',
    shadowOpacity: 0,
    elevation: 0,
  },
  planButtonBestValue: {
    backgroundColor: '#1E3A5F',
  },
  planButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  planButtonTextCurrent: {
    color: '#93A8C1',
  },
  planButtonTextBestValue: {
    color: '#fff',
  },
  // Enterprise Card Styles
  enterpriseCard: {
    backgroundColor: '#F3F4F6',
    marginHorizontal: 20,
    marginTop: 24,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  enterpriseTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  enterpriseDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 16,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  contactIcon: {
    marginRight: 8,
  },
  contactButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E3A5F',
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
