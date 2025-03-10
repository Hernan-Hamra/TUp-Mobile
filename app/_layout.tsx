import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Tabs } from "expo-router"; // Importamos Tabs para la navegación entre pantallas
import * as SecureStore from "expo-secure-store"; // Importamos SecureStore para manejar el token
import { useRouter } from "expo-router"; // Importamos useRouter para redirección

// Función para obtener el token de usuario almacenado de forma segura
const getUserToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("userToken");
    return token;
  } catch (error) {
    console.error("Error al obtener el token de usuario", error);
    return null;
  }
};

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter(); // Usamos el hook useRouter para realizar la redirección

  // Verificar el estado de autenticación
  useEffect(() => {
    const checkAuth = async () => {
      const token = await getUserToken(); // Verificamos si el token está presente
      if (token) {
        setIsAuthenticated(true); // Si el token existe, el usuario está autenticado
      } else {
        setIsAuthenticated(false); // Si no hay token, el usuario no está autenticado
        router.push("/auth/Login"); // Redirigimos al login si no está autenticado
      }
    };

    checkAuth();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // Mientras verificamos el estado de autenticación, mostramos una pantalla de carga
  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  // Si el usuario está autenticado, muestra las tabs
  return (
    <View style={{ flex: 1 }}>
      {isAuthenticated ? (
        <Tabs>
          {/* Aquí las pantallas de las tabs se gestionan automáticamente con expo-router */}
          <Tabs.Screen name="Home" />
          <Tabs.Screen name="Profile" />
          <Tabs.Screen name="Training" />
          <Tabs.Screen name="Progress" />
        </Tabs>
      ) : (
        // Si no está autenticado, la pantalla de login será gestionada automáticamente por expo-router
        <View>
          <Text>No estás autenticado. Por favor, inicia sesión.</Text>
        </View>
      )}
    </View>
  );
};

export default Layout;
