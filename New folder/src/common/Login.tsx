import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { formSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
// import { usePostLoginMutation } from "@/store/services/Login.service";
// import { useAuth } from "@/Context/ContextToken";
// import { useToast } from "@/components/ui/use-toast";
import image from "../assets/signInlogo.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/context/ContextToken";

const Login = () => {
  //   const { toast } = useToast();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  // Inside your component
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // console.log("Submit button clicked. Form data:", data);

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login response:", response.data);

      if (response.data.success) {
        sessionStorage.setItem("token", response.data.token);
        const decodedToken: any = jwtDecode(response.data.token ?? "");

        if (decodedToken?.role === "student") {
          setToken(response.data.token);
          navigate("/std-exam");
        }
        if (decodedToken?.role === "admin") {
          navigate("/admin-dashboard");
        }
        if (decodedToken?.role === "creator") {
          navigate("/creator-dashboard");
        }
      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <>
      <div className="grid h-[100vh] p-5 bg-[#FDF1EC]">
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 lg:px-40 gap-4">
          <h1 className="text-black font-bold text-3xl">Sign In</h1>
          <p className="text-black text-xl">Enter your email and password to signIn</p>

          <div className="flex flex-col gap-4 ">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="gap-4 py-4 md:grid-cols-1 lg:grid-cols-1 sm:grid-cols-1 grid grid-cols-1">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid w-full items-center gap-4">
                        <div className="col-span-3">
                          <FormControl>
                            <Input
                              type="text"
                              className="col-span-3 trim border text-black rounded-[10px] focus:outline-[#404042] focus:text-black focus:font-semibold"
                              placeholder="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="grid w-full items-center gap-4">
                        <div className="relative col-span-3">
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"}
                              className="trim col-span-3 border text-black rounded-[10px] focus:outline-[#404042] focus:text-black focus:font-semibold pr-12"
                              placeholder="password"
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center text-lg text-black bg-transparent hover:bg-transparent "
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className="hover:text-black hover:bg-[#FDF1EC] w-full font-bold text-2xl py-6 rounded-xl bg-black text-white"
                  variant="outline"
                >
                  Sign In
                </Button>
              </form>
            </Form>
            <div className="flex items-center space-x-2 justify-end p-3 ">
              <span className=" font-bold ">
                <Button onClick={() => navigate("/verify")} className="bg-transparent text-black hover:bg-transparent">
                  Forgot password ?
                </Button>
              </span>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 md:w-1/2 hidden lg:flex justify-center items-center p-5 rounded-2xl h-[95vh] fixed right-5">
          <div className="h-4/6 w-3/4">
            <img src={image} alt="Computer login" className="h-full w-full object-contain" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
