import { Image } from "expo-image";
import React, { useState } from "react";
import { compactStyles } from "@helpers/styles";
import colors from "@helpers/colors";
import * as ImagePicker from "expo-image-picker";
import { Text } from "@components/Text";
import Ionicons from "@expo/vector-icons/Ionicons";
import RadioGroup from "@components/RadioGroup";
import PageHeader from "@components/PageHeader";
import ButtonGroup from "@components/ButtonGroup";
import UploadImages from "@assets/images/uploadImages.svg";
import ButtonOptions from "@components/ButtonOptions";
import { View, StyleSheet, TextInput, Dimensions, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { addNewJob, Job } from "@store/jobsSlice";
import { JobStatus } from "app/(home)/Jobs";
import useAppDispatch from "@hooks/useAppDispatch";

const { width, height } = Dimensions.get("window");

const NewJob = () => {
    const styles = compactStyles(generalStyles, androidStyles, iosStyles);
    const [jobTitle, setJobTitle] = useState<string>("");
    const [jobDescription, setJobDescription] = useState<string>("");
    const [jobType, setJobType] = useState<string>("Installation");
    const [selectedImages, setSelectedImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
    const [selectedBudget, setSelectedBudet] = useState<string>("5000");
    const [jobAddress, setJobAddress] = useState<string>("");
    const [jobService, setJobService] = useState<string>("");
    const [jobStatus, setJobStatus] = useState<JobStatus>();

    const encodedImages = encodeURIComponent(JSON.stringify(selectedImages));

    const uploadMedia = async () => {
        let options: ImagePicker.ImagePickerOptions = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true,
            allowsMultipleSelection: true,
            selectionLimit: 3,
            aspect: [1, 1],
            quality: 1,
        };

        let result = await ImagePicker.launchImageLibraryAsync(options);

        if (!result.canceled) {
            setSelectedImages(result.assets);
        }
    };

    const budgetOptions = [
        {
            buttonTitle: 5000,
            secondButtonTitle: 20000,
        },
        {
            buttonTitle: 20000,
            secondButtonTitle: 50000,
        },
        {
            buttonTitle: 50000,
            secondButtonTitle: 200000,
        },
        {
            buttonTitle: 200000,
            secondButtonTitle: "More",
        },
    ];

    const handleForm = () => {
        if (!jobTitle || !jobDescription || !selectedBudget) {
            alert("Fill all required fields before proceeding");
        }

        // dispatch(addNewJob(newJob));
    };

    const newJob: Partial<Job> = {
        _id: "13",
        title: jobTitle,
        type: jobType,
        description: jobDescription,
        budget: selectedBudget,
        service: jobService,
        media: selectedImages,
        userId: "4",
        status: "Posted",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const jobParam = encodeURIComponent(JSON.stringify(newJob));

    return (
        <View style={styles.container}>
            <PageHeader pageName="New Job" />
            <SafeAreaView style={styles.newJobContent}>
                <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                    <View style={styles.jobFormContainer}>
                        <Text>Job Title</Text>
                        <TextInput
                            style={styles.jobFormInput}
                            value={jobTitle}
                            onChangeText={setJobTitle}
                            placeholder="Enter Job Title"
                        />
                    </View>
                    <View style={styles.jobFormContainer}>
                        <Text>Job Type</Text>
                        <RadioGroup
                            options={[
                                { label: "Installation", value: "Installation" },
                                { label: "Maintenance", value: "Maintenance" },
                            ]}
                            selectedOption={jobType}
                            onChanged={setJobType}
                        />
                    </View>
                    <View style={styles.jobFormContainer}>
                        <Text>Job Description</Text>
                        <TextInput
                            style={[styles.jobFormInput, { textAlignVertical: "top", height: 150 }]}
                            multiline
                            numberOfLines={10}
                            value={jobDescription}
                            onChangeText={setJobDescription}
                        />
                    </View>
                    <View style={styles.jobFormContainer}>
                        <Text>Upload Media</Text>
                        <TouchableOpacity style={styles.uploadButton} onPress={() => uploadMedia()}>
                            <Ionicons name="cloud-upload-outline" color={colors.greySecondaryShade} size={20} />
                            <Text>Upload</Text>
                        </TouchableOpacity>
                        <View style={styles.uploadedMediaContainer}>
                            {selectedImages.length > 0 ? (
                                selectedImages.map((selectedImage, index) => {
                                    return (
                                        <Image
                                            source={{ uri: selectedImage.uri }}
                                            key={selectedImage.assetId ?? index}
                                            style={styles.uploadedImage}
                                        />
                                    );
                                })
                            ) : (
                                <>
                                    <TouchableOpacity
                                        style={[
                                            {
                                                backgroundColor: colors.grey2,
                                                justifyContent: "center",
                                            },
                                            styles.uploadedImage,
                                        ]}
                                        onPress={() => uploadMedia()}
                                    >
                                        <UploadImages />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            {
                                                backgroundColor: colors.grey2,
                                                justifyContent: "center",
                                            },
                                            styles.uploadedImage,
                                        ]}
                                        onPress={() => uploadMedia()}
                                    >
                                        <UploadImages />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            {
                                                backgroundColor: colors.grey2,
                                                justifyContent: "center",
                                            },
                                            styles.uploadedImage,
                                        ]}
                                        onPress={() => uploadMedia()}
                                    >
                                        <UploadImages />
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </View>
                    <View style={styles.jobFormContainer}>
                        <Text>Budget</Text>
                        <ButtonOptions
                            buttonOptions={budgetOptions}
                            selectedOption={selectedBudget}
                            onOptionChanged={setSelectedBudet}
                        />
                    </View>
                    <ButtonGroup
                        positiveOption="Proceed"
                        negativeOption="Cancel"
                        href={{
                            pathname: "/JobLocation",
                            params: { jobParam },
                        }}
                        paddingHorizontal={30}
                        reverse
                    />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const generalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        gap: 10,
    },

    newJobContent: {
        paddingHorizontal: 10,
        paddingBottom: 50,
        marginBottom: 50,
    },

    jobFormContainer: {
        width: width,
        paddingHorizontal: 30,
        gap: 5,
        marginTop: 20,
    },

    jobFormInput: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        width: "100%",
        borderColor: colors.inputBorderColor,
    },

    uploadButton: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        borderColor: colors.inputBorderColor,
        borderWidth: 1,
        borderRadius: 10,
        width: "35%",
        padding: "4%",
    },

    uploadedMediaContainer: {
        width: "100%",
        gap: 15,
        marginTop: 20,
        flexDirection: "row",
    },

    uploadedImage: {
        width: "30%",
        padding: "7%",
        alignItems: "center",
        height: 100,
        borderRadius: 10,
    },
});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});

export default NewJob;
