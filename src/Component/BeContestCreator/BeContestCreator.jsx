import React from "react";
import useAuth from "../../hook/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hook/useAxiosSecure/useAxiosSecure";

const BeContestCreator = () => {
    const{user}=useAuth()
    const axiosSecure=useAxiosSecure()
    const {register,handleSubmit,formState:{errors}}=useForm()
    const dataOfForm=(data)=>{
        data.photoURL=user.photoURL
        console.log(data);
        axiosSecure.post('/creators',data).then(res=>{
            console.log(res.data);
            
        })
        
    }
 
  return (
    <div className="bg-amber-100 h-[80vh] flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit(dataOfForm)} className="w-[500px] mx-auto  bg-white shadow-2xl p-4 text-center rounded-md pt-5">
        <h1 className="text-4xl font-bold"> Become Contest Creator </h1>
        <fieldset className="fieldset">
            {/* Name */}
          <label className="label">Name</label>
          <input {...register('name')} defaultValue={user?.displayName} type="text" className="input w-full" placeholder="Name" />
          {errors.email?.type === "required" && (
                <p className="text-red-500">You have not provided Name</p>
              )}
              {/* Email */}
          <label className="label">Email</label>
          <input {...register('email')} defaultValue={user?.email} type="email" className="input w-full" placeholder="Email" />
          {errors.email?.type === "required" && (
                <p className="text-red-500">You have not provided Email</p>
              )}
              {/* Age */}
          <label className="label">Age</label>
          <input {...register('age',{required:true})} type="Number" className="input w-full" placeholder="Your Age" />
          {errors.age?.type === "required" && (
                <p className="text-red-500 font-semibold">You have not provided Age</p>
              )}
              {/* NID */}
          <label className="label">NID</label>
          <input {...register('nid',{required:true})} type="Number" className="input w-full" placeholder="Your NID" />
          {errors.nid?.type === "required" && (
                <p className="text-red-500 font-semibold">You have not provided NID</p>
              )}
              {/* ADDRESS */}
          <label className="label">Address</label>
          <input {...register('Address',{required:true})} type="text" className="input w-full" placeholder="Your Address" />
          {errors.Address?.type === "required" && (
                <p className="text-red-500 font-semibold">You have not provided Address</p>
              )}
        </fieldset>
        <button className="btn text-start inline bg-primary text-black">Apply</button>
      </form>
    </div>
  );
};

export default BeContestCreator;
