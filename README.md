Welcome to README file.

This is ReactNative project in JavaScript.
I have tested the app only on Android Emulator (Windows user).

I have created a basic Flashcards App. 
It opens up to the flashcards screen with 5 default flashcards. It has options to add flashcards (with question and answer) and also can delete flashcards (except for the 5 default ones, which can be accessed in 'flashcards.js').The addition and deletion button opens up a modal with text input fields. These get stored in Async Storage and hence even if the app is closed, the newly added flashcards don't get deleted. It only accepts addition of flashcard if both question and answer is present and only accepts deletion if it is within the total number of flashcards. It also has a switch to toggle between dark and light modes, with icons for each (which also changes w.r.t the mode) to make UI look better.Tapping on the flashcard switches between question and answer. There are two buttons to navigate to next flashcard and previous flashcard. It also shows the current flashcard number.

Dependencies to be installed:
    npm install @react-navigation/native 
    npm install react-native-screens 
    npm install react-native-safe-area-context 
    npm install @react-native-async-storage/async-storage
These are the additional libraries I have used (in addition to built in libraies in ReactNative).

To run the project,
  1) Set up ReactNative Developement enviroment. Refer "https://reactnative.dev/docs/getting-started" for steps if needed. Alternatively, refer the playlist       "https://www.youtube.com/playlist?list=PLRAV69dS1uWSjBBJ-egNNOd4mdblt1P4c" if needed.
  2) Install the mentioned dependencies.
  3) For Windows, download Android Studio and use Virtual Emulator or physical device to run the app.

App Screenshots:
  Initial Screen (Light Mode),
    <img width="449" height="942" alt="image" src="https://github.com/user-attachments/assets/9c08862d-6be0-4803-bee5-5e5b91995507" />
    <img width="452" height="939" alt="image" src="https://github.com/user-attachments/assets/98361eb8-d796-40e1-9fee-0f934611a116" />
    <img width="454" height="943" alt="image" src="https://github.com/user-attachments/assets/fd2fa3f9-27e0-428f-af06-a727e3b4888d" />
    <img width="460" height="939" alt="image" src="https://github.com/user-attachments/assets/1ba8ebbb-219f-41ba-84de-d078d369ab3e" />
    <img width="454" height="943" alt="image" src="https://github.com/user-attachments/assets/da684b24-814e-4c61-8526-5141b87dd4ac" />
    <img width="451" height="938" alt="image" src="https://github.com/user-attachments/assets/39a67b45-9914-44b4-a89e-6c56ecea43b9" />
    <img width="456" height="938" alt="image" src="https://github.com/user-attachments/assets/56304c24-8926-499b-bd77-b1e0ee14dc24" />
    <img width="456" height="946" alt="image" src="https://github.com/user-attachments/assets/0d89d167-0cd2-4bd6-b13c-804fd6b236c6" />
    <img width="457" height="934" alt="image" src="https://github.com/user-attachments/assets/2b35a914-5845-4781-a950-14449d45312b" />

App Video:
  https://github.com/user-attachments/assets/476fe93c-13d1-4a23-8027-f283c687e14d


  
