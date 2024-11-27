import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { Link } from "react-router-dom";
  import { useRef,useState } from "react";
  import axiosClient from "../axios-client";
  import { useStateContext } from "../context/ContextProvider";

   
  export default function Login() {

    const emailRef=useRef()
    const passwordRef=useRef()

    const [errors,setErrors]=useState(null)
    const {setUser,setToken}=useStateContext()

    const onSubmit=(e)=>{
        e.preventDefault()
        const payload={
            email:emailRef.current.value,
            password:passwordRef.current.value,
        }
        setErrors(null)
        axiosClient.post('/login',payload)
        .then(({data})=>{
            setUser(data.user)
            setToken(data.token)
        })
        .catch(err=>{
            const response=err.response

            if (response && response.status == 422) {
                response.data.errors ? setErrors(response.data.errors) : setErrors({
                    email:response.data.message
                })
            } 
        })
      }
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <Card className=" shadow-lg p-4" color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
            Sign In
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter your details to login.
            </Typography>
            <form onSubmit={onSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Email
                </Typography>
                <Input
                inputRef={emailRef}
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                    className: "before:content-none after:content-none",
                }}
                />
                {errors && 
                <div className='-mt-5 text-red-500 text-sm'>
                    {Object.keys(errors).map(key=>(
                        key=='email' && <p key={key}>{errors[key]}</p>
                    ))}
                </div>}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
                </Typography>
                <Input
                inputRef={passwordRef}
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                    className: "before:content-none after:content-none",
                }}
                />
                {errors && 
                <div className='-mt-5 text-red-500 text-sm'>
                    {Object.keys(errors).map(key=>(
                        key=='password' && <p key={key}>{errors[key]}</p>
                ))}
                </div>}
            </div>

            <Button type="submit" className="mt-6" fullWidth>
                sign in
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
                Not Registered?{" "}
                <Link to='/signup' className="font-medium text-gray-900">
                Create an account
                </Link>
            </Typography>
            </form>
            </Card>
        </div>
       
    );
  }