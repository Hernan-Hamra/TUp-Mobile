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
import * as SecureStore from "expo-secure-store"; // Almacenamiento seguro
import { useRouter } from "expo-router"; // Hook para la navegación

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
  const router = useRouter(); // Usamos useRouter para la navegación en expo-router
  const [loading, setLoading] = useState(false);

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
      router.push("/home"); // Navegamos a la pantalla de home
    } catch (error) {
      Alert.alert(
        "Error",
        "Credenciales incorrectas o problema en el servidor"
      );
    }
    setLoading(false);
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
          </>
        )}
      </Formik>
    </View>
  );
};

export default Login;
