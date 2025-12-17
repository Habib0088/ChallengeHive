import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";

import { toast } from "../../Authentication/Registration/Toast/toast";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import Loading from "../../Loading/Loading";

const EditContest = () => {
  const [deadline, setDeadline] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: contest } = useQuery({
    queryKey: ["contestForEdit", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contestForEdit/${id}`);
      return res.data;
    },
  });

  // Set existing deadline
  useEffect(() => {
    if (contest?.deadline) {
      setDeadline(new Date(contest.deadline));
    }
  }, [contest]);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const contestData = async (editFormData) => {
    const hasNewPhoto = editFormData.photo && editFormData.photo[0];

    editFormData.status = contest.status;
    editFormData.deadline = deadline || contest.deadline;
    editFormData.contestCreator = user.displayName;
    editFormData.email = user.email;
    editFormData.creatorPhoto = user.photoURL;

    // Keep old photo if no new photo uploaded
    if (!hasNewPhoto) {
      editFormData.photoURL = contest.photoURL;
      updateContest(editFormData);
      return;
    }

    // Upload new photo
    const formData = new FormData();
    formData.append("image", editFormData.photo[0]);
    const imageUrlKey = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_host}`;

    axios.post(imageUrlKey, formData).then((res) => {
      editFormData.photoURL = res.data.data.url;
      updateContest(editFormData);
    });
  };

  const updateContest = (editFormData) => {
    axiosSecure.patch(`/updateContest/${id}`, editFormData)
      .then((res) => {
        toast("Contest Updated Successfully");
      })
      .catch((err) => console.log(err));
  };

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div>
      <div className="bg-amber-100 flex flex-col items-center justify-center md:py-11">
        <form
          onSubmit={handleSubmit(contestData)}
          className="w-[500px] mx-auto bg-white shadow-2xl rounded-md p-5"
        >
          <h1 className="text-4xl font-bold mb-5 text-center md:py-6">
            Give Contest Information
          </h1>

          <fieldset className="fieldset space-y-4">

            {/* Name */}
            <div>
              <label className="label font-semibold text-md text-black">Name</label>
              <input
                defaultValue={contest?.name}
                {...register("name", { required: true })}
                type="text"
                className="input w-full"
                placeholder="Enter Contest Name"
              />
              {errors.name && <p className="text-red-500">You have not provided Name</p>}
            </div>

            {/* Photo */}
            <div>
              <label className="label font-semibold text-md text-black">Upload Photo</label>
              {contest?.photoURL && (
                <img
                  src={contest.photoURL}
                  className="w-32 h-32 object-cover mb-2 rounded"
                />
              )}
              <input
                {...register("photo")}
                type="file"
                className="file-input w-full"
              />
            </div>

            {/* Price */}
            <div>
              <label className="label font-semibold text-md text-black">Price</label>
              <input
                defaultValue={contest.price}
                {...register("price", { required: true, valueAsNumber: true })}
                type="number"
                className="input w-full"
                placeholder="Price"
              />
            </div>

            {/* Prize Money */}
            <div>
              <label className="label font-semibold text-md text-black">Prize-Money</label>
              <input
                defaultValue={contest.prizeMoney}
                {...register("prizeMoney", { required: true, valueAsNumber: true })}
                type="number"
                className="input w-full"
                placeholder="Prize-Money"
              />
            </div>

            {/* Contest Type */}
            <div>
              <label className="label font-semibold text-md text-black">Contest Type</label>
              <select
                defaultValue={contest.contestType}
                {...register("contestType", { required: true })}
                className="input w-full bg-base-100 rounded-box p-2 shadow-sm"
              >
                <option value="">Select Type</option>
                <option value="programmingContest">Programming Contest</option>
                <option value="UI-UXContest">UI-UX Contest</option>
                <option value="Photo_graphy_Contest">Photography Contest</option>
                <option value="Drawing_Contest">Drawing Contest</option>
                <option value="Essay_Contest">Essay Contest</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="label font-semibold text-md text-black">Description</label>
              <textarea
                defaultValue={contest.description}
                {...register("description", { required: true })}
                className="input w-full h-24 resize-none"
                placeholder="Provide Contest Description"
              ></textarea>
            </div>

            {/* Deadline */}
            <div>
              <label className="label font-semibold text-md text-black">Deadline</label>
              <DatePicker
                selected={deadline}
                onChange={(date) => setDeadline(date)}
                showTimeSelect
                dateFormat="Pp"
                className="input w-full"
                placeholderText="Select Deadline"
              />
            </div>

          </fieldset>

          <button type="submit" className="btn mt-4 bg-primary text-black w-full">
            Apply
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditContest;
