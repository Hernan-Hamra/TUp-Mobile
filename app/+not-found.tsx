// app/+not-found.tsx

import React from "react";
import { View, Text } from "react-native";

const NotFound = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Página no encontrada</Text>
    </View>
  );
};

export default NotFound;
