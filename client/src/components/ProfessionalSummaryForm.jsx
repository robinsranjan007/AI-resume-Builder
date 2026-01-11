import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import {useSelector} from "react-redux"
import {toast} from "react-hot-toast"
import api from '../configs/api'


export default function ProfessionalSummary({ data, onChange, setResumeData }) {


  const [isGenerating, setIsGenerating] = useState(false)
  const {token} = useSelector(state => state.auth)

  const generateSummary = async() => {
    try {
      setIsGenerating(true)
      const prompt = `enhance my professional summary ${data}`
      const response = await api.post('/api/ai/enhance-pro-sum', {userContent: prompt},
        {headers: {Authorization: token}}
      )
      setResumeData(prev => ({...prev, professional_summary: response.data.enhancedContent}))
      toast.success("Summary enhanced successfully!")
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    finally{
      setIsGenerating(false)
    }
  }


  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900">Professional Summary</h3>
          <p className="text-sm text-gray-500">Add summary for your resume here</p>
        </div>

        <button
          type="button"
          disabled={isGenerating} 
          onClick={generateSummary}
          className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1 text-sm font-medium hover:bg-purple-200 bg-purple-100 text-purple-700 transition-colors disabled:opacity-50"
        >
          {isGenerating ? (<Loader2 className="size-4 animate-spin"/>):( <Sparkles className="size-4" />)}
          {isGenerating ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      <div className="mt-6 space-y-2">
        <textarea
          rows={7}
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none" 
          placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
        />

        <p className="mx-auto max-w-[80%] text-center text-xs text-gray-500">
          Tip: keep it concise (3-4 sentences) and focus on your most relevant achievements and skills
        </p>
      </div>
    </div>
  );
}