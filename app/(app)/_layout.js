import React from 'react';
import { Stack } from 'expo-router';

const AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ title: 'Home' }} />
      <Stack.Screen name="subscription" options={{ title: 'Subscription' }} />
    </Stack>
  );
};

export default AppLayout;