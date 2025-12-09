import axios from "axios";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";

const AddContest = () => {
  const [deadline, setDeadline] = useState(null);
  const axiosSecure=useAxiosSecure()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const contestData = (data) => {
    // Photo related functionality
    const imageUrl = data.photo[0];
    const formData = new FormData();
    formData.append("image", imageUrl);
    // send the photo to store and get the url
    const imageUrlKey = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_Image_host
    }`;

    axios.post(imageUrlKey, formData).then((res) => {
      //   console.log(res.data.data.url)
      data.photoURL = res.data.data.url;
      data.status = "pending";
      data.deadline = deadline;
      axiosSecure.post('/contest',data)
      .then(res=>{
        console.log(res.data);
        
      })
    });

    // console.log(data);
  };

  return (
    <div>
      <div className="bg-amber-100  flex flex-col items-center justify-center md:py-11">
        <form
          onSubmit={handleSubmit(contestData)}
          className="w-[500px] mx-auto bg-white shadow-2xl p-4  rounded-md pt-5"
        >
          <h1 className="text-4xl font-bold mb-5">Give Contest Information</h1>
          <fieldset className="fieldset space-y-4">
            {/* Name */}
            <div>
              <label className="label font-semibold text-md text-black ">
                Name
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                className="input w-full"
                placeholder="Enter Contest Name"
              />
              {errors.name && (
                <p className="text-red-500">You have not provided Name</p>
              )}
            </div>

            {/* Photo */}
            <div>
              <label className="label font-semibold text-md text-black ">
                Upload Photo
              </label>
              <input
                {...register("photo", { required: true })}
                type="file"
                className="file-input w-full"
                placeholder="Photo"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">You have not provided Photo</p>
              )}
            </div>

            {/* Prize */}
            <div>
              <label className="label font-semibold text-md text-black ">
                Prize
              </label>
              <input
                {...register("prize", { required: true, valueAsNumber: true })}
                type="number"
                className="input w-full"
                placeholder="Prize"
              />
              {errors.prize && (
                <p className="text-red-500">You have not provided Prize</p>
              )}
            </div>

            {/* Prize-Money */}
            <div>
              <label className="label font-semibold text-md text-black ">
                Prize-Money
              </label>
              <input
                {...register("prizeMoney", {
                  required: true,
                  valueAsNumber: true,
                })}
                type="number"
                className="input w-full"
                placeholder="Prize-Money"
              />
              {errors.prizeMoney && (
                <p className="text-red-500">
                  You have not provided Prize-Money
                </p>
              )}
            </div>

          

            {/* Programming Contest */}
            <div>
              <label className="label font-semibold text-md text-black ">
                Programming Contest
              </label>
              <select
                {...register("contestType", { required: true })}
                className="input w-full bg-base-100 rounded-box z-1  p-2 shadow-sm"
              >
                <option value="">Select Type</option>
                <option className="" value="programmingContest">
                  Programming Contest
                </option>
                <option value="UI-UXContest">UI-UX Contest</option>
                <option value="Photo_graphy_Contest">Photography Contest</option>
                <option value="Drawing_Contest">Drawing Contest</option>
                <option value="Essay_Contest">Essay Contest</option>
              </select>
              {errors.taskDifficulty && (
                <p className="text-red-500">
                  You have not selected Task Difficulty
                </p>
              )}
            </div>
            {/* Description */}
            <div>
              <label className="label font-semibold text-md text-black ">
                Description
              </label>
              <textarea
                {...register("description", { required: true })}
                className="input w-full h-24 resize-none"
                placeholder="Provide Contest Description"
              ></textarea>
              {errors.description && (
                <p className="text-red-500">
                  You have not provided Description
                </p>
              )}
            </div>
            {/* ================Date picker */}
            <div>
              <label className="label font-semibold text-md text-black">
                Deadline
              </label>
              <DatePicker
                selected={deadline}
                onChange={(date) => setDeadline(date)}
                showTimeSelect
                dateFormat="Pp" // date + time format
                className="input w-full"
                placeholderText="Select Deadline"
              />
            </div>
          </fieldset>

          <button
            type="submit"
            className="btn mt-4 bg-primary text-black w-full"
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContest;
