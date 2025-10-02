import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

const SubscriptionModal = () => {
  const { isSubscriptionModalVisible, setSubscriptionModalVisible } = useAuth();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isSubscriptionModalVisible}
      onRequestClose={() => {
        setSubscriptionModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Subscription Required</Text>
          <Text style={styles.subText}>
            Your plan has expired or you do not have an active subscription. Please choose a plan to continue.
          </Text>

          <View style={styles.planContainer}>
            <Text style={styles.planTitle}>Daily Plan</Text>
            <Text style={styles.planDescription}>- Access for 24 hours</Text>
            <Button title="Choose Daily" onPress={() => { /* Handle plan selection */ }} />
          </View>

          <View style={styles.planContainer}>
            <Text style={styles.planTitle}>Monthly Plan</Text>
            <Text style={styles.planDescription}>- Best value for regular users</Text>
            <Button title="Choose Monthly" onPress={() => { /* Handle plan selection */ }} />
          </View>

          <View style={styles.planContainer}>
            <Text style={styles.planTitle}>Enterprise Plan</Text>
            <Text style={styles.planDescription}>- For teams and businesses</Text>
            <Button title="Contact Us" onPress={() => { /* Handle plan selection */ }} />
          </View>

          <Button title="Close" onPress={() => setSubscriptionModalVisible(false)} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  planContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  planDescription: {
    marginBottom: 10,
  }
});

export default SubscriptionModal;