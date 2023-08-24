import React from "react";

const brandNames = ["", "Rocky Patel"];
const cigarNames = ["", "Rocky Patel Sixty", "White Label"];
const shapeGroupNames = [
  "",
  "Parejo (rounded)",
  "Box Pressed",
  "Culebra",
  "Torpedo",
  "Belicoso",
  "Piramide",
  "Perfecto",
  "Chisel",
];
// const shapeNames = ["", "Short Torpedo"];
// const sizeNames = ["", "Corona"];
// const lengthOptions = ["", "4.6", "7"];
// const thicknessOptions = ["", "60", "70"];
// const colorOptions = ["", "maduro"];
const wrapperOptions = ["", "connecticut"];
const binderOptions = ["", "Nicaraguan"];
const strengthOptions = ["", "medium", "medium-full", "mild to medium"];
// const flavorOptions = ["", "wood", "ground"];
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
const productionYearOptions = [
  "",
  ...getYears(1995, Number(new Date().getFullYear())),
];
const agedYearsOptions = ["", ...getYears(1, 15)];

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
  // { inputName: "shapeName", options: shapeNames },
  // { inputName: "sizeName", options: sizeNames },
  // { inputName: "length", options: lengthOptions },
  // { inputName: "thickness", options: thicknessOptions },
  { inputName: "wrapper", options: wrapperOptions },
  { inputName: "strength", options: strengthOptions },
  // { inputName: "flavors", options: flavorOptions },
  { inputName: "timeToSmoke", options: timeToSmokeOptions },
  { inputName: "productionYear", options: productionYearOptions },
  { inputName: "agedYears", options: agedYearsOptions },
];

function getYears(startYear, endYear) {
  const years = [];
  for (let i = startYear; i <= endYear; i++) {
    years.push(i);
  }
  return years;
}

const RenderSelectOptions = ({ onValueChangeHandler }) => {
  const renderOptions = (arrayInput = []) => {
    return arrayInput.map((el, index) => (
      <option value={el} key={index}>
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
