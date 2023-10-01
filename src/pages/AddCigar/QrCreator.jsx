import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  // image:
  //   "https://cdn11.bigcommerce.com/s-c63ufk/images/stencil/1193x795/uploaded_images/rocky-patel-ii-xxvi.jpg?t=1563384727",
  dotsOptions: {
    color: "black",
    type: "rounded",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20,
  },
});

export default function QrCreator({
  brand,
  cigarId,
  cigarName,
  uploadQrImage,
}) {
  // const [url, setUrl] = useState("https://cigarqr.com");
  const url = `www.cigarqr.com?brand=${brand.replace(
    " ",
    "_"
  )}&cigarId=${cigarId}`;
  const [fileExt, setFileExt] = useState("png");
  const ref = useRef(null);

  const onGetRowData = async () => {
    const data = await qrCode.getRawData("png");
    uploadQrImage(data);
  };

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url,
    });
    onGetRowData();
  }, [url]);

  const onUrlChange = (event) => {
    event.preventDefault();
    // setUrl(event.target.value);
  };

  const onExtensionChange = (event) => {
    setFileExt(event.target.value);
  };

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt,
      name: `${brand.replace(" ", "")}-${cigarName.replace(" ", "")}`,
    });
  };

  return (
    <>
      <div className=" flex flex-col gap-4 w-[300px] mb-4 ml-10">
        <select onChange={onExtensionChange} value={fileExt}>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
        </select>
        <p className=" text-lg text-slate-800">Please download your qr code</p>
        <div ref={ref} />
        <button
          onClick={onDownloadClick}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Download
        </button>
      </div>
    </>
  );
}
