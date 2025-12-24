import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyResumeData } from "../../assets/assets";
import { ArrowLeft, User,ArrowLeftIcon ,FileText,GraduationCap, Briefcase,Sparkles,FolderIcon, ChevronLeft, ChevronRight} from "lucide-react";
import { Link } from "react-router-dom";
import PersonalInfoForm from "../components/PersonalInfoForm";

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const defaultResume = {
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    eduction: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  };
  const [resumeData, setResumeData] = useState(defaultResume);

  useEffect(() => {
    const resume = dummyResumeData.find((r) => r._id === resumeId);

    if (resume) {
      setResumeData({ ...defaultResume, ...resume });
      document.title = resume.title || "Resume Builder";
    } else {
      setResumeData(defaultResume);
      document.title = "Resume Builder";
    }
  }, [resumeId]);


const [activeSectionIndex,setActiveSectionIndex]=useState(0)
const [removeBackground,setRemoveBackground] =useState(false)

  const section=[
    {id:'personal',name:"Personal Info", icon:User},
    {id:'summary' ,name:"Summary",icon:FileText},
    {id:'experience',name:"Education",icon:Briefcase},
    {id:"education",name:"Education",icon:GraduationCap},
    {id:"projects",name:"Projects",icon:FolderIcon},
    {id:"skills",name:"Skills",icon:Sparkles}
  ]

  const activeSection =section[activeSectionIndex]

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500"
        >
          <ArrowLeftIcon />
          Back to Dashboard
        </Link>
      </div>

    <div className="max-w-7xl mx-auto px-4 pb-8">
    <div className="grid lg:grid-cols-12 gap-8">
        {/* left  form*/}
        <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
                {/* progress bar using activesection index */}
                <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200"/>
                <hr className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000" style={{width:`${activeSectionIndex*100/(section.length-1)}`}}/>

                {/* sction navigation */}
                <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                    <div></div>
                    <div className="flex itmes-center">
                        {activeSectionIndex!=0 &&(
                            <button onClick={()=>setActiveSectionIndex((prevIndex)=>Math.max(prevIndex-1,0))} className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all" disabled={activeSectionIndex===0}>
                                <ChevronLeft className="size-4"/>
                                Previous
                            </button>
                        )}
                           <button onClick={()=>setActiveSectionIndex((prevIndex)=>Math.min(prevIndex+1,section.length-1))} className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex ===section.length-1 && 'opacity-50'}`} disabled={activeSectionIndex===section.length-1}>
                                Next
                                <ChevronRight className="size-4"/>
                            </button>
                    </div>

                </div>
                {/* form content */}
                <div className="space-y-6">
                        {activeSection.id ==='personal' && 
                        (
                            <PersonalInfoForm data={resumeData.personal_info}  onChange={(data)=>setResumeData(prev=>({...prev,personal_info:data}))}  removeBackground={removeBackground} 
                            setRemoveBackground={setRemoveBackground}
                            />
                        )}
                </div>
            </div>


        </div>
        
        
        {/*right panel  preview */}
        <div>


            
        </div>

    </div>

    </div>


    </div>
  );
};

export default ResumeBuilder;
