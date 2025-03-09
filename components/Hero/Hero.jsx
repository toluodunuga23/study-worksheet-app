"use client"
import { useRouter } from 'next/navigation'
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const Hero = () => {

   
    const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-16 gap-6  text-black">
        <p>(UI is a Work in a Progress!!!)</p>
      <h1 className="font-extrabold text-[60px] leading-tight text-center">
       Create the Perfect WorkSheet with <span className="text-green-400">SmartSheets</span>
      </h1>
      <p className="text-lg text-center max-w-xl">
      SmartSheets is an AI-powered platform designed to help students enhance their learning experience. Users can receive personalized PDF worksheets tailored to their needs. SmartSheets provides smart, dynamic worksheets to help you study more effectively and efficiently.
      </p>
      <Button className="bg-green-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full" onClick={() => router.push('/createForm')}>
        Get Started
      </Button>

  

    </div>
  )
}

export default Hero;
