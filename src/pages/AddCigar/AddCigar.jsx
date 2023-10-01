import { useState, useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { storage } from "../../firebase-config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { enqueueSnackbar } from "notistack";
import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore/lite";
import RenderSelectOptions from "./RenderSelectOptions";
import QrCreator from "./QrCreator";
import RenderMultiSelect from "./RenderMultiSelect";
import { sizeOptions, fillerOptions, flavorOptions } from "./optionsList";

const defaultFormData = {
  brand: "",
  cigarName: "",
  shapeGroupName: "",
  sizeList: "",
  fillerList: "",
  binder: "",
  wrapper: "",
  strength: "",
  flavorList: [],
  timeToSmoke: "",
  productionYear: "",
  agedYears: 0,
  description: "",
  imageUrls: [],
  videoUrl: "",
};

export default function AddCigar() {
  const [formData, setFormData] = useState(defaultFormData);
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [cigarId, setCigarId] = useState("");
  const [progresspercent, setProgresspercent] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    //to show image on the screen
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  const uploadQrImage = async (image) => {
    const storageRef = ref(
      storage,
      `${formData.brand}/${formData.cigarName}/${formData.cigarName}-qr`
    );
    try {
      const response = await uploadBytesResumable(storageRef, image);
      console.log("response", response);
    } catch (err) {
      console.log("err", err);
    }
  };

  const uploadImageToFirebase = (image) => {
    const storageRef = ref(
      storage,
      `${formData.brand}/${formData.cigarName}/${image.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
        console.log("progress", progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({
            ...formData,
            //imageUrls: [...formData.imageUrls, downloadURL], => if we want to save more
            imageUrls: [downloadURL],
          });
        });
      }
    );
  };

  function onImageChange(e) {
    console.log(e.target.files);
    uploadImageToFirebase(e.target.files[0]);
    //if we want to add more images and show on the screen
    //setImages([...images, ...e.target.files]);
    //Showing only one for now
    setImages([...e.target.files]);
  }

  const onValueChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("form data", formData);
  };

  const onMultiSelectionChangeHandler = (e, name) => {
    setFormData({ ...formData, [name]: e.map((el) => el.value) });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const cigarCollection = collection(db, formData.brand);
      const response = await addDoc(cigarCollection, {
        ...formData,
      });
      setCurrentStep(2);
      console.log("response", response);
      setCigarId(response._key.path.segments[1]);
      console.log(
        "doc Idresponse._key.path.segments[1]",
        response._key.path.segments[1]
      );
    } catch (err) {
      enqueueSnackbar("error while uploading cigar to db", {
        variant: "error",
      });
    }
  };

  return (
    <>
      {currentStep === 1 ? (
        <div className="w-5/6">
          <form onSubmit={onSubmitHandler}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Cigar Profile
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Please fill out all the fields. All fields required except
                  ***video.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <RenderSelectOptions
                    onValueChangeHandler={onValueChangeHandler}
                  />

                  <div className="col-span-full">
                    <RenderMultiSelect
                      onValueChangeHandler={onMultiSelectionChangeHandler}
                      label="fillerList"
                      options={fillerOptions}
                    />
                  </div>
                  <div className="col-span-full">
                    <RenderMultiSelect
                      onValueChangeHandler={onMultiSelectionChangeHandler}
                      label="sizeList"
                      options={sizeOptions}
                    />
                  </div>
                  <div className="col-span-full">
                    <RenderMultiSelect
                      onValueChangeHandler={onMultiSelectionChangeHandler}
                      label="flavorList"
                      options={flavorOptions}
                    />
                  </div>

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
                        minLength={15}
                        required
                        onChange={onValueChangeHandler}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Write a brief description about this cigar
                    </p>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Put video url{" "}
                      <span className=" italic text-slate-500">Optional</span>
                    </label>
                    <div className="mt-2">
                      <input
                        id="description"
                        name="videoUrl"
                        rows={3}
                        // required
                        onChange={onValueChangeHandler}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
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
                              onChange={onImageChange}
                            />
                          </label>
                          {/* <p className="pl-1">or drag and drop</p> */}
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                    <div>
                      {imageURLs.map((imageSrc, index) => (
                        <img
                          key={index}
                          src={imageSrc}
                          alt="not found"
                          width={"100px"}
                        />
                      ))}
                      {
                        <div
                          className=" bg-lime-600 text-white"
                          style={{ width: `${progresspercent}%` }}
                        >
                          {progresspercent}% uploaded
                        </div>
                      }
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
                Next
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <QrCreator
            brand={formData.brand}
            cigarId={cigarId}
            cigarName={formData.cigarName}
            uploadQrImage={uploadQrImage}
          />
        </div>
      )}
    </>
  );
}
