import { createSlice } from "@reduxjs/toolkit";
const { differenceInCalendarDays } = require("date-fns");

const initialState = {
  value: "",
};

export const calculateSlice = createSlice({
  name: "calculate",
  initialState,
  reducers: {
    calculate: (state, action) => {
      const today = new Date();
      const birthday = action.payload;
      const daysBetween = differenceInCalendarDays(today, birthday);

      // Calculate years
      const years = Math.floor(daysBetween / 365);

      // Calculate months and remaining days, considering leap years
      const remainingDays = daysBetween % 365;
      const months = Math.floor(remainingDays / 30);
      const days = remainingDays % 30;

      console.log(
        `The difference is approximately: ${years} years, ${months} months, and ${days} days.`
      );

      // setting value as an object with years, months, and days of age
      state.value = {
        years,
        months,
        days,
      };
    },
  },
});

export const { calculate } = calculateSlice.actions;

export default calculateSlice.reducer;
