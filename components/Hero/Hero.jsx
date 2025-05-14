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
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen py-20 gap-8 bg-black overflow-hidden">
      {/* Animated Emoji Flair */}
      <span className="absolute top-10 left-10 text-5xl animate-bounce select-none">🦄</span>
      <span className="absolute bottom-10 right-10 text-4xl animate-spin-slow select-none">✨</span>

      {/* Trending Badge */}
      <div className="mb-2 px-4 py-1 bg-purple-800/90 rounded-full shadow-md flex items-center gap-2 text-sm font-semibold text-white">
        <span className="text-lg">🔥</span> Trending for Gen-Z
      </div>

      <h1 className="font-black text-[48px] md:text-[64px] leading-tight text-center drop-shadow-lg text-white">
        Smarter. Quicker. <span className="text-purple-400">Your Way.</span>
      </h1>
      <p className="text-xl text-center max-w-2xl font-medium text-gray-200">
        Unlock your potential with <span className="font-bold text-purple-400">SmartSheets</span> — AI tools for learning, productivity, and creativity. Built for Gen-Z. ⚡️
      </p>
      <Button className="mt-2 bg-purple-600 hover:bg-purple-400 text-white font-extrabold py-4 px-10 rounded-full shadow-xl transition-transform transform hover:scale-105 hover:rotate-1 duration-200 text-lg tracking-wide" onClick={() => router.push('/createForm')}>
        Get Started <span className="ml-2">🚀</span>
      </Button>
    </div>
  )
}

export default Hero;
