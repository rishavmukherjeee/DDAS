import React from 'react';
import { View, StyleSheet, Button,TouchableOpacity, Image,ScrollView,SafeAreaView, Text ,StatusBar } from 'react-native';
import { signOut } from 'firebase/auth';

import { auth } from '../config';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
const handleLogout = () => {
  signOut(auth).catch(error => console.log('Error logging out: ', error));
};


//import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: "bold"
  },
  img:{
   
    width: 310,
    height: 290,
  },
  button:{
    backgroundColor:'#078',
    width:'30%',
    padding:15,
    borderRadius:10,
    alignSelf:'center',
    marginTop:'5%',
    paddingHorizontal:'10%',
    justifyContent:'center',
    
},
buttonText:{
  color:'#ffffff',
 
  fontSize:20,
  
  
  alignSelf:"center",
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    
  },
}

});
const Tab = createBottomTabNavigator();
function Home() {
  return (
    
    <Tab.Navigator
    
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
     let iconName= "home";
   //  if (route.name === 'Welcome To Drone Detection Alert System') {
     //   iconName = {focused? 'home ' : 'md-home'}
       if (route.name === 'About') {
        iconName = focused
        ? 'document-text-outline'
        : 'list-outline';
      }
return <Ionicons name={iconName} size={size} color={color}     />;
        },
      })}
      tabBarOptions={{
      activeTintColor:  '#f18a85',
      inactiveTintColor: 'gray',
      }}>
    
        <Tab.Screen name="Home" component={TabAScreen} options={{headerShown: false}} />
        <Tab.Screen name="About" component={TabBScreen}  />
    </Tab.Navigator>
  );
}
function AlertScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView} >
      <Text style={styles.titleText}>Alert !!   Drone Detected</Text>
      
      <Text  style={styles.titleText}>Location: </Text>
      <Text  style={styles.titleText}>Direction:  Preceding towards Cam3</Text>
    </ScrollView>
    </SafeAreaView>
  );
}
function FeedScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>No New Notifications!</Text>
      <Button 
      onPress={() => navigation.goBack()}
      title="Go back home"
      />
    </View>
  );
}
function ProfileScreen({ navigation }) {
  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image style={styles.img}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png'}}
      />
      <Text>No New Notifications!</Text>
      <Button 
      //onPress={() => navigation.goBack()}
      title="Go back home"
      />
    </View>
    
  );
}
const Stack = createStackNavigator();
function TabAScreen() {
  return (
    
    <Stack.Navigator style={ {flex:1, alignItems: 'center', justifyContent: 'center', }} >
      <Stack.Screen  name="A" component={TabADetailsScreen} options={{headerShown: false}}/>
      
    </Stack.Navigator>
  );
}

function TabADetailsScreen({navigation}) {
  //const navigation = useNavigation()

  return (
    
    <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
      <Text style={styles.titleText}>
        Welcome to Drone Detection Alert System!
       
      </Text>
      
    </View>
  );
}
function signout(){
 // const handleSignOut =() =>{
  const navigation= useNavigation()
    auth
    .signOut()
    .then(()=>{
      navigation.navigate("LoginScreen")
    })
    .catch(error => alert(error.message))
    return null
 /* }
  return(
    <View>
      <TouchableOpacity
        onPress={handleSignOut }
        style={styles.button}
        >
            <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
    </View>
  )*/
}


function TabBScreen() {
  return (
    <View>
      <Text style={{textAlign: 'center', marginTop: 300}}>
        Welcome to TabB page!
      </Text>
      
    </View>
  );
}
const Drawer = createDrawerNavigator();
export function HomeScreen() {
  return ( 
   // <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
      
        <Drawer.Screen name="Home" component={Home} options={{ drawerIcon: ({focused, size}) => (<Ionicons name="md-home" size={size} color={focused ? '#7cc' : '#ccc'}></Ionicons>)}}/>
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ drawerIcon: ({focused, size}) => (<Ionicons name="person" size={size} color={focused ? '#7cc' : '#ccc'}></Ionicons>)}}/>
        <Drawer.Screen name="Alert" component={AlertScreen} options={{ drawerIcon: ({focused, size}) => (<Ionicons name={focused?'alert':"notifications"} size={size} color={focused ? '#7cc' : '#ccc'}></Ionicons>)}}/>
        <Drawer.Screen name="Feed" component={FeedScreen} options={{ drawerIcon: ({focused, size}) => (<Ionicons name="eye" size={size} color={focused ? '#7cc' : '#ccc'}></Ionicons>)}}/>
        <Drawer.Screen name="Sign Out" component={signout} options={{ drawerIcon: ({focused, size}) => (<Ionicons name="log-out" size={size} color='blue'></Ionicons>)}}/>
 
      </Drawer.Navigator>
   // </NavigationContainer>
  )
};
