import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React, {useState, useEffect} from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, on, off} from "firebase/database";


import green from '../assets/Plant-display-img/green.jpg';
import red from '../assets/Plant-display-img/red.jpg';

const firebaseConfig = {
  apiKey: "AIzaSyCOjtt0o9yWYqNV40ClUQ9Uc9bUqv-6oM0",
  authDomain: "brrrrrrrr-756df.firebaseapp.com",
  databaseURL: "https://brrrrrrrr-756df-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "brrrrrrrr-756df",
  storageBucket: "brrrrrrrr-756df.appspot.com",
  messagingSenderId: "1033819709881",
  appId: "1:1033819709881:web:64fc660d402c4f64b2d668"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

const HomeScreen = () => {
  const [Image1, setImage1] = useState({uri:green});
  const [Image2, setImage2] = useState(red);
  const [Image3, setImage3] = useState(red);
  const [Image4, setImage4] = useState(red);
  const [Image5, setImage5] = useState(green);
  const [Image6, setImage6] = useState(green);
  const [Image7, setImage7] = useState(green);
  const [Image8, setImage8] = useState(green);
  const [Image9, setImage9] = useState(green);

  
  useEffect(() => {
    const firebaseDataRef = ref(db, 'posts/');
    let isSubscribed = true;

    const fetchFirebaseData = () => {
      const listener = onValue(firebaseDataRef, (snapshot) => {
        const data = snapshot.val();
        if (data && Array.isArray(data) && isSubscribed) {
          const firstElement = data[1];
          console.log(firstElement)
          setImage1(firstElement);
          console.log("Variable itself " +Image1);
        }
      });

      // Detach the event listener manually when the component unmounts
      return () => {
        off(firebaseDataRef, listener);
        isSubscribed = false;
      };
    };

    fetchFirebaseData();

  
  }, []);
  
  return (
    <View style={styles.container}>
      <Text>Test 1</Text>
      <View style={styles.column}>
      <View style={styles.row}>
      <Image
      style={styles.map_img}
        source={{uri:Image1}}
      />
      <Image
      style={styles.map_img}
        source={Image4}
      />
      <Image
      style={styles.map_img}
        source={Image7}
      />
      </View>
      <View style={styles.row}>
      <Image
      style={styles.map_img}
        source={Image2}
      />
      <Image
      style={styles.map_img}
        source={Image5}
      />
      <Image
      style={styles.map_img}
        source={Image8}
      />
      </View>
      <View style={styles.row}>
      <Image
      style={styles.map_img}
        source={Image3}
      />
      <Image
      style={styles.map_img}
        source={Image6}
      />
      <Image
      style={styles.map_img}
        source={Image9}
      />
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map_img:{
    height:50,
    width:50,
    borderRadius:13
  },
  row:{
    flexDirection:'row',
    width:'60%',
    justifyContent:'space-evenly',
  },
  column:{
    flexDirection:'column',
    height:'60%',
    justifyContent:'space-evenly',
  }
});

export default HomeScreen;