import React, { useEffect, useState } from 'react';
import { Linking , View, StyleSheet, Button,Image,ScrollView,SafeAreaView, Text } from 'react-native';
import { signOut } from 'firebase/auth';

import { auth } from '../config';
import {storage} from '../config/firebase'
import { getDownloadURL, getMetadata, listAll, ref } from 'firebase/storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
//import './bgnotify.js'
import './bgq.js'
import { schedulePushNotification } from './bgq.js';
//import './backgroundnotify.js'
//import { dApp } from './notify.js';
//import BackgroundFetch from 'react-native-background-fetch';
//import PushNotification from 'react-native-push-notification';

/*PushNotification.configure({
  // onNotification is called when a notification is to be emitted
  onNotification: notification => console.log(notification),

  // Permissions to register for iOS
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
});*/
const handleLogout = () => {
  signOut(auth).catch(error => console.log('Error logging out: ', error));
};


//import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: "bold"
  },
  titleTex: {
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor:'red',
    marginBottom:5
  },
  titleTexG: {
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor:'green',
    marginBottom:5
  },
  img:{
   
   
    height: 400,
    flex:1,
    width: null,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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
  
  
  alignSelf:"center",}
  ,
  scrollView: {
    backgroundColor: '#ffffff',
    
  },
  container: {
    flex: 1,
    paddingTop: 2,
    paddingHorizontal:2,
    paddingVertical:2,
  },
  header:{
    backgroundColor: "#DCDCDC",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  
  avatar: {
    width: 260,
    height: 260,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginTop:100,
  },
  name:{
    fontSize:22,
    color:"#000000",
    fontWeight:'600',
  },
  userInfo:{
    fontSize:16,
    color:"#778899",
    fontWeight:'600',
  },
  body:{
    backgroundColor: "#778899",
    height:500,
    alignItems:'center',
  },
  item:{
   flexDirection : 'row',
  }
  ,
  iteme:{
   flexDirection : 'row',
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5,
    marginLeft: 10,
  },
  iconContent:{
    flex:1,
    alignItems:'center',
    paddingLeft:5,
   // marginLeft:200,
    marginTop:30,
    marginLeft:100
  },
  icon:{
    width:30,
    height:30,
    marginTop:20,
    marginLeft:10,
  },
  som:{
    //alignContent:'center'
    marginRight:10,
  },
  info:{
  
    
    
    marginTop:30,
    color: "#FFFFFF",
    fontSize:15,
    fontWeight:"bold"
},

});




const Tab = createBottomTabNavigator();
function Home() {


  return (
    
    <Tab.Navigator 
    headerShown='false'
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
    
        <Tab.Screen name="Home"  component={TabAScreen} options={{headerShown: false}} />
        <Tab.Screen name="About" component={TabBScreen}  />
    </Tab.Navigator>
  );
}
function AlertScreen({ navigation }) {
  var prevLength = 0;
  const d = new Date();
  const imageListRef = ref(storage, "images/")
  const cam1Ref = ref(storage, "cam1/")
  const cam2Ref = ref(storage, "cam2/")
  const [lastImage, setLastImage] = useState("")
  const [dateTime, setDateTime] = useState(" ")
  const [camNo, setCamNo] = useState(" ")
  const [alert, setAlert] = useState(true);
  const [ac, setAc] = useState(0);
  var currentdate = new Date();
 
  const [status, setStatus] = useState("not applicable")
  var counter = 61;
  var prevLengthc1 = 0;
  var prevLengthc2 = 0;

  var tracking1 = 0;
  var tracking2 = 0;
  const droneAlertWithCam = async() => {
    const listc1 = await listAll(cam1Ref)
    const lengthc1 = listc1.items.length;
    const listc2 = await listAll(cam2Ref)
    const lengthc2 = listc2.items.length;


    if(lengthc1 !== prevLengthc1){ //instead of > we can do !==
      console.log("drone detected at cam1");
      setAlert(true);
      setAc(0)
      counter=0
      schedulePushNotification()
     // registerBackgroundFetchAsync()

      prevLengthc1 = lengthc1;
      tracking1 = tracking2;
      tracking2 = 1;
      await getDownloadURL(listc1.items[lengthc1 - 1]).then((url) => {
        // console.log(url);
        setLastImage(url) 
      })
      await getMetadata(listc1.items[lengthc1 - 1]) 
      .then((metadata) => {
        // console.log("metaData:");
        // console.log(metadata.timeCreated)
        // Date timestamp = metadata.timeCreated.toDate()  
        console.log(metadata.name, " cam1");
        setDateTime(metadata.name.substring(0,21))

        // setCamNo(metadata.name.charAt(11))
        setCamNo("1")
    })
      .catch((error) => {
        console.log(error);
      });
      // await sleep(10000)
      // console.log("sleep 10s finished");
      if(tracking1 > tracking2){
        setStatus("receding")
      }else if(tracking2 > tracking1){
        setStatus("proceeding")
      }else if(tracking1 === tracking2){
        // setStatus("drone moving around near cam", camNo)
        setStatus(`drone moving around near cam ${camNo}`)
      }
    }
    
    else if(lengthc2 != prevLengthc2){ //instead of > we can do !==
      console.log("drone detected at cam2");
      setAlert(true);
      setAc(0)
      counter=0
      schedulePushNotification()
    //  registerBackgroundFetchAsync()
      

      prevLengthc2 = lengthc2;
      tracking1 = tracking2;
      tracking2 = 2;
      await getDownloadURL(listc2.items[lengthc2 - 1]).then((url) => {
        // console.log(url);
        
        setLastImage(url) 
      })
      await getMetadata(listc2.items[lengthc2 - 1]) 
      .then((metadata) => {
        // console.log("metaData:");
        // console.log(metadata.timeCreated)
        // Date timestamp = metadata.timeCreated.toDate()  
        console.log(metadata.name , " cam2");
        setDateTime(metadata.name.substring(0,21))

        // setCamNo(metadata.name.charAt(11))
        setCamNo("2")
      })
      .catch((error) => {
        console.log(error);
      });
      // await sleep(10000)
      // console.log("sleep 10s finished");
      if(tracking1 > tracking2){
        setStatus("receding")
      }else if(tracking2 > tracking1){
        setStatus("proceeding")
      }else if(tracking1 === tracking2){
        // setStatus("drone moving around near cam", camNo)
        setStatus(`drone moving around near cam ${camNo}`)
      }
     
    }
    else{
      console.log("no drone");
      setAlert(false);
      counter++;
      
      console.log(counter);
      setAc(counter)
    }
    

  }
  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../images/bell.wav')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  const droneAlert = async() => {
    const ab = await listAll(imageListRef)
    const length = ab.items.length;
    if(length > prevLength){
      console.log("drone detected");
      playSound()
      setAlert(true);
     /* PushNotification.localNotification({
        title: 'Cold Weather Alert',
        message: `It's  degrees outside.`,
        playSound: true,
        soundName: 'default',
      });*/
      prevLength = length;
      await getDownloadURL(ab.items[length - 1]).then((url) => {
         console.log(url);
        setLastImage(url) 
        console.log(lastImage)
      })
      await getMetadata(ab.items[length - 1])
      .then((metadata) => {
         console.log("metaData:");
         console.log(metadata.timeCreated);
        // Date timestamp = metadata.timeCreated.toDate()
       console.log(metadata.name);
        setCamNo(metadata.name.charAt(3))
        
        console.log(camNo, dateTime)
       
      })
      .catch((error) => {
        console.log(error);
      });
      // await sleep(10000)
      // console.log("sleep 10s finished");
    }else{
      console.log("no drone");
      setAlert(false);
      counter++;
      console.log(counter);
      setAc(counter)
      // return <ScrollView style={styles.scrollView} >
      // <Text style={styles.title}>No Drone</Text>
      // </ScrollView>
      // return <Text>yo</Text>
    
    }
    
  }



  useEffect(() => {
    console.log("working")
    setInterval(droneAlertWithCam, 1000)
    
    // see()
  },[])
  var currentTime = new Date();

var currentOffset = currentTime.getTimezoneOffset();

var ISTOffset = 330;   // IST offset UTC +5:30 

var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

// ISTTime now represents the time in IST coordinates

var hoursIST = ISTTime.getHours()
var minutesIST = ISTTime.getMinutes()
var secondsIST=ISTTime.getSeconds()
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView} >
      
      <Text style={alert || ac<60 ? styles.titleTex : styles.titleTexG}>{alert || ac<60 ? "Alert!! Drone detected" : "No drone seen within 60 seconds"}</Text>
     
      <Image style={styles.img}
        source={{
          uri: lastImage}}
      />
    <Text style={{color: 'blue'}}
      onPress={() => Linking.openURL(lastImage)}>
  Go to Image
</Text>
      <Text  style={styles.titleText}>Camera number : {camNo} </Text>
      
      <Text  style={styles.titleText}>Date: {dateTime.substring(0,10)}</Text>
      <Text  style={styles.titleText}>Time: {dateTime.substring(11,19)}</Text>
      {/* <Text  style={styles.titleText}>status: {status}</Text> */}
      
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
  return (<ScrollView style={styles.container}>
    <View style={styles.header}>
      <View style={styles.headerContent}>
          <Image style={styles.avatar}
            />

          <Text style={styles.name}> </Text>
          <Text style={styles.userInfo}> </Text>
          <Text style={styles.userInfo}></Text>
          
      </View>
    </View>

    <View style={styles.body}>
      <View style={styles.item}>
        <View style={styles.iconContent}>
        <Ionicons name="location"  size={30}  color='#fff' ></Ionicons>
        </View>
        <View  style={styles.som}>
          <Text style={styles.info}>Location is set by central </Text>
        </View>
      </View>

      <View style={styles.item}>
        <View style={styles.iconContent}>
        <Ionicons name="checkbox-outline"  size={30}  color='#fff' ></Ionicons>
           </View>
        <View  style={styles.som} >
          <Text style={styles.info}>No Suggested Action for you</Text>
        </View>
      </View>

      <View style={styles.item}>
        <View style={styles.iconContent}>
        <Ionicons name="notifications"  size={30}  color='#fff' ></Ionicons>
        </View>
        <View style={styles.som} >
          <Text style={styles.info}>No alerts for you</Text>
        </View>
      </View>

      

    </View>
</ScrollView>
    
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
        Welcome to Alokh Vision!
       </Text>
       <Text>
        {auth.currentUser.email}
       </Text>
      
    </View>
  );
}
function Signout(){
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
        This is a sample application made for Smart India Hackathon 2022
      </Text>
      
    </View>
  );
}
const Drawer = createDrawerNavigator();
export function HomeScreen() {
  return ( 
   // <NavigationContainer>
      <Drawer.Navigator initialRouteName="Alert" >
      
        <Drawer.Screen name="Home"  component={Home} options={{ drawerIcon: ({focused, size}) => (<Ionicons name="md-home" size={size} color={focused ? '#7cc' : '#ccc'}></Ionicons>)}}/>
        
        <Drawer.Screen name="Alert" component={AlertScreen} options={{ drawerIcon: ({focused, size}) => (<Ionicons name={focused?'alert':"notifications"} size={size} color={focused ? '#7cc' : '#ccc'}></Ionicons>)}}/>
        
        <Drawer.Screen name="Sign Out" component={Signout} options={{ drawerIcon: ({focused, size}) => (<Ionicons name="log-out" size={size} color='blue'></Ionicons>)}}/>

       {/*} <Drawer.Screen name="Notify" component={dApp} options={{ drawerIcon: ({focused, size}) => (<Ionicons name={focused?'alert':"notifications"} ></Ionicons>)}}/>*/}
 
      </Drawer.Navigator>
   // </NavigationContainer>
  )
};
//<Drawer.Screen name="Feed" component={FeedScreen} options={{ drawerIcon: ({focused, size}) => (<Ionicons name="eye" size={size} color={focused ? '#7cc' : '#ccc'}></Ionicons>)}}/>
//<Drawer.Screen name="Profile" component={ProfileScreen} options={{ drawerIcon: ({focused, size}) => (<Ionicons name="person" size={size} color={focused ? '#7cc' : '#ccc'}></Ionicons>)}}/>