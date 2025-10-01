import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { getSubscription, updateSubscription } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const SubscriptionScreen = ({ navigation }) => {
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!token) return;
      try {
        const data = await getSubscription(token);
        if (data && data.plan) {
          setCurrentPlan(data.plan);
        } else {
          // If no subscription, default to a basic plan or handle as needed
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
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Subscription</Text>
      <Text style={styles.currentPlan}>Current Plan: {currentPlan}</Text>
      {loading && <ActivityIndicator />}
      <View style={styles.buttonContainer}>
        <Button title="Daily" onPress={() => handlePlanChange('daily')} disabled={loading} />
        <Button title="Monthly" onPress={() => handlePlanChange('monthly')} disabled={loading} />
        <Button title="Enterprise" onPress={() => handlePlanChange('enterprise')} disabled={loading} />
      </View>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  currentPlan: {
    fontSize: 18,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
});

export default SubscriptionScreen;