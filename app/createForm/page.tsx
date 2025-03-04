"use client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const page = () => {
  const formSchema = z.object({
    gradeLevel: z.string({
      required_error: "Please select a Grade.",
    }),
    subject: z.string().min(2).max(50),
    help: z.string().min(2).max(50),
  });

  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gradeLevel: "",
      subject: "",
      help: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const educationLevels = [
    { value: "grade-1", label: "1st Grade" },
    { value: "grade-2", label: "2nd Grade" },
    { value: "grade-3", label: "3rd Grade" },
    { value: "grade-4", label: "4th Grade" },
    { value: "grade-5", label: "5th Grade" },
    { value: "grade-6", label: "6th Grade" },
    { value: "grade-7", label: "7th Grade" },
    { value: "grade-8", label: "8th Grade" },
    { value: "grade-9", label: "9th Grade (Freshman)" },
    { value: "grade-10", label: "10th Grade (Sophomore)" },
    { value: "grade-11", label: "11th Grade (Junior)" },
    { value: "grade-12", label: "12th Grade (Senior)" },
    { value: "college", label: "College" },
    { value: "grad-school", label: "Graduate School" },
    { value: "professional-school", label: "Professional School" },
  ];

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 ">
      <h2 className="font-bold text-3xl">
        {" "}
        Create the Perfect Study Worksheet 📚
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Please provide the following information
      </p>

      <div className="mt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="gradeLevel"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="font-semibold ">Grade Level</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                      >
                        {field.value
                          ? educationLevels.find(
                              (framework) => framework.label === field.value
                            )?.label
                          : "Choose a Grade..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search Grade..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No Grade found.</CommandEmpty>
                          <CommandGroup>
                            {educationLevels.map((framework) => (
                              <CommandItem
                                key={framework.label}
                                value={framework.value}
                                onSelect={() => {
                                  form.setValue("gradeLevel", framework.label);
                                  setOpen(false);
                                }}
                              >
                                {framework.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    field.value === framework.label
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter a Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Course Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid w-full gap-1.5 mt-5">
              <FormField
                control={form.control}
                name="help"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What Help Do You Need</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List any challenges you may be having"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="mt-6">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default page;
