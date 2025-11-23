import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { register } from '../api/authService';
import * as Icons from 'react-native-feather';

// Validation schema using Yup
const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const RegisterScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleRegister = async (values, { setSubmitting }) => {
    const result = await register(values.username, values.email, values.password);

    if (result.success) {
      Alert.alert(
        'Success',
        result.message,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } else {
      Alert.alert('Error', result.error);
    }
    setSubmitting(false);
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
        <View className="flex-1 justify-center px-6 py-8">
          {/* Header */}
          <View className="items-center mb-8">
            <View className={`w-20 h-20 rounded-full items-center justify-center mb-4 ${
              isDarkMode ? 'bg-blue-900' : 'bg-blue-500'
            }`}>
              <Icons.UserPlus stroke="white" width={40} height={40} />
            </View>
            <Text className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Create Account
            </Text>
            <Text className={`text-base mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Sign up to get started
            </Text>
          </View>

          {/* Form */}
          <Formik
            initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={RegisterSchema}
            onSubmit={handleRegister}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
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
                      placeholder="Choose a username"
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

                {/* Email Input */}
                <View className="mb-4">
                  <Text className={`mb-2 text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email
                  </Text>
                  <View className={`flex-row items-center border rounded-lg px-4 ${
                    isDarkMode 
                      ? 'border-gray-700 bg-gray-800' 
                      : 'border-gray-300 bg-gray-50'
                  }`}>
                    <Icons.Mail 
                      stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                      width={20} 
                      height={20} 
                    />
                    <TextInput
                      className={`flex-1 py-3 px-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                      placeholder="Enter your email"
                      placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text className="text-red-500 text-xs mt-1">{errors.email}</Text>
                  )}
                </View>

                {/* Password Input */}
                <View className="mb-4">
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
                      placeholder="Create a password"
                      placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry
                    />
                  </View>
                  {touched.password && errors.password && (
                    <Text className="text-red-500 text-xs mt-1">{errors.password}</Text>
                  )}
                </View>

                {/* Confirm Password Input */}
                <View className="mb-6">
                  <Text className={`mb-2 text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Confirm Password
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
                      placeholder="Confirm your password"
                      placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                      secureTextEntry
                    />
                  </View>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text className="text-red-500 text-xs mt-1">{errors.confirmPassword}</Text>
                  )}
                </View>

                {/* Register Button */}
                <TouchableOpacity
                  className={`py-4 rounded-lg items-center ${
                    isSubmitting 
                      ? 'bg-blue-300' 
                      : isDarkMode 
                      ? 'bg-blue-600' 
                      : 'bg-blue-500'
                  }`}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  <Text className="text-white font-semibold text-base">Create Account</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>

          {/* Login Link */}
          <View className="flex-row justify-center mt-6">
            <Text className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-blue-500 font-semibold">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
