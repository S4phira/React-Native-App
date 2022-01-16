import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (goalTitle) => {
    setCourseGoals((currentGoal) => [
      ...currentGoal,
      { id: Math.random().toString(), value: goalTitle },
    ]);

    setIsAddMode(false);
  };
  const removeGoalHandler = (goalId) => {
    setCourseGoals((currentGoal) => {
      return currentGoal.filter((goal) => goal.id !== goalId);
    });
  };
  const cancelGoalAdditionalHandler = () => {
    setIsAddMode(false);
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Button title="Add new Goal" onPress={() => setIsAddMode(true)} />
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={isAddMode}
          onCancel={cancelGoalAdditionalHandler}
        />
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={courseGoals}
          renderItem={(itemData) => (
            <GoalItem
              onDelete={removeGoalHandler.bind(this, itemData.item.id)}
              title={itemData.item.value}
            />
          )}
        ></FlatList>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
