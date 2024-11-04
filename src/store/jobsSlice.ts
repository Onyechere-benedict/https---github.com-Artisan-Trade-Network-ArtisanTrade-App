import { getData } from "@helpers/APIFunction";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store";
import { JobStatus } from "app/(home)/Jobs";
import * as ImagePicker from "expo-image-picker";

type PartialPickerAsset = Partial<ImagePicker.ImagePickerAsset>;

export interface Job {
    _id: string;
    title: string;
    type: string;
    description: string;
    budget: string;
    address: string;
    service: string;
    media: PartialPickerAsset[];
    userId: string;
    status: JobStatus;
    createdAt: string; //TODO: Check if you can type a datestring, instead of using plain strings
    updatedAt: string; //TODO: Check if you can type a datestring, instead of using plain strings
}

// export const fetchJobs = createAsyncThunk<Job[], void>("jobs/FetchJobs", async () => {
// 	const jobs = await getData<Job[]>("/jobs");
// 	return jobs;
// });

// const jobs = getData("/jobs");
// console.log("Jobs:", jobs);

interface JobState {
    jobList: Job[];
    loading: boolean;
    error: string | null;
}

const dummyJob: Job[] = [
    {
        _id: "1",
        title: "Need to repair my toilet",
        type: "Maintenance",
        description: "Lorem dolore quis pariatur porro ullam facilis molestiae quasi.",
        budget: "50,000 - 70,000",
        address: "No 1 Two Street, Three City, Four State",
        service: "Plumbering",
        media: [
            {
                uri: "nothing_yet",
                type: "image",
            },
        ],
        userId: "1",
        status: "Active",
        createdAt: new Date(2024, 9, 14, 4, 7, 31).toString(), //NOTE: The month param uses index, so January is 0, not 1.
        updatedAt: new Date(2024, 9, 14, 4, 7, 31).toString(), //NOTE: The month param uses index, so January is 0, not 1.
    },
    {
        _id: "2",
        title: "Need to repair my toilet again",
        type: "Maintenance",
        description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, aliquam Officia deserunt dicta alias dolore quis pariatur porro ullam facilis molestiae quasi.",
        budget: "50,000 - 70,000",
        address: "No 1 Two Street, Three City, Four State",
        service: "Plumbering",
        media: [
            {
                uri: "nothing_yet",
                type: "image",
            },
        ],
        userId: "1",
        status: "Active",
        createdAt: new Date(2024, 9, 14, 4, 8, 20).toString(), //NOTE: The month param uses index, so January is 0, not 1.
        updatedAt: new Date(2024, 9, 14, 4, 8, 20).toString(), //NOTE: The month param uses index, so January is 0, not 1.
    },
    {
        _id: "3",
        title: "A new job for anyone! My car is acting up!",
        type: "Maintenance",
        description: "My car is refusing to start. Can someone help me please?",
        budget: "100,000",
        address: "No 1 Two Street, Three City, Four State",
        service: "Mechanic",
        media: [
            {
                uri: "nothing_yet",
                type: "image",
            },
        ],
        userId: "2",
        status: "Active",
        createdAt: new Date(2024, 9, 14, 4, 9, 44).toString(), //NOTE: The month param uses index, so January is 0, not 1.
        updatedAt: new Date(2024, 9, 14, 4, 9, 44).toString(), //NOTE: The month param uses index, so January is 0, not 1.
    },
    {
        _id: "4",
        title: "Need to repair my toilet",
        type: "Maintenance",
        description: "Lorem dolore quis pariatur porro ullam facilis molestiae quasi.",
        budget: "50,000 - 70,000",
        address: "No 1 Two Street, Three City, Four State",
        service: "Plumbering",
        media: [
            {
                uri: "nothing_yet",
                type: "image",
            },
        ],
        userId: "1",
        status: "Completed",
        createdAt: new Date(2024, 9, 14, 4, 7, 31).toString(), //NOTE: The month param uses index, so January is 0, not 1.
        updatedAt: new Date(2024, 9, 14, 4, 7, 31).toString(), //NOTE: The month param uses index, so January is 0, not 1.
    },
    {
        _id: "5",
        title: "Need to repair my toilet again",
        type: "Maintenance",
        description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, aliquam Officia deserunt dicta alias dolore quis pariatur porro ullam facilis molestiae quasi.",
        budget: "50,000 - 70,000",
        address: "No 1 Two Street, Three City, Four State",
        service: "Plumbering",
        media: [
            {
                uri: "nothing_yet",
                type: "image",
            },
        ],
        userId: "1",
        status: "Posted",
        createdAt: new Date(2024, 9, 14, 4, 8, 20).toString(), //NOTE: The month param uses index, so January is 0, not 1.
        updatedAt: new Date(2024, 9, 14, 4, 8, 20).toString(), //NOTE: The month param uses index, so January is 0, not 1.
    },
    {
        _id: "6",
        title: "A new job for anyone! My car is acting up!",
        type: "Maintenance",
        description: "My car is refusing to start. Can someone help me please?",
        budget: "100,000",
        address: "No 1 Two Street, Three City, Four State",
        service: "Mechanic",
        media: [
            {
                uri: "nothing_yet",
                type: "image",
            },
        ],
        userId: "2",
        status: "Posted",
        createdAt: new Date(2024, 9, 14, 4, 9, 44).toString(), //NOTE: The month param uses index, so January is 0, not 1.
        updatedAt: new Date(2024, 9, 14, 4, 9, 44).toString(), //NOTE: The month param uses index, so January is 0, not 1.
    },
    {
        _id: "7",
        title: "Need to repair my toilet",
        type: "Maintenance",
        description: "Lorem dolore quis pariatur porro ullam facilis molestiae quasi.",
        budget: "50,000 - 70,000",
        address: "No 1 Two Street, Three City, Four State",
        service: "Plumbering",
        media: [
            {
                uri: "nothing_yet",
                type: "image",
            },
        ],
        userId: "1",
        status: "Posted",
        createdAt: new Date(2024, 9, 14, 4, 7, 31).toString(), //NOTE: The month param uses index, so January is 0, not 1.
        updatedAt: new Date(2024, 9, 14, 4, 7, 31).toString(), //NOTE: The month param uses index, so January is 0, not 1.
    },
    {
        _id: "8",
        title: "Need to repair my toilet again",
        type: "Maintenance",
        description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, aliquam Officia deserunt dicta alias dolore quis pariatur porro ullam facilis molestiae quasi.",
        budget: "50,000 - 70,000",
        address: "No 1 Two Street, Three City, Four State",
        service: "Plumbering",
        media: [
            {
                uri: "nothing_yet",
                type: "image",
            },
        ],
        userId: "1",
        status: "Posted",
        createdAt: new Date(2024, 9, 14, 4, 8, 20).toString(), //NOTE: The month param uses index, so January is 0, not 1.
        updatedAt: new Date(2024, 9, 14, 4, 8, 20).toString(), //NOTE: The month param uses index, so January is 0, not 1.
    },
    {
        _id: "9",
        title: "A new job for anyone! My car is acting up!",
        type: "Maintenance",
        description: "My car is refusing to start. Can someone help me please?",
        budget: "100,000",
        address: "No 1 Two Street, Three City, Four State",
        service: "Mechanic",
        media: [
            {
                uri: "nothing_yet",
                type: "image",
            },
        ],
        userId: "2",
        status: "Posted",
        createdAt: new Date(2024, 9, 14, 4, 9, 44).toString(), //NOTE: The month param uses index, so January is 0, not 1.
        updatedAt: new Date(2024, 9, 14, 4, 9, 44).toString(), //NOTE: The month param uses index, so January is 0, not 1.
    },
    {
        _id: "10",
        title: "Need to repair my toilet",
        type: "Maintenance",
        description: "Lorem dolore quis pariatur porro ullam facilis molestiae quasi.",
        budget: "50,000 - 70,000",
        address: "No 1 Two Street, Three City, Four State",
        service: "Plumbering",
        media: [
            {
                uri: "nothing_yet",
                type: "image",
            },
        ],
        userId: "1",
        status: "Posted",
        createdAt: new Date(2024, 9, 14, 4, 7, 31).toString(), //NOTE: The month param uses index, so January is 0, not 1.
        updatedAt: new Date(2024, 9, 14, 4, 7, 31).toString(), //NOTE: The month param uses index, so January is 0, not 1.
    },
    {
        _id: "11",
        title: "Need to repair my toilet again",
        type: "Maintenance",
        description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, aliquam Officia deserunt dicta alias dolore quis pariatur porro ullam facilis molestiae quasi.",
        budget: "50,000 - 70,000",
        address: "No 1 Two Street, Three City, Four State",
        service: "Plumbering",
        media: [
            {
                uri: "nothing_yet",
                type: "image",
            },
        ],
        userId: "1",
        status: "Posted",
        createdAt: new Date(2024, 9, 14, 4, 8, 20).toString(), //NOTE: The month param uses index, so January is 0, not 1.
        updatedAt: new Date(2024, 9, 14, 4, 8, 20).toString(), //NOTE: The month param uses index, so January is 0, not 1.
    },
    {
        _id: "12",
        title: "A new job for anyone! My car is acting up!",
        type: "Maintenance",
        description: "My car is refusing to start. Can someone help me please?",
        budget: "100,000",
        address: "No 1 Two Street, Three City, Four State",
        service: "Mechanic",
        media: [
            {
                uri: "nothing_yet",
                type: "image",
            },
        ],
        userId: "2",
        status: "Completed",
        createdAt: new Date(2024, 9, 14, 4, 9, 44).toString(), //NOTE: The month param uses index, so January is 0, not 1.
        updatedAt: new Date(2024, 9, 14, 4, 9, 44).toString(), //NOTE: The month param uses index, so January is 0, not 1.
    },
];

const initialState: JobState = {
    jobList: [...dummyJob],
    loading: false,
    error: null,
};

const jobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        addNewJob: (state, action: PayloadAction<Job>) => {
            state.jobList.push(action.payload);
            state.jobList.forEach((job) => console.log("Update Job List : " + JSON.stringify(job)));
        },
        updateJobStatus: (state, action: PayloadAction<{ jobId: string; jobStatus: JobStatus }>) => {
            const job = state.jobList.find((job) => job._id === action.payload.jobId);
            if (job) job.status = action.payload.jobStatus;
        },
        markJobCompleted: (state, action: PayloadAction<string>) => {
            const jobId = action.payload;
            const job = state.jobList.find((job) => job._id === jobId);
            if (job) job.status = "Completed";
            console.info(job.status);
            // state.jobList[0].status = "Completed";
        },
    },
    selectors: {
        selectJobsState: (jobs: JobState) => jobs,
    },
    // extraReducers: (builder) => {
    // 	builder
    // 		.addCase(fetchJobs.pending, (state) => {
    // 			state.loading = true;
    // 			state.error = null;
    // 		})
    // 		.addCase(fetchJobs.fulfilled, (state, action) => {
    // 			state.loading = false;
    // 			state.error = null;
    // 			// state.jobs = action.payload;
    // 		})
    // 		.addCase(fetchJobs.rejected, (state, action) => {
    // 			state.loading = false;
    // 			state.error = action.error.message || "Failed to fetch Jobs";
    // 			console.error("Failed to fetch Jobs");
    // 		});
    // },
    // TODO: When we start connecting to the api, this becomes useful
});

export const { markJobCompleted, addNewJob, updateJobStatus } = jobSlice.actions;

export const { selectJobsState } = jobSlice.selectors;

export const selectJobById = (stateOrJobs: RootState | JobState, jobId: string): Job => {
    if ("jobs" in stateOrJobs) {
        return stateOrJobs.jobs.jobList.find((job) => job._id === jobId);
    } else return stateOrJobs.jobList.find((job) => job._id === jobId);
};

export default jobSlice.reducer;
