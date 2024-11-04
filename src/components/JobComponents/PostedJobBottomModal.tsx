import ButtonGroup from "@components/ButtonGroup";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { View, TouchableOpacity, TextInput, StyleSheet, Dimensions, Platform } from "react-native";
import { BidStatus } from "app/(home)/Bids";
import { JobStatus } from "app/(home)/Jobs";
import { Text } from "@components/Text";
import colors from "@helpers/colors";
import { compactStyles } from "@helpers/styles";
import useKeyboardHeight from "@helpers/useKeyboardHeight";
import useAppSelector from "@hooks/useAppSelector";
import { selectCurrentUser } from "@store/authSlice";
import { Job, markJobCompleted } from "@store/jobsSlice";
import useAppDispatch from "@hooks/useAppDispatch";

const { width, height } = Dimensions.get("window");

const Posted = () => (
	<View style={styles.applicantContainer}>
		<Text style={styles.headerText}>10 Applicants</Text>
		<Text style={styles.subText}>Click to view all applicants.</Text>
		<ButtonGroup positiveOption="View All Applicants" href={"/PostedJobApplicants"} />
	</View>
);

const Active = ({ jobId, jobStage }: { jobId: string; jobStage: JobStatus }) => {
	const [jobStatus, setJobStatus] = useState<JobStatus>(jobStage);
	const dispatch = useAppDispatch();
	console.log('Job Id in active component is ": ' + jobId);

	const handleJobCompleted = () => {
		dispatch(markJobCompleted(jobId));
	};

	useEffect(() => {
		console.log(jobStatus + " Job Status in Active");
	}, [jobStatus]);

	return jobStatus === "Completed" ? (
		<Completed />
	) : (
		<View style={styles.applicantContainer}>
			<ButtonGroup positiveOption="Open Chat" href={"/Chat"} containerStyle={{ marginBottom: 10 }} />
			<ButtonGroup
				positiveOption="Job Completed"
				positiveOptionBg={colors.greenShade}
				negativeHref={"/CancelJob"}
				negativeOptionStyle={{ borderColor: "#94A3B1" }} // is this line needed?
				negativeOption="Cancel Job"
				reverse
				onPress={handleJobCompleted}
			/>
		</View>
	);
};

const Completed = () => (
	<View style={styles.applicantContainer}>
		<ButtonGroup positiveOption="Open Chat" href={"/Chat"} />
	</View>
);

const SPPending = () => (
	<View style={[styles.applicantContainer, styles.spApplicantContainer, styles.spPendingStageContainer]}>
		<Link style={[styles.button, styles.spPendingButton, styles.rejectButton]} asChild href={"/BidSubmitted"}>
			<TouchableOpacity>
				<Text style={[styles.buttonText, styles.spPendingButtonText]}>Reject</Text>
			</TouchableOpacity>
		</Link>
		<Link style={[styles.button, styles.spPendingButton, styles.approveButton]} asChild href={"/BidSubmitted"}>
			<TouchableOpacity>
				<Text style={[styles.buttonText, styles.spPendingButtonText]}>Approve</Text>
			</TouchableOpacity>
		</Link>
	</View>
);

const SPInitial = () => {
	const [inputFocused, setInputFocused] = useState(false);
	const keyboardHeight = useKeyboardHeight();
	return (
		<View style={[styles.applicantContainer, styles.spApplicantContainer, , Platform.OS === "ios" && { paddingBottom: keyboardHeight + 30 }]}>
			<Text style={[styles.subText, styles.spSubText]}>Amount</Text>
			<TextInput
				style={[styles.bidInput, inputFocused ? styles.bidInputFocused : {}]}
				placeholder="Input your bid"
				placeholderTextColor={"#8F8F8F"}
				onFocus={() => setInputFocused(true)}
				onBlur={() => setInputFocused(false)}
				keyboardType="numeric"
			/>
			<Link style={styles.button} asChild href={"/BidSubmitted"}>
				<TouchableOpacity>
					<Text style={styles.buttonText}>Bid</Text>
				</TouchableOpacity>
			</Link>
		</View>
	);
};

const SPActive = () => (
	<View style={[styles.applicantContainer, styles.spApplicantContainer, { paddingTop: 20 }]}>
		<ButtonGroup href={""} positiveOption="Open Chat" negativeOption="Cancel Job" vertical />
	</View>
);

const SPCompleted = () => {};

const BottomModal = ({ jobStage, bidStage, jobId }: { jobStage?: JobStatus; bidStage?: BidStatus; jobId: string }) => {
	const { type: userType } = useAppSelector(selectCurrentUser);

	console.log("Job Id in BOttom modal is: " + jobId);
	console.log("Job Stage in BotomModal is: " + jobStage);

	useEffect(() => {
		console.log("Job Stage Updated");
	}, [jobStage]);

	if (userType == "NORMAL") {
		switch (jobStage) {
			case "Posted":
				return <Posted />;
			case "Active":
				return <Active jobId={jobId} jobStage={jobStage} />;
			case "Completed":
				return <Completed />;
		}
	}

	if (userType === "ARTISAN") {
		switch (bidStage) {
			case "Initial":
				return <SPInitial />;
			case "Bid":
				return <></>;
			case "Pending":
				return <SPPending />;
			case "Active":
				return <SPActive />;
			case "Completed":
				return <></>;
			default:
				return <></>;
		}
	}
};

const generalStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		paddingTop: 40,
	},

	spContainer: {
		paddingTop: 0,
	},

	contentContainer: {
		// flex: 1,
	},

	summaryTitleContainer: {
		flexDirection: "row",
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: colors.greyBorder,
		justifyContent: "space-between",
		alignItems: "flex-start",
		paddingTop: 20,
		paddingHorizontal: 20,
	},

	lastSummaryTitleContainer: {
		borderBottomWidth: 0,
	},

	summaryTitleSubContainer: {
		width: width * 0.8,
	},

	summaryTitle: {
		fontSize: 18,
		fontWeight: "600",
	},

	summarySubTitle: {
		fontSize: 13,
		color: colors.greySecondaryShade,
	},

	editText: {
		textDecorationLine: "underline",
	},

	uploadedMediaContainer: {
		// width: "100%",
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

	ratingContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},

	applicantContainer: {
		padding: 20,
		borderColor: colors.listItemBorderColor,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		alignItems: "center",
		width: width,
	},

	spApplicantContainer: {
		alignItems: "flex-start",
		paddingTop: 30,
	},

	spPendingStageContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	headerText: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},

	subText: {
		fontSize: 14,
		color: "#888",
		marginBottom: 20,
		textAlign: "center",
	},

	spSubText: {
		marginBottom: 10,
		color: colors.brownShade,
	},

	bidInput: {
		borderWidth: 1,
		width: "100%",
		padding: 15,
		paddingLeft: 30,
		borderColor: colors.inputBorderColor,
		borderRadius: 15,
		backgroundColor: "#FBFCFD",
		marginBottom: 40,
	},

	bidInputFocused: {
		backgroundColor: colors.white,
		// color: "#000",
	},

	button: {
		backgroundColor: "#3498db",
		padding: 15,
		borderRadius: 10,
		width: width * 0.9,
		marginBottom: 20,
	},

	spPendingButton: {
		alignItems: "center",
		justifyContent: "center",
		width: "45%",
		marginTop: "4%",
	},

	rejectButton: {
		backgroundColor: "#EA4435",
	},

	approveButton: {
		backgroundColor: "#33A852",
	},

	buttonText: {
		color: colors.white,
		fontSize: 16,
		textAlign: "center",
	},

	spPendingButtonText: {
		fontSize: undefined,
	},
});

const androidStyles = StyleSheet.create({
	applicantContainer: {
		// backgroundColor: colors.white,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		//TODO: Check if removing the shadow related properties from the android styles make any difference
	},
});

const iosStyles = StyleSheet.create({
	applicantContainer: {
		backgroundColor: colors.white,
		//TODO: Check if commenting the backgroundColor changes anything on the ios
		borderWidth: 1,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
});

const styles = compactStyles(generalStyles, androidStyles, iosStyles);

export default BottomModal;
