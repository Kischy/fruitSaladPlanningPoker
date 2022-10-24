import AppLoading from 'expo-app-loading';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { RobotoMono_400Regular } from '@expo-google-fonts/roboto-mono';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen,RoomScreen, PrivacyPolicyScreen, NotFoundScreen } from './src/screens';

const Stack = createNativeStackNavigator();

const linking = {
  config: 
  {
    screens: {
      Home: "",
      Room: "Room",
      PrivacyPolicy: "PrivacyPolicy",
      NotFound: "*",
  }},
};


export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    RobotoMono_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Room" component={RoomScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} />
      </Stack.Navigator>
    </NavigationContainer >
  );
}


