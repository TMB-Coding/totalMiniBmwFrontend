"use client";
import React, { useState } from "react";
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
  email: z.string().email({
    message: "Input must be a valid email.",
  }),
  password: z.string().min(1, {
    message: "Please include a password.",
  }),
});
const LoginPage = () => {
  const [waiting, setWaiting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setWaiting(true);
    console.log(values);
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="rounded-lg px-3 py-4 text-white shadow-small">
        <div className="flex flex-row py-5">
          <h1 className="text-4xl font-semibold text-white">Sign onto&nbsp;</h1>
          <h1 className="inline-block bg-gradient-to-tr from-[#81C4FF] to-[#E7222E] bg-clip-text text-4xl font-semibold text-transparent">
            TMB Apps
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="chad@acme.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="relative mt-8 w-full text-black"
              variant={"outline"}
              disabled={waiting}
            >
              {waiting && <Loader2 className="animate-spin" />}
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
