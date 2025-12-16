import React from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "../../Authentication/Registration/Toast/toast";

const UpdateProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch, data: userProfile, isLoading } = useQuery({
    queryKey: ["users", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile?email=${user.email}`);
      return res.data;
    },
  });

  const { register, handleSubmit } = useForm();

 const handleFormData = async (userFormData) => {
  try {
    // default old photo
    let photoURL = userProfile?.photoURL || "";

    // check if user uploaded a new file
    if (userFormData.photo && userFormData.photo.length > 0) {
      const formData = new FormData();
      formData.append("image", userFormData.photo[0]);
      const imageUrlKey = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_host}`;

      const res = await axios.post(imageUrlKey, formData);
      if(res?.data?.data?.url){
        photoURL = res.data.data.url;
      }
    }

    const userInfo = {
      displayName: userFormData.name || userProfile?.displayName,
      photoURL,
    };

    const res = await axiosSecure.patch(`/updateProfile?email=${user?.email}`, userInfo);

    if (res.data.modifiedCount) {
      toast("Profile updated successfully");
      refetch();
    }
  } catch (err) {
    console.log("Update failed:", err);
  }
};


  

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center">Update Your Profile</h1>
      <div className="hero bg-base-200">
        <div className="hero-content w-[400px]">
          <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit(handleFormData)}>
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input
                    {...register("name")}
                    defaultValue={userProfile?.displayName}
                    type="text"
                    className="input"
                    placeholder="Name"
                  />

                  <label className="label font-semibold">Upload Photo</label>
                  <input
                    {...register("photo")}
                    type="file"
                    className="file-input"
                    placeholder="Photo"
                  />

                  <button className="btn bg-green-400 text-black mt-4">
                    Update
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
