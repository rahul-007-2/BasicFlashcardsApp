import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Switch, Image, Modal, TextInput, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultQuestions, defaultAnswers } from './flashcards';

export default function AppPro() {
  const navigation = useNavigation();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [index, setIndex] = useState(0);
  const [buttonTitle, setButtonTitle] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Remove Question modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState("");

  // Add Question modal states
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const toggleSwitch = () => setIsDarkMode(prev => !prev);

  useFocusEffect(
    React.useCallback(() => {
      const loadFlashcards = async () => {
        const storedQuestions = JSON.parse(await AsyncStorage.getItem('questions')) || [];
        const storedAnswers = JSON.parse(await AsyncStorage.getItem('answers')) || [];

        const combinedQuestions = [...defaultQuestions, ...storedQuestions];
        const combinedAnswers = [...defaultAnswers, ...storedAnswers];

        setQuestions(combinedQuestions);
        setAnswers(combinedAnswers);
        setIndex(combinedQuestions.length - 1);
        setButtonTitle(combinedQuestions[combinedQuestions.length - 1] || "");
      };
      loadFlashcards();
    }, [])
  );

  const goNext = () => {
    if (index < questions.length - 1) {
      const newIndex = index + 1;
      setIndex(newIndex);
      setButtonTitle(questions[newIndex]);
    }
  };

  const goBack = () => {
    if (index > 0) {
      const newIndex = index - 1;
      setIndex(newIndex);
      setButtonTitle(questions[newIndex]);
    }
  };

  const showAnswer = () => {
    setButtonTitle(prev =>
      prev === questions[index] ? answers[index] : questions[index]
    );
  };

  const deleteQuestion = async () => {
    const qNum = parseInt(deleteIndex, 10) - 1;

    if (isNaN(qNum) || qNum < 0 || qNum >= questions.length) {
      Alert.alert("Invalid", "Please enter a valid question number.");
      return;
    }

    const storedQuestions = JSON.parse(await AsyncStorage.getItem('questions')) || [];
    const storedAnswers = JSON.parse(await AsyncStorage.getItem('answers')) || [];
    const combinedQuestions = [...defaultQuestions, ...storedQuestions];
    const combinedAnswers = [...defaultAnswers, ...storedAnswers];

    if (qNum < defaultQuestions.length) {
      Alert.alert("Error", "Default questions cannot be deleted.");
      return;
    }

    const storedIndex = qNum - defaultQuestions.length;
    storedQuestions.splice(storedIndex, 1);
    storedAnswers.splice(storedIndex, 1);

    await AsyncStorage.setItem('questions', JSON.stringify(storedQuestions));
    await AsyncStorage.setItem('answers', JSON.stringify(storedAnswers));

    const newQuestions = combinedQuestions.filter((_, i) => i !== qNum);
    const newAnswers = combinedAnswers.filter((_, i) => i !== qNum);

    setQuestions(newQuestions);
    setAnswers(newAnswers);
    setIndex(0);
    setButtonTitle(newQuestions[0] || "");

    setDeleteIndex("");
    setModalVisible(false);
  };

  const addQuestion = async () => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      Alert.alert("Invalid", "Please enter both question and answer.");
      return;
    }

    const storedQuestions = JSON.parse(await AsyncStorage.getItem('questions')) || [];
    const storedAnswers = JSON.parse(await AsyncStorage.getItem('answers')) || [];

    storedQuestions.push(newQuestion);
    storedAnswers.push(newAnswer);

    await AsyncStorage.setItem('questions', JSON.stringify(storedQuestions));
    await AsyncStorage.setItem('answers', JSON.stringify(storedAnswers));

    const newQuestions = [...defaultQuestions, ...storedQuestions];
    const newAnswersArray = [...defaultAnswers, ...storedAnswers];

    setQuestions(newQuestions);
    setAnswers(newAnswersArray);
    setIndex(newQuestions.length - 1);
    setButtonTitle(newQuestion);

    setNewQuestion("");
    setNewAnswer("");
    setAddModalVisible(false);
  };

  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={[themeStyles.safeArea]}>
      <View style={{ alignItems: 'center', paddingBottom: 70 }}>
        <Text style={themeStyles.headerText}>Flashcard Quiz</Text>
      </View>
      <View style={themeStyles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={isDarkMode ? require('./lightModeImage-modified.png') : require('./lightModeImage.png')} style={{ width: 30, height: 30 }} />
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#b3c9e1ff" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isDarkMode}
          />
          <Image source={isDarkMode ? require('./darkModeImage-modified.png') : require('./darkModeImage.png')} style={{ width: 30, height: 30 }} />
        </View>
        <TouchableOpacity style={themeStyles.addQuestionButton} onPress={() => setAddModalVisible(true)}>
          <Text style={themeStyles.addQuestionText}>Add Question</Text>
        </TouchableOpacity>
      </View>

      <View style={themeStyles.header}>
        <View></View>
        <TouchableOpacity style={themeStyles.addQuestionButton} onPress={() => setModalVisible(true)}>
          <Text style={themeStyles.addQuestionText}>Remove Question</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={addModalVisible} transparent={true} animationType="fade">
        <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.5)' }}>
          <View style={{ width:300, padding:20, backgroundColor:'white', borderRadius:10, alignItems:'center' }}>
            <Text>Enter new question and answer:</Text>
            <TextInput
              value={newQuestion}
              onChangeText={setNewQuestion}
              placeholder="Question"
              style={{ borderWidth:1, borderColor:'#ccc', borderRadius:5, padding:10, marginVertical:10, width:"100%" }}
            />
            <TextInput
              value={newAnswer}
              onChangeText={setNewAnswer}
              placeholder="Answer"
              style={{ borderWidth:1, borderColor:'#ccc', borderRadius:5, padding:10, marginVertical:10, width:"100%" }}
            />
            <View style={{ flexDirection:'row', marginTop:10 }}>
              <TouchableOpacity style={{ marginRight:15, padding:10, backgroundColor:'green', borderRadius:5 }} onPress={addQuestion}>
                <Text style={{ color:'white' }}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ padding:10, backgroundColor:'gray', borderRadius:5 }} onPress={() => setAddModalVisible(false)}>
                <Text style={{ color:'white' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.5)' }}>
          <View style={{ width:300, padding:20, backgroundColor:'white', borderRadius:10, alignItems:'center' }}>
            <Text>Enter question number to delete:</Text>
            <TextInput
              value={deleteIndex}
              onChangeText={setDeleteIndex}
              placeholder="e.g. 3"
              keyboardType="numeric"
              style={{ borderWidth:1, borderColor:'#ccc', borderRadius:5, padding:10, marginVertical:10, width:"100%" }}
            />
            <View style={{ flexDirection:'row', marginTop:10 }}>
              <TouchableOpacity style={{ marginRight:15, padding:10, backgroundColor:'red', borderRadius:5 }} onPress={deleteQuestion}>
                <Text style={{ color:'white' }}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ padding:10, backgroundColor:'gray', borderRadius:5 }} onPress={() => setModalVisible(false)}>
                <Text style={{ color:'white' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={themeStyles.flashCardContainer}>
        <TouchableOpacity style={themeStyles.flashCard} onPress={showAnswer}>
          <Text style={themeStyles.questionNumber}>{index + 1} of {questions.length}</Text>
          <Text style={themeStyles.flashCardText}>{buttonTitle}</Text>
        </TouchableOpacity>
      </View>

      <View style={themeStyles.navigationContainer}>
        <TouchableOpacity
          onPress={goBack}
          disabled={index === 0}
          style={themeStyles.backButton}
        >
          <Text style={themeStyles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goNext}
          disabled={index === questions.length - 1}
          style={themeStyles.nextButton}
        >
          <Text style={themeStyles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const baseStyles = {
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flashCardContainer: {
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashCard: {
    width: 370,
    height: 370,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  questionNumber: {
    position: 'absolute',
    top: 10,
    right: 15,
    padding: 8,
    borderRadius: 10,
    fontSize: 17,
  },
  flashCardText: {
    fontSize: 25,
    padding: 20,
    textAlign: 'center',
  },
  navigationContainer: {
    paddingTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  backButton: {
    padding: 10,
    borderRadius: 5,
    width: 70,
    alignItems: 'center',
  },
  nextButton: {
    padding: 10,
    borderRadius: 5,
    width: 70,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  addQuestionButton: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  addQuestionText: {
    fontSize: 17,
    padding: 8,
    textAlign: 'center',
  }
};

const lightStyles = StyleSheet.create({
  ...baseStyles,
  safeArea: { ...baseStyles.safeArea, backgroundColor: 'white' },
  headerText: { color: 'black', fontSize: 25 },
  flashCard: { ...baseStyles.flashCard, backgroundColor: 'lightblue' },
  questionNumber: { ...baseStyles.questionNumber, backgroundColor: 'lightgrey', color: 'black' },
  flashCardText: { ...baseStyles.flashCardText, color: 'black' },
  backButton: { ...baseStyles.backButton, backgroundColor: 'gray' },
  nextButton: { ...baseStyles.nextButton, backgroundColor: 'blue' },
  buttonText: { ...baseStyles.buttonText, color: 'white' },
  addQuestionButton: { ...baseStyles.addQuestionButton, backgroundColor: 'lightblue' },
  addQuestionText: { ...baseStyles.addQuestionText, color: 'black' },
});

const darkStyles = StyleSheet.create({
  ...baseStyles,
  safeArea: { ...baseStyles.safeArea, backgroundColor: '#121212' },
  headerText: { color: 'white', fontSize: 25 },
  flashCard: { ...baseStyles.flashCard, backgroundColor: '#1e1e1e' },
  questionNumber: { ...baseStyles.questionNumber, backgroundColor: '#333', color: 'white' },
  flashCardText: { ...baseStyles.flashCardText, color: 'white' },
  backButton: { ...baseStyles.backButton, backgroundColor: '#444' },
  nextButton: { ...baseStyles.nextButton, backgroundColor: '#007bff60' },
  buttonText: { ...baseStyles.buttonText, color: 'white' },
  addQuestionButton: { ...baseStyles.addQuestionButton, backgroundColor: '#333333ea' },
  addQuestionText: { ...baseStyles.addQuestionText, color: 'white' },
});
