import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { getSubscription, updateSubscription } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/subscription.styles.js';

const SubscriptionScreen = () => {
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!token) return;
      try {
        const data = await getSubscription(token);
        if (data && data.plan) {
          setCurrentPlan(data.plan);
        } else {
          setCurrentPlan('daily');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch subscription details.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [token]);

  const handlePlanChange = async (plan) => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await updateSubscription(plan, token);
      if (data && data.plan) {
        setCurrentPlan(data.plan);
        Alert.alert('Success', `Your plan has been updated to ${plan}.`);
      } else {
        Alert.alert('Error', data.message || 'Failed to update subscription.');
      }
    } catch (error) {
      Alert.alert('API Error', 'An error occurred while updating your plan.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !currentPlan) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  const renderPlan = (plan, title, description) => (
    <TouchableOpacity
      style={[styles.planContainer, currentPlan === plan && styles.selectedPlan]}
      onPress={() => handlePlanChange(plan)}
      disabled={loading}
    >
      <Text style={styles.planTitle}>{title}</Text>
      <Text style={styles.planDescription}>{description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/brand.png')} style={styles.brandLogo} />
      <Text style={styles.title}>Manage Subscription</Text>
      <Text style={styles.currentPlan}>Current Plan: {currentPlan}</Text>
      {loading && <ActivityIndicator style={styles.loader} />}
      <View style={styles.plansWrapper}>
        {renderPlan('daily', 'Daily', 'A simple plan for casual users.')}
        {renderPlan('monthly', 'Monthly', 'Best for regular users.')}
        {renderPlan('enterprise', 'Enterprise', 'For power users and businesses.')}
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubscriptionScreen;