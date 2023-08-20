import React from "react";

const brandNames = ["", "Rocky Patel"];
const cigarNames = ["", "Rocky Patel Sixty"];
const shapeGroupNames = ["", "Torpedo"];
const shapeNames = ["", "Short Torpedo"];
const sizeNames = ["", "Corona"];
const lengthOptions = ["", "4.6", "7"];
const thicknessOptions = ["", "60", "70"];
const colorOptions = ["", "maduro"];
const strengthOptions = ["", "medium", "medium-full", "mild to medium"];
const flavorOptions = ["", "wood", "ground"];
const timeToSmokeOptions = [
  "",
  15,
  20,
  25,
  30,
  45,
  60,
  75,
  90,
  105,
  120,
  135,
  150,
  165,
  180,
];
const productionYearOptions = ["", 1990, 2000, 2020, 2021, 2022, 2023];

const selectOptions = [
  {
    inputName: "brand",
    options: brandNames,
  },
  { inputName: "cigarName", options: cigarNames },
  {
    inputName: "shapeGroupName",
    options: shapeGroupNames,
  },
  { inputName: "shapeName", options: shapeNames },
  { inputName: "sizeName", options: sizeNames },
  { inputName: "length", options: lengthOptions },
  { inputName: "thickness", options: thicknessOptions },
  { inputName: "color", options: colorOptions },
  { inputName: "strength", options: strengthOptions },
  { inputName: "flavors", options: flavorOptions },
  { inputName: "timeToSmoke", options: timeToSmokeOptions },
  { inputName: "productionYear", options: productionYearOptions },
];

const RenderSelectOptions = ({ onValueChangeHandler }) => {
  const renderOptions = (arrayInput = []) => {
    return arrayInput.map((el) => (
      <option value={el} key={el}>
        {el}
      </option>
    ));
  };

  const renderSelectOtions = selectOptions.map((el, index) => {
    return (
      <div className="sm:col-span-6" key={index}>
        <label
          htmlFor={el.inputName}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {el.inputName}
        </label>
        <div className="mt-2">
          <select
            id={el.inputName}
            name={el.inputName}
            autoComplete={`${el.inputName}-name`}
            required
            onChange={onValueChangeHandler}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            {renderOptions(el.options)}
          </select>
        </div>
      </div>
    );
  });
  return <>{renderSelectOtions}</>;
};

export default RenderSelectOptions;
