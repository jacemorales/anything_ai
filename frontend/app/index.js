import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const StartPage = () => {
  // The AuthContext will handle the redirection logic.
  // This screen will only be visible for a moment while the context determines the auth state.
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default StartPage;