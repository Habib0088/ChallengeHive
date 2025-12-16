import React from "react";
import { Link, useNavigate } from "react-router";

const Error = () => {
  const navigator = useNavigate();
  return (
    <div>
      <div>
        <img
          className="h-[90vh] w-full"
          src="https://syhzhuelbxgnhopnwjgc.supabase.co/storage/v1/object/public/media/blog/404_page_cover.jpg"
          alt="Page not found"
        />
        <div className="flex gap-3 w-[200px] mx-auto">
          <button
            onClick={()=>navigator(-1)}
            className="text-center font-bold btn mx-auto flex  bg-sky-600 text-white"
          >
            Back
          </button>
          <button className="text-center font-bold btn mx-auto flex  bg-sky-600 text-white">
            <Link to="/">Back To Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
