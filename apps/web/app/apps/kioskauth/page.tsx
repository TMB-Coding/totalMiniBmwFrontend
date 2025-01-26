"use client";
import React from "react";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";

const formSchema = z.object({
  employeeNumber: z.number().min(4, {
    message: "Input must be an employee number.",
  }),
  firstName: z.string().min(1, {
    message: "Please include your first name.",
  }),
});
const KioskLoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeNumber: undefined,
      firstName: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="rounded-lg px-3 py-4 text-white shadow-small">
        <div className="flex flex-row py-5">
          <h1 className="text-4xl font-semibold text-white">Sign into&nbsp;</h1>
          <h1 className="inline-block bg-gradient-to-tr from-[#81C4FF] to-[#E7222E] bg-clip-text text-4xl font-semibold text-transparent">
            TMB Kiosk
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="employeeNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee Number</FormLabel>
                    <FormControl>
                      <Input placeholder="9999" {...field} type="number" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="chad" {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="relative mt-8 w-full">
              <Loader2 className="animate-spin" />
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default KioskLoginPage;
