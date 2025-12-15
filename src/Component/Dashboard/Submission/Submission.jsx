import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { toast } from "../../Authentication/Registration/Toast/toast";
import useAuth from "../../../hook/useAuth";

const Submission = () => {
const{user}=useAuth()
    const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const handleWinner=(participant)=>{
  
    
    axiosSecure.patch(`/declareWinner/${id}?email=${participant?.participantEmail}`)
    .then(res=>{
        if(res.data. modifiedCount){
            toast("Winner has been declared")
            refetch()
        }
        console.log(res.data);
        
    }).catch(err=>console.log(err.message)
    )
}
  const { refetch,data: submissions = [] } = useQuery({
    queryKey: ["submission", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submission/${id}`);
      return res.data;
    },
  });
//   console.log(submissions);

  return (
    <div>
      <div>
        <h1>Submission {submissions?.participants?.length}</h1>

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
                    <td>{participant?.taskInfo[0]?.info}</td>
                    <td>

                        {
                            new Date(submissions.deadline)>new Date()&&
                                 <p>Deadline Active</p>
                            

                        }
                        {
                            new Date(submissions?.deadline)<new Date() &&
                            !submissions?.winner
                            &&
                             <button onClick={()=>handleWinner(participant)} className="btn btn-primary text-black">Declare Winner</button>
                             
                        }
                        {
                             submissions?.winner===participant?.participantEmail &&
                             <button className="btn btn-primary text-black">🤩Winner🤩</button>
                        }
                      {/* {new Date(submissions.deadline) > new Date() ? 
                          <p>Deadline Active</p>
                      : 
                   <>
                   <button onClick={()=>handleWinner(participant)} className="btn btn-primary text-black">Declare Winner</button>

                   
                        submissions?.winner===participant?.participantEmail
                        ?
                        <button className="btn btn-primary text-black">🤩Winner🤩</button>
                        :
                         null
                   
                   </>
                      } */}
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
