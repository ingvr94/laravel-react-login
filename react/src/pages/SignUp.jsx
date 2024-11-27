import React from 'react'
import { useRef,useState } from 'react';
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { Link } from "react-router-dom";
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

function SignUp() {

    const nameRef=useRef()
    const emailRef=useRef()
    const passwordRef=useRef()
    const passwordConfirmationRef=useRef()

    const [errors,setErrors]=useState(null)

    const {setUser,setToken}=useStateContext()

    const onSubmit=(e)=>{
        e.preventDefault()
        const payload={
            name:nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
            password_confirmation:passwordConfirmationRef.current.value
        }

        axiosClient.post('/signup',payload)
        .then(({data})=>{
            setUser(data.user)
            setToken(data.token)
            console.log(data)
        })
        .catch(err=>{
            const response=err.response

            if (response && response.status == 422) {
                console.log(response.data.errors)
               setErrors(response.data.errors)
            }
        })
      }
    
  return (
    <div className="w-full h-screen flex items-center justify-center">
            <Card className=" shadow-lg p-4" color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
            Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter your details to login.
            </Typography>
            <form onSubmit={onSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Your Name
                    </Typography>
                    <Input
                        inputRef={nameRef}
                        size="lg"
                        placeholder="Enter your name"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                        className: "before:content-none after:content-none",
                        }}
                    />
                    {errors && 
                    <div className='-mt-5 text-red-500 text-sm'>
                        {Object.keys(errors).map(key=>(
                            key=='name' && <div key={key}>{errors[key]}</div>
                        ))}
                    </div>}
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
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Confirm password
                    </Typography>
                    <Input
                    inputRef={passwordConfirmationRef}
                    type="password"
                    size="lg"
                    placeholder="********"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                    />
            </div>

            <Button type='submit' className="mt-6" fullWidth>
                sign up
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}{" "}
                <Link to='/login' className="font-medium text-gray-900">
                Sign In
                </Link>
            </Typography>
            </form>
            </Card>
        </div>
  )
}

export default SignUp