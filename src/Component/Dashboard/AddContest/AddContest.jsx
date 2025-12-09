import axios from "axios";
import React from "react";

import { useForm } from "react-hook-form";

const AddContest = () => {
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
    });

    console.log(data);
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
              <label className="label font-semibold text-md text-black ">Name</label>
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
              <label className="label font-semibold text-md text-black ">Upload Photo</label>
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
              <label className="label font-semibold text-md text-black ">Prize</label>
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
              <label className="label font-semibold text-md text-black ">Prize-Money</label>
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

            {/* Task Description */}
            <div>
              <label className="label font-semibold text-md text-black ">Task Description</label>
              <input
                {...register("taskDescription", { required: true })}
                type="text"
                className="input w-full"
                placeholder="Task Description"
              />
              {errors.taskDescription && (
                <p className="text-red-500">
                  You have not provided Task Description
                </p>
              )}
            </div>

            {/* Task Difficulty */}
            <div>
              <label className="label font-semibold text-md text-black ">Task Difficulty</label>
              <select
                {...register("contestType", { required: true })}
                className="input w-full bg-base-100 rounded-box z-1  p-2 shadow-sm"
              >
                <option value="">Select Type</option>
                <option className="" value="programmingContest">Programming Contest</option>
                <option value="uI-UXContest">UI-UX Contest</option>
                <option value="photographyContest">Photography Contest</option>
                <option value="drawingContest">Drawing Contest</option>
                <option value="essayContest">Essay Contest</option>
              </select>
              {errors.taskDifficulty && (
                <p className="text-red-500">
                  You have not selected Task Difficulty
                </p>
              )}
            </div>
            {/* Description */}
            <div>
              <label className="label font-semibold text-md text-black ">Description</label>
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
