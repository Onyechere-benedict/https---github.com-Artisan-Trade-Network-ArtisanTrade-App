import { createSlice } from "@reduxjs/toolkit";

interface Review {
	_id: string;
	userId: string;
	artisanId: string;
	jobId: string;
	rating: number;
	comment: string;
	createdAt: string; //TODO: Check if this property can use the Date type instead of string, to keep formatting, etc.
}

interface ArtisanReview {
	totalReviews: number;
	currentPage: number;
	totalPages: number;
	reviews: Review[];
}

const initialState: ArtisanReview = {
	totalReviews: 3,
	currentPage: 1,
	totalPages: 1,
	reviews: [
		{
			_id: "1",
			userId: "1",
			artisanId: "1",
			jobId: "1",
			rating: 5,
			comment: "Nice job!",
			createdAt: new Date().toString(),
		},
		{
			_id: "1",
			userId: "1",
			artisanId: "1",
			jobId: "1",
			rating: 3,
			comment: "You wasted my time, hence the 3 stars.",
			createdAt: new Date().toString(),
		},
		{
			_id: "1",
			userId: "1",
			artisanId: "1",
			jobId: "1",
			rating: 1,
			comment: "This was a total waste of money!!",
			createdAt: new Date().toString(),
		},
	],
};

const reviewSlice = createSlice({
	name: "review",
	initialState,
	reducers: {},
});

export const {} = reviewSlice.actions;

export default reviewSlice.reducer;
