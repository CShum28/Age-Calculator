import React from "react";
import { useSelector } from "react-redux";

const Age = () => {
  const calAge = useSelector((state) => state.calculateReducer.value);
  console.log(calAge);
  return (
    <>
      <div className="text-left border-solid border-black mt-5 text-purple-700 font-black italic text-8xl">
        <div className="flex flow-row">
          <p className="">{calAge ? calAge.years : "--"}</p>
          <p className="text-black">years</p>
        </div>
        <div className="flex flow-row">
          <p className="">{calAge ? calAge.months : "--"}</p>
          <p className="text-black">months</p>
        </div>
        <div className="flex flow-row">
          <p className="">{calAge ? calAge.days : "--"}</p>
          <p className="text-black">days</p>
        </div>
      </div>
    </>
  );
};

export default Age;
