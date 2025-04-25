import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { regiSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import image from "@/assets/registerlogo.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { usePostUserMutation } from "@/store/services/Register.service";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof regiSchema>>({
    resolver: zodResolver(regiSchema),
    defaultValues: {
      name: "Princy",
      email: "princy@gmail.com",
      password: "pri@123",
     
    },
  });

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  // const [clickCount, setClickCount] = useState(0);
  // const handleClick = () => {
  //   setClickCount(prev => prev + 1);
  //   console.log("Button clicked", clickCount + 1);
  // };
  
  const onSubmit = async (e: z.infer<typeof regiSchema>) => {
    const formData = new FormData();
    console.log(formData,"formdata");
    formData.append("password", e.password);
    formData.append("name", e.name);
    formData.append("email", e.email);
   

    try {
      const response = await axios.post("http://localhost:3000/auth/signup", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.data?.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };
    return (
    <>
      <div className="grid h-[100vh] p-5 bg-[#FDF1EC]">
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 lg:px-40 gap-4">
          <h1 className="text-black font-bold text-3xl">Register</h1>
          <p className="text-black text-xl">Register yourself for use our services</p>

          <div className="flex flex-col gap-4 ">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="gap-4 py-4 md:grid-cols-1 lg:grid-cols-1 sm:grid-cols-1 grid grid-cols-1">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="grid w-full items-center gap-4">
                        <div className="col-span-3">
                          <FormControl>
                            <Input
                              type="text"
                              className="col-span-3 trim border text-black rounded-[10px] focus:outline-[#404042] focus:text-black focus:font-semibold"
                              placeholder="Name"
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
                  // onClick={handleClick}
                  className="hover:text-black hover:bg-[#FDF1EC] w-full font-bold text-2xl py-6 rounded-xl bg-black text-white"
                  variant="outline"
                >
                  Register
                </Button>
              </form>
            </Form>
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

export default Register;
