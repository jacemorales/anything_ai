import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { generate } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/home.styles.js';
import * as Animatable from 'react-native-animatable';

const HomeScreen = () => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { token, logout } = useAuth();

  const handleSend = async () => {
    if (!prompt.trim() || !token) return;

    const newMessages = [...messages, { id: Date.now().toString(), text: prompt, sender: 'user' }];
    setMessages(newMessages);
    setPrompt('');
    setLoading(true);

    try {
      const data = await generate(prompt, token);
      if (data.reply) {
        setMessages([...newMessages, { id: (Date.now() + 1).toString(), text: data.reply, sender: 'ai' }]);
      } else {
        Alert.alert('Error', data.message || 'Failed to get a response.');
      }
    } catch (error) {
      Alert.alert('API Error', 'An error occurred while fetching the response.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const renderItem = ({ item }) => (
    <Animatable.View
      animation="fadeIn"
      duration={500}
      style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.aiMessage]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </Animatable.View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <View style={styles.header}>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>AI Assistant</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutButton}>Logout</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={prompt}
          onChangeText={setPrompt}
          placeholder="Type your message..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend} disabled={loading}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.subscriptionButton}
        onPress={() => router.push('/subscription')}
      >
        <Text style={styles.subscriptionButtonText}>Manage Subscription</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;