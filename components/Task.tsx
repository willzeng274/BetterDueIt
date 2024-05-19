import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function Task(props: { name?: string, date?: Date, money?: number, completed?: boolean, onToggleComplete?: () => void, onEdit?: () => void, onDelete?: () => void }) {
  const { name, date, money, completed, onToggleComplete, onEdit, onDelete } = props;

  // Format the date to a readable string
  const formattedDate = date ? date.toLocaleString() : 'No date provided';

  // Format the money to a currency string
  const formattedMoney = money !== undefined ? `AVAX $${parseFloat(money.toString()).toFixed(2)}` : 'No money specified';

  return (
    <View style={[styles.taskContainer, completed && styles.completedContainer]}>
      <TouchableOpacity onPress={onToggleComplete}>
        <Ionicons
          name={completed ? 'checkbox-outline' : 'square-outline'}
          size={24}
          color={completed ? '#007AFF' : '#000'}
          style={{ marginRight: 8 }}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={[styles.taskText, styles.nameText, completed && styles.completedText]}>
          {name || 'No name provided'}
        </Text>
        <Text style={[styles.taskText, styles.dateText, completed && styles.completedText]}>
          {`Intended Date:\n${formattedDate}`}
        </Text>
        <Text style={[styles.taskText, styles.moneyText, completed && styles.completedText]}>
          Money: {formattedMoney}
        </Text>
      </View>
      {onEdit && onDelete && (
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={onEdit}>
            <Ionicons name="create-outline" size={24} color="#007AFF" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Ionicons name="trash-outline" size={24} color="#FF3B30" style={styles.icon} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    margin: 5,
  },
  completedContainer: {
    backgroundColor: '#d3d3d3', // Grey background when completed
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
  },
  taskText: {
    marginBottom: 8,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    color: '#666',
  },
  moneyText: {
    fontSize: 16,
    color: '#666',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 8,
  },
});
