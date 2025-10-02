import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import SubscriptionModal from '../components/SubscriptionModal';

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <SubscriptionModal />
    </AuthProvider>
  );
};

export default RootLayout;