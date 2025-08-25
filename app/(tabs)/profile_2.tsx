import React, { useState } from "react";
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import * as ImagePicker from 'expo-image-picker';

type UserFormData = {
  clerkId: string;
  role: "user" | "trainer";
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
  dateOfBirth: number;
  gender: "male" | "female";
  height: number;
  weight: number;
  goal: "lose_fat" | "maintain" | "gain_muscle";
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
  caloriesGoal: number;
  waterGoal: number;
};

const Profile_2 = ({
  initialData,
  onSubmit,
}: {
  initialData?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => void;
}) => {
  const [formData, setFormData] = useState<Partial<UserFormData>>(
    initialData || {
      role: "user",
      gender: "male",
      goal: "maintain",
    }
  );
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (field: keyof UserFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNumberChange = (field: keyof UserFormData, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      handleChange(field, numValue);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
    handleChange("dateOfBirth", currentDate.getTime());
  };

  const pickImage = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    //   base64: true,
    // });
    // if (!result.canceled && result.assets[0].base64) {
    //   handleChange('image', `data:image/jpeg;base64,${result.assets[0].base64}`);
    // }
  };

  const handleSubmit = () => {
    if (
      formData.username &&
      formData.email &&
      formData.firstName &&
      formData.lastName &&
      formData.dateOfBirth &&
      formData.gender &&
      formData.height &&
      formData.weight &&
      formData.goal &&
      formData.proteinGoal &&
      formData.carbsGoal &&
      formData.fatGoal &&
      formData.caloriesGoal &&
      formData.waterGoal
    ) {
      onSubmit(formData as UserFormData);
    } else {
      alert("Please fill all required fields");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Basic Information */}
      <Text style={styles.sectionHeader}>Basic Information</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Role</Text>
        {/* <Picker
          selectedValue={formData.role}
          onValueChange={(value: any) => handleChange('role', value)}
          style={styles.picker}
        >
          <Picker.Item label="User" value="user" />
          <Picker.Item label="Trainer" value="trainer" />
        </Picker> */}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Username*</Text>
        <TextInput
          style={styles.input}
          value={formData.username}
          onChangeText={(text) => handleChange("username", text)}
          placeholder="Enter username"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email*</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>First Name*</Text>
        <TextInput
          style={styles.input}
          value={formData.firstName}
          onChangeText={(text) => handleChange("firstName", text)}
          placeholder="Enter first name"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Last Name*</Text>
        <TextInput
          style={styles.input}
          value={formData.lastName}
          onChangeText={(text) => handleChange("lastName", text)}
          placeholder="Enter last name"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Profile Image</Text>
        <Button title="Select Image" onPress={pickImage} />
        {formData.image && (
          <Text style={styles.imageSelectedText}>Image selected</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date of Birth*</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateDisplay}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {/* {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )} */}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gender*</Text>
        {/* <Picker
          selectedValue={formData.gender}
          onValueChange={(value) => handleChange('gender', value)}
          style={styles.picker}
        >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker> */}
      </View>

      {/* Body Metrics */}
      <Text style={styles.sectionHeader}>Body Metrics</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Height (cm)*</Text>
        <TextInput
          style={styles.input}
          value={formData.height?.toString()}
          onChangeText={(text) => handleNumberChange("height", text)}
          placeholder="Enter height in cm"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Weight (kg)*</Text>
        <TextInput
          style={styles.input}
          value={formData.weight?.toString()}
          onChangeText={(text) => handleNumberChange("weight", text)}
          placeholder="Enter weight in kg"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Fitness Goal*</Text>
        {/* <Picker
          selectedValue={formData.goal}
          onValueChange={(value) => handleChange('goal', value)}
          style={styles.picker}
        >
          <Picker.Item label="Lose Fat" value="lose_fat" />
          <Picker.Item label="Maintain" value="maintain" />
          <Picker.Item label="Gain Muscle" value="gain_muscle" />
        </Picker> */}
      </View>

      {/* Nutrition Goals */}
      <Text style={styles.sectionHeader}>Daily Nutrition Goals</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Protein (g)*</Text>
        <TextInput
          style={styles.input}
          value={formData.proteinGoal?.toString()}
          onChangeText={(text) => handleNumberChange("proteinGoal", text)}
          placeholder="Enter protein goal in grams"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Carbs (g)*</Text>
        <TextInput
          style={styles.input}
          value={formData.carbsGoal?.toString()}
          onChangeText={(text) => handleNumberChange("carbsGoal", text)}
          placeholder="Enter carbs goal in grams"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Fat (g)*</Text>
        <TextInput
          style={styles.input}
          value={formData.fatGoal?.toString()}
          onChangeText={(text) => handleNumberChange("fatGoal", text)}
          placeholder="Enter fat goal in grams"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Calories (kcal)*</Text>
        <TextInput
          style={styles.input}
          value={formData.caloriesGoal?.toString()}
          onChangeText={(text) => handleNumberChange("caloriesGoal", text)}
          placeholder="Enter calorie goal"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Water (ml)*</Text>
        <TextInput
          style={styles.input}
          value={formData.waterGoal?.toString()}
          onChangeText={(text) => handleNumberChange("waterGoal", text)}
          placeholder="Enter water goal in ml"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.submitButton}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#333",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  dateDisplay: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    textAlignVertical: "center",
    backgroundColor: "#fff",
  },
  imageSelectedText: {
    marginTop: 8,
    color: "green",
    fontStyle: "italic",
  },
  submitButton: {
    marginTop: 24,
    marginBottom: 32,
  },
});

export default Profile_2;
