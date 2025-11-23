import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as loginAPI } from '../api/authService';
import { loginStart, loginSuccess, loginFailure } from '../redux/authSlice';
import * as Icons from 'react-native-feather';

// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(4, 'Password must be at least 4 characters')
    .required('Password is required'),
});

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values) => {
    dispatch(loginStart());

    const result = await loginAPI(values.username, values.password);

    if (result.success && result.data && result.data.accessToken) {
      // Store token and user data in AsyncStorage
      await AsyncStorage.setItem('authToken', result.data.accessToken);
      await AsyncStorage.setItem('user', JSON.stringify(result.data));

      dispatch(loginSuccess({
        user: result.data,
        token: result.data.accessToken,
      }));

      Alert.alert('Success', 'Login successful!');
    } else {
      const errorMessage = result.error || 'Login failed. Please check your credentials.';
      dispatch(loginFailure(errorMessage));
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView
        className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 justify-center px-6">
          {/* Header */}
          <View className="items-center mb-10">
            <View className={`w-20 h-20 rounded-full items-center justify-center mb-4 ${
              isDarkMode ? 'bg-blue-900' : 'bg-blue-500'
            }`}>
              <Icons.Activity stroke="white" width={40} height={40} />
            </View>
            <Text className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Sports & Lifestyle
            </Text>
            <Text className={`text-base mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Sign in to continue
            </Text>
          </View>

          {/* Form */}
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                {/* Username Input */}
                <View className="mb-4">
                  <Text className={`mb-2 text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Username
                  </Text>
                  <View className={`flex-row items-center border rounded-lg px-4 ${
                    isDarkMode 
                      ? 'border-gray-700 bg-gray-800' 
                      : 'border-gray-300 bg-gray-50'
                  }`}>
                    <Icons.User 
                      stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                      width={20} 
                      height={20} 
                    />
                    <TextInput
                      className={`flex-1 py-3 px-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                      placeholder="Enter username"
                      placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={values.username}
                      autoCapitalize="none"
                    />
                  </View>
                  {touched.username && errors.username && (
                    <Text className="text-red-500 text-xs mt-1">{errors.username}</Text>
                  )}
                </View>

                {/* Password Input */}
                <View className="mb-6">
                  <Text className={`mb-2 text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Password
                  </Text>
                  <View className={`flex-row items-center border rounded-lg px-4 ${
                    isDarkMode 
                      ? 'border-gray-700 bg-gray-800' 
                      : 'border-gray-300 bg-gray-50'
                  }`}>
                    <Icons.Lock 
                      stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                      width={20} 
                      height={20} 
                    />
                    <TextInput
                      className={`flex-1 py-3 px-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                      placeholder="Enter password"
                      placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity 
                      onPress={() => setShowPassword(!showPassword)}
                      className="ml-2"
                    >
                      {showPassword ? (
                        <Icons.EyeOff 
                          stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                          width={20} 
                          height={20} 
                        />
                      ) : (
                        <Icons.Eye 
                          stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                          width={20} 
                          height={20} 
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text className="text-red-500 text-xs mt-1">{errors.password}</Text>
                  )}
                </View>

                {/* Login Button */}
                <TouchableOpacity
                  className={`py-4 rounded-lg items-center ${
                    loading 
                      ? 'bg-blue-300' 
                      : isDarkMode 
                      ? 'bg-blue-600' 
                      : 'bg-blue-500'
                  }`}
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-white font-semibold text-base">Login</Text>
                  )}
                </TouchableOpacity>

                {/* Demo Credentials */}
                <View className={`mt-6 p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-blue-50'
                }`}>
                  <Text className={`text-xs font-semibold mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Demo Credentials:
                  </Text>
                  <Text className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Username: emilys
                  </Text>
                  <Text className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Password: emilyspass
                  </Text>
                </View>
              </View>
            )}
          </Formik>

          {/* Register Link */}
          <View className="flex-row justify-center mt-8">
            <Text className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text className="text-blue-500 font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
