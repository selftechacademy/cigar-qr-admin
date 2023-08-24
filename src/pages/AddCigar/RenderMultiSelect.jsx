import React from "react";
import Select from "react-select";

const RenderMultiSelect = ({ label, onValueChangeHandler, options }) => {
  return (
    <>
      <label>{label}</label>
      <Select
        // defaultValue={[colourOptions[1], colourOptions[4]]}
        isMulti
        name={label}
        options={options}
        className=" w-full"
        classNamePrefix="select"
        onChange={(e) => onValueChangeHandler(e, label)}
      />
    </>
  );
};

export default RenderMultiSelect;
