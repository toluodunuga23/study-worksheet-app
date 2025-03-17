"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { useParams } from 'next/navigation'
import axios from "axios";
import MockData from "../../../mock.json";
import { Button } from "@/components/ui/button";

interface QuestionType {
  question: string;
  options: string[];
}

const page = () => {
  const { user } = useUser();
  const [worksheetData, setWorksheetData] = React.useState<any>();
  const params = useParams<{ id: string; }>()
  console.log(params)
  console.log("params",params?.id)
  console.log("MockData",MockData[0]?.result?.worksheetLayout)



  useEffect(() => {
    if (user) {
      fetchCourseList();
    }
  }, [user]);




  const fetchCourseList = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.error('User email not found');
      return;
    }
    console.log("User",user)
    console.log('Fetching courses for user:', user.primaryEmailAddress.emailAddress);

    try {
      const response = await axios.post('/api/worksheets', {
        createdBy: user.primaryEmailAddress.emailAddress,
        id: params?.id,
      });
      console.log("data",response);
      console.log("Response worksheet",response?.data?.result[0]?.worksheetLayout)
      setWorksheetData(response?.data?.result[0]?.worksheetLayout);
    } catch (error) {
      console.log("Error",error)
 
    }
  };
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 ">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl"> Here is Your Worksheet 📚</h2>
        <Button className="mt-4">Print Worksheet</Button>
    
      </div>
      <h3 className="font-bold text-2xl mt-5">{worksheetData?.subject}</h3>
      <h3 className="font-bold text-2xl mt-5">{worksheetData?.topic}</h3>
      <div className='grid grid-cols-1 gap-9 items-left mt-6 '>
        {worksheetData&&(
            <>
              {worksheetData?.questions?.map((question_type: QuestionType, index: number) => (
                <div key={index} className='flex items-center p-1 px-7 gap-4 rounded-md '>
                <div className="flex flex-col gap-4">
                <p>Question: {" "}{index+1}</p> 
                
                <p>{question_type.question}</p>
                {question_type?.options?.map((option_type: string, index: number) => (
                <div key={index} className='flex items-center p-1 px-7 gap-4 '>
                <p>Option: {" "}{index+1}</p> <p>{option_type}</p>
                </div>
              ))}
                </div>
            
                </div>
              ))}
            
            
            </>
        )}
        </div>
    </div>
  );
};

export default page;
