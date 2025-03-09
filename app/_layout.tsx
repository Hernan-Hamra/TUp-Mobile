import { Stack } from "expo-router"; // Importa Stack para manejar navegación
import React from "react";
import { View, Text, SafeAreaView } from "react-native";

const Layout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Aquí podrías agregar un Header o menú */}
        <Text>Mi Aplicación Genial</Text>
        <Stack />{" "}
        {/* Esto se encarga de renderizar las pantallas automáticamente */}
      </View>
    </SafeAreaView>
  );
};

export default Layout;
