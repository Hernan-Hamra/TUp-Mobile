// app/layout.tsx

import React from "react";
import { View, Text, SafeAreaView } from "react-native";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Aquí podrías agregar el header o el menu */}
        <Text>Mi Aplicación</Text>
        {children} {/* Esto se llena con las pantallas renderizadas */}
      </View>
    </SafeAreaView>
  );
};

export default Layout;
