import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { generate } from '../../utils/api';
import { useVoiceToText } from '@appcitor/react-native-voice-to-text';
import { useAuth } from '../../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const { token, logout } = useAuth();

  const {
    isRecording,
    isListening,
    isSpeaking,
    isReady,
    hasPermission,
    results,
    start,
    stop,
    cancel,
    destroy,
    requestPermission,
  } = useVoiceToText();

  useEffect(() => {
    if (results && results.length > 0) {
      setPrompt(results[0]);
    }
  }, [results]);

  useEffect(() => {
    return () => {
      destroy();
    };
  }, [destroy]);

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

  const handleVoicePress = async () => {
    const permission = await requestPermission();
    if (permission) {
      if (isRecording) {
        stop();
      } else {
        start();
      }
    } else {
      Alert.alert("Permission Denied", "You need to grant microphone permission to use this feature.");
    }
  };

  const handleLogout = () => {
    logout();
    // Navigation back to the login screen will be handled by the main App navigator
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.aiMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={prompt}
          onChangeText={setPrompt}
          placeholder="Type your message..."
        />
        <TouchableOpacity onPress={handleVoicePress} style={styles.micButton}>
          <Text>{isRecording ? 'Stop' : 'Mic'}</Text>
        </TouchableOpacity>
        <Button title="Send" onPress={handleSend} disabled={loading} />
      </View>
      <Button
        title="Manage Subscription"
        onPress={() => navigation.navigate('Subscription')}
      />
      <Button
        title="Logout"
        onPress={handleLogout}
        color="#f00"
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#f1f0f0',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  micButton: {
    padding: 10,
    marginRight: 10,
  },
});

export default HomeScreen;