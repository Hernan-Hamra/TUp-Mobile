import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store"; // Almacenamiento seguro
import { useNavigation } from "@react-navigation/native";
import * as Google from "expo-auth-session/providers/google";

// Esquema de validación con Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo inválido")
    .required("El email es obligatorio"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .required("La contraseña es obligatoria"),
});

const Login = () => {
  const navigation = useNavigation(); // Hook para manejar la navegación entre pantallas
  const [loading, setLoading] = useState(false); // Estado para manejar el indicador de carga
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "TU_GOOGLE_CLIENT_ID",
    iosClientId: "TU_IOS_CLIENT_ID",
    androidClientId: "TU_ANDROID_CLIENT_ID",
  });

  // Manejar el inicio de sesión con credenciales
  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("https://tu-api.com/login", values, {
        withCredentials: true,
      });

      // Guardar token de acceso en SecureStore
      await SecureStore.setItemAsync("accessToken", response.data.accessToken);
      await SecureStore.setItemAsync(
        "refreshToken",
        response.data.refreshToken
      );

      Alert.alert("Éxito", "Inicio de sesión exitoso");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert(
        "Error",
        "Credenciales incorrectas o problema en el servidor"
      );
    }
    setLoading(false);
  };

  // Manejar inicio de sesión con Google
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      handleGoogleLogin(authentication.accessToken);
    }
  }, [response]);

  const handleGoogleLogin = async (googleToken) => {
    try {
      const response = await axios.post("https://tu-api.com/google-auth", {
        token: googleToken,
      });

      await SecureStore.setItemAsync("accessToken", response.data.accessToken);
      await SecureStore.setItemAsync(
        "refreshToken",
        response.data.refreshToken
      );

      Alert.alert("Éxito", "Inicio de sesión con Google exitoso");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", "No se pudo autenticar con Google");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
        Iniciar Sesión
      </Text>

      {/* Formulario con Formik para manejar los inputs y validaciones */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              placeholder="Correo electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              style={{ borderWidth: 1, padding: 10, marginTop: 20 }}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={{ color: "red" }}>{errors.email}</Text>
            )}

            <TextInput
              placeholder="Contraseña"
              secureTextEntry
              style={{ borderWidth: 1, padding: 10, marginTop: 10 }}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={{ color: "red" }}>{errors.password}</Text>
            )}

            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                backgroundColor: "blue",
                padding: 10,
                marginTop: 20,
                alignItems: "center",
              }}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={{ color: "white" }}>Ingresar</Text>
              )}
            </TouchableOpacity>

            {/* Botón de Google */}
            <TouchableOpacity
              onPress={() => promptAsync()}
              style={{
                backgroundColor: "red",
                padding: 10,
                marginTop: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>Ingresar con Google</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default Login;
