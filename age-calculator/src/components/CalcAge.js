import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { calculate } from "../features/calculate/calculateSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function CalcAge() {
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  // date submission error handling
  const [validModal, setValidModal] = useState({
    dateValidModal: false,
    dayChecker: false,
    monthChecker: false,
    pastChecker: false,
    dayEmptyChecker: false,
    monthEmptyChecker: false,
    yearEmptyChecker: false,
  });

  const {
    dateValidModal,
    dayChecker,
    monthChecker,
    pastChecker,
    dayEmptyChecker,
    monthEmptyChecker,
    yearEmptyChecker,
  } = validModal;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    const date = new Date(`${year}-${month}-${day}`);
    const updatedState = { ...validModal }; // Create a copy of the current state

    // Day input checker
    if (day === undefined) {
      // check make sure day exists
      updatedState.dayEmptyChecker = true;
    } else if (Number(day) >= 32) {
      // check to make sure day is valid
      updatedState.dayEmptyChecker = false;
      updatedState.dayChecker = true;
    } else {
      updatedState.dayChecker = false;
      updatedState.dayEmptyChecker = false;
    }

    // Month input checker
    if (month === undefined) {
      // check to make sure month exists
      updatedState.monthEmptyChecker = true;
    } else if (Number(month) >= 13) {
      // check to make sure month is valid
      updatedState.monthEmptyChecker = false;
      updatedState.monthChecker = true;
    } else {
      updatedState.monthChecker = false;
      updatedState.monthEmptyChecker = false;
    }

    // Year input checker
    if (year === undefined) {
      // check to make sure year exists
      updatedState.yearEmptyChecker = true;
    } else if (date > new Date() || year > new Date().getFullYear()) {
      // check to make sure year is valid
      updatedState.yearEmptyChecker = false;
      updatedState.pastChecker = true;
    } else {
      updatedState.pastChecker = false;
      updatedState.yearEmptyChecker = false;
    }

    // checks if the date is valid or not
    const isValidDate = (year, month, day) => {
      month = month - 1;
      const d = new Date(year, month, day);
      if (
        d.getFullYear() === year &&
        d.getMonth() === month &&
        d.getDate() === day
      ) {
        return true;
      }
      return false;
    };

    if (isValidDate(year, month, day)) {
      // if date is not valid - turn dateValidModal true and show error message
      updatedState.dateValidModal = true;
      // else continue
    } else {
      updatedState.dateValidModal = false;
    }

    setValidModal(updatedState); // Update the state with all the changes at once

    // this is a valid check to make sure the input passes all checks
    const isAllValid = Object.values(updatedState).every(
      (value) => value === false
    );

    // if everything is false, calculate the age
    if (isAllValid) {
      console.log("CalcAge: ", date);
      dispatch(calculate(date));
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="flex flex-row">
        <div className="mr-7">
          <p className="text-left uppercase tracking-widest">Day</p>
          <input
            className="border border-black rounded-lg hover:cursor-pointer hover:border-blue-600 px-3 py-3 text-2xl w-40 font-bold"
            type="number"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
          {dayChecker ? <div>Must be a valid day</div> : null}
          {dayEmptyChecker ? <div>This field is required</div> : null}
        </div>
        <div className="mr-7">
          <p className="text-left uppercase tracking-widest">Month</p>
          <input
            className="border border-black rounded-lg hover:cursor-pointer hover:border-blue-600 px-3 py-3 text-2xl w-40 font-bold"
            type="number"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          {monthChecker ? <div>Must be a valid month</div> : null}
          {monthEmptyChecker ? <div>This field is required</div> : null}
        </div>
        <div>
          <p className="text-left uppercase tracking-widest">Year</p>
          <input
            className="border border-black rounded-lg hover:cursor-pointer hover:border-blue-600 px-3 py-3 text-2xl w-40 font-bold"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          {pastChecker ? <div>Must be in the past</div> : null}
          {yearEmptyChecker ? <div>This field is required</div> : null}
        </div>
        <button className="border-2">
          <FontAwesomeIcon icon={faAngleDown} />
        </button>
      </form>
      {dateValidModal ? <div>Must be a valid date</div> : null}
    </div>
  );
}

export default CalcAge;
