import React from "react";
import { View, Text, Button } from "react-native"; // Asegúrate de solo importar aquí

const Home = () => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => {
          console.log("Button pressed");
        }}
      />
    </View>
  );
};

export default Home;
