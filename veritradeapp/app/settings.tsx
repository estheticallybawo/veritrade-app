import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Switch,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../services/api';
import { useUser } from '../contexts/UserContext';
import { setCurrentUserEmail } from '../services/verification';

export default function SettingsScreen() {
  const { user, clearUser } = useUser();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleLogout = () => {
    const performLogout = () => {
      // Clear authentication state
      api.clearToken();
      clearUser();
      setCurrentUserEmail(null);
      // Navigate to login - works on both web and native
      router.replace('/login');
    };

    // Use platform-specific confirmation
    if (Platform.OS === 'web') {
      // Use browser confirm for web
      if (window.confirm('Are you sure you want to sign out?')) {
        performLogout();
      }
    } else {
      // Use native Alert for mobile
      Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: performLogout
        }
      ]);
    }
  };

  const handleSwitchToAdmin = () => {
    Alert.alert('Admin View', 'This is a simulation of the admin verification interface.', [
      { text: 'OK' }
    ]);
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
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* User Profile Card */}
        <View style={styles.userCard}>
          <View style={styles.userIconCircle}>
            <Ionicons name="person-circle" size={64} color="#1E3A5F" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || 'User'}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
            {user?.verified_status === 'verified' && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#10B981" />
                <Text style={styles.verifiedText}>Verified SME Status</Text>
              </View>
            )}
          </View>
        </View>

        {/* APP CONFIGURATION Section */}
        <Text style={styles.sectionTitle}>APP CONFIGURATION</Text>

        {/* Business Profile */}
        <TouchableOpacity 
          style={styles.settingItem}
           onPress={() => router.push('/profile')}
          
        >
          <View style={styles.settingIconCircle}>
            <Ionicons name="person-outline" size={20} color="#1E3A5F" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Business Profile</Text>
            <Text style={styles.settingSubtitle}>Update company details</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Security */}
        <TouchableOpacity 
          style={styles.settingItem}
    
        >
          <View style={styles.settingIconCircle}>
            <Ionicons name="shield-outline" size={20} color="#1E3A5F" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Security</Text>
            <Text style={styles.settingSubtitle}>Password & 2FA</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Notifications */}
        <View style={styles.settingItem}>
          <View style={styles.settingIconCircle}>
            <Ionicons name="notifications-outline" size={20} color="#1E3A5F" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Notifications</Text>
            <Text style={styles.settingSubtitle}>Fraud alerts & daily reports</Text>
          </View>
          <Switch 
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#E5E7EB', true: '#10B98150' }}
            thumbColor={notificationsEnabled ? '#10B981' : '#fff'}
          />
        </View>

        {/* Email Alerts Toggle */}
        <View style={[styles.settingItem, styles.settingItemNested]}>
          <View />
          <View style={styles.settingContent}>
            <Text style={styles.settingSubtitleNested}>Email Alerts</Text>
          </View>
          <Switch 
            value={emailAlerts}
            onValueChange={setEmailAlerts}
            trackColor={{ false: '#E5E7EB', true: '#10B98150' }}
            thumbColor={emailAlerts ? '#10B981' : '#fff'}
          />
        </View>

        {/* Subscription */}
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => router.push('/subscription')}
        >
          <View style={styles.settingIconCircle}>
            <Ionicons name="card-outline" size={20} color="#1E3A5F" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Subscription</Text>
            <Text style={styles.settingSubtitle}>Manage your Pro plan</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Support */}
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => Alert.alert('Support', 'Contact us at support@veritrade.com')}
        >
          <View style={styles.settingIconCircle}>
            <Ionicons name="help-circle-outline" size={20} color="#1E3A5F" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Support</Text>
            <Text style={styles.settingSubtitle}>Help center & FAQs</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Admin Switch Button 
        <TouchableOpacity 
          style={styles.adminButton}
          onPress={handleSwitchToAdmin}
        >
          <Ionicons name="settings-sharp" size={24} color="#F59E0B" />
          <View style={styles.adminContent}>
            <Text style={styles.adminButtonText}>Switch to Admin View</Text>
            <Text style={styles.adminButtonSubtitle}>Manual review simulation</Text>
          </View>
          <Ionicons name="lock-closed" size={20} color="#F59E0B" />
        </TouchableOpacity>*/}

        {/* Sign Out Button */}
        <TouchableOpacity 
          style={styles.signOutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#EF4444" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
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
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/profile')}
        >
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
    paddingBottom: 120,
  },
  userCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  userIconCircle: {
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
    marginHorizontal: 20,
    marginBottom: 12,
    letterSpacing: 1,
  },
  settingItem: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItemNested: {
    marginHorizontal: 40,
    marginBottom: 8,
    paddingLeft: 0,
    paddingRight: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    elevation: 0,
    shadowOpacity: 0,
  },
  settingIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F0FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  settingSubtitleNested: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  adminButton: {
    backgroundColor: '#1A2D4A',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  adminContent: {
    flex: 1,
  },
  adminButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  adminButtonSubtitle: {
    fontSize: 12,
    color: '#93A8C1',
    marginTop: 2,
  },
  signOutButton: {
    backgroundColor: '#FEF2F2',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  signOutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#EF4444',
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
