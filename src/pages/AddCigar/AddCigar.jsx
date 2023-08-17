import { useState, useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { array } from "prop-types";

const defaultFormData = {
  brand: "",
  cigarName: "",
  shapeGroupName: "",
  shapeName: "",
  sizeName: "",
  length: 0,
  thickness: 0,
  color: "",
  strength: "",
  flavors: [],
  timeToSmoke: "",
  productionYear: "",
  description: "",
  imageUrls: [],
};

const brandNames = ["", "Rocky Patel"];
const cigarNames = ["", "Rocky Patel Sixty"];
const shapeGroupNames = ["", "Torpedo"];
const shapeNames = ["", "Short Torpedo"];
const sizeNames = ["", "Corona"];
const lengthOptions = ["", "4.6", "7"];
const thicknessOptions = ["", "60", "70"];
const colorOptions = ["", "maduro"];
const strengthOptions = ["", "medium", "medium-full", "mild to medium"];
const flavorOptions = ["wood", "ground"];
const timeToSmokeOptions = [
  15, 20, 25, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180,
];
const productionYearOptions = [1990, 2000, 2020, 2021, 2022, 2023];
const imageUrls = [];

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

export default function AddCigar() {
  const [formData, setFormData] = useState(defaultFormData);
  const [images, setImages] = useState([]);
  const [imageURLS, setImageURLs] = useState([]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  function onImageChange(e) {
    console.log(e.target.files);
    setImages([...e.target.files]);
  }

  const onValueChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const onFileUploadChange = (e) => {
    console.log(e);
  };

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

  return (
    <div className="w-5/6">
      <form onSubmit={onSubmitHandler}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {renderSelectOtions}

              {/* TILL HERE */}

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a brief description about this cigar
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="imageUrls"
                          type="file"
                          // className="sr-only"
                          multiple="multiple"
                          onChange={onImageChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  {imageURLS.map((imageSrc, index) => (
                    <img
                      key={index}
                      src={imageSrc}
                      alt="not found"
                      width={"250px"}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
