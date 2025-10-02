import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { getAdminStats, getAdminUsers } from '../../utils/api';
import styles from '../../styles/admin.styles';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError('Authentication token not found.');
        setLoading(false);
        return;
      }

      try {
        const [statsData, usersData] = await Promise.all([
          getAdminStats(token),
          getAdminUsers(token),
        ]);

        if (statsData.totalUsers !== undefined) {
          setStats(statsData);
        } else {
          throw new Error(statsData.message || 'Failed to fetch stats');
        }

        if (Array.isArray(usersData)) {
          setUsers(usersData);
        } else {
          throw new Error(usersData.message || 'Failed to fetch users');
        }
      } catch (err) {
        setError(err.message);
        Alert.alert('Error', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderUser = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userEmail}>{item.email}</Text>
      <Text style={styles.userDate}>
        Joined: {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      {stats && (
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Users</Text>
            <Text style={styles.statValue}>{stats.totalUsers}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Subscriptions</Text>
            <Text style={styles.statValue}>{stats.totalSubscriptions}</Text>
          </View>
        </View>
      )}
      <Text style={styles.title}>Users</Text>
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.id.toString()}
        style={styles.userList}
      />
    </View>
  );
};

export default AdminDashboard;