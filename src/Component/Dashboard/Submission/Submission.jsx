import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { toast } from "../../Authentication/Registration/Toast/toast";
import Countdown from "../../Countdown/Countdown";
import Loading from "../../Loading/Loading";

const Submission = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const handleWinner = (participant) => {
    axiosSecure
      .patch(`/declareWinner/${id}?email=${participant?.participantEmail}`)
      .then((res) => {
        if (res.data.modifiedCount) {
          toast("Winner has been declared");
          refetch();
        }
        console.log(res.data);
      })
      .catch((err) => console.log(err.message));
  };
  const { isLoading,refetch, data: submissions = [] } = useQuery({
    queryKey: ["submission", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submission/${id}`);
      return res.data;
    },
  });
  //   console.log(submissions);
if(isLoading){
  return <Loading></Loading>
}
  return (
    <div>
      <div>
        

        <div className="overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Task</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {submissions?.participants?.map((participant, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{participant?.participantName}</td>
                    <td>{participant?.participantEmail}</td>
                    <td>{participant?.taskInfo?.[0]?.info}</td>
                    <td>
                      {new Date(submissions.deadline) > new Date() && (
                        // <p>Deadline Active</p>
                        <Countdown
                          deadline={submissions?.deadline}
                          className="text-red-400 font-bold"
                        />
                      )}
                      {new Date(submissions?.deadline) < new Date() &&
                        !submissions?.winner && (
                          <button
                            onClick={() => handleWinner(participant)}
                            className="btn btn-primary text-black"
                          >
                            Declare Winner
                          </button>
                        )}
                      {submissions?.winner ===
                        participant?.participantEmail && (
                        <button className="btn btn-primary text-black">
                          🤩Winner🤩
                        </button>
                      )}
                     
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submission;
