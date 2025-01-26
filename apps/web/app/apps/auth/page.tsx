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
import { useRouter } from "next/navigation";
import { useToast } from "@repo/ui/hooks/use-toast";

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
  const cookies = useCookies();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (cookies.get("jwt")) {
      router.push("/apps");
    }
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setWaiting(true);
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const res = await req.json();
    setWaiting(false);

    if (req.status != 200) {
      return toast({
        variant: "destructive",
        title: res.title,
        description: res.detail,
      });
    }
    cookies.set("jwt", res.token);
    window.location.reload();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
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
