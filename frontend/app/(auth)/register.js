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
import styles from '../../styles/register.styles.js';
import * as Animatable from 'react-native-animatable';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signup } = useAuth();

  const handleRegister = async () => {
    setLoading(true);
    try {
      await signup(email, password);
      Alert.alert('Registration Successful', 'You can now log in.');
      router.replace('/login');
    } catch (error) {
      Alert.alert('Registration Failed', error.message || 'An error occurred.');
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
        Create an Account
      </Animatable.Text>
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
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/login')} disabled={loading}>
          <Text style={styles.loginLink}>Already have an account? Login</Text>
        </TouchableOpacity>
      </Animatable.View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;