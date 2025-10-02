import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/login.styles.js';
import * as Animatable from 'react-native-animatable';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Animatable.View animation="fadeInDown" duration={1000}>
        <Image source={require('../../assets/brand.png')} style={styles.logo} />
      </Animatable.View>
      <Animatable.Text animation="fadeInUp" delay={200} duration={1000} style={styles.title}>
        Welcome Back!
      </Animatable.Text>
      {error ? (
        <Animatable.Text animation="shake" duration={500} style={styles.errorText}>
          {error}
        </Animatable.Text>
      ) : null}
      <Animatable.View animation="fadeInUp" delay={400} duration={1000} style={{width: '100%'}}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#999"
        />
      </Animatable.View>
      <Animatable.View animation="fadeInUp" delay={600} duration={1000} style={{width: '100%'}}>
        <TouchableOpacity testID="login-button" style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/register')} disabled={loading}>
          <Text style={styles.registerLink}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </Animatable.View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;