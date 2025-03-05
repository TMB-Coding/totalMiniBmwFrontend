"use client";
import React, { useEffect, useState } from "react";
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
import { useCookies } from "next-client-cookies";
import { useToast } from "@repo/ui/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  employeeNumber: z.string().min(1, {
    message: "Input must be an employee number.",
  }),
  firstName: z.string().min(1, {
    message: "Please include your first name.",
  }),
});
const KioskLoginPage = () => {
  const cookies = useCookies();
  const [waiting, setWaiting] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeNumber: "",
      firstName: "",
    },
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setWaiting(true);
    const employeeNumber = parseInt(values.employeeNumber);
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/kiosk`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeNumber,
          name: values.firstName,
        }),
      }
    );
    form.reset({ employeeNumber: "", firstName: "" });
    form.clearErrors();
    const res = await req.json();
    setWaiting(false);

    if (req.status != 200) {
      return toast({
        variant: "destructive",
        title: "Error:",
        description: "An error occured logging you into the kiosk.",
      });
    }
    cookies.set("jwt", res.token);
    router.push("/apps/kiosk");
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
                      <Input
                        inputMode="none"
                        placeholder="9999"
                        {...field}
                        type="number"
                        ref={inputRef}
                      />
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
                      <Input
                        placeholder="chad"
                        {...field}
                        type="text"
                        inputMode="none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="relative mt-8 w-full"
              disabled={waiting}
            >
              {waiting && <Loader2 className="animate-spin" />}
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default KioskLoginPage;
