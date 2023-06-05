import axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from 'yup';

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {
  let [errors,setErrors]=useState([]);
  let [statusError,setStatusError]=useState('');
  let navigate=useNavigate();

  let schema=Yup.object(
    {
      userName: Yup.string().required("name is required").min(3,"minimum characters is 3").max(15,"maximum characters is 15"),
      email:  Yup.string().required("email is required").email("email invalid"),
      password: Yup.string().min(10,"minimum characters is 10").max(15,"maximum characters is 15"),
      cPassword: Yup.string().min(10,"minimum characters is 10").max(15,"maximum characters is 15").oneOf([Yup.ref('password')],"confirm password must be the same as password")
    }
  )

  let formik = useFormik(
    {
      initialValues: {
        userName: "",
        email: "",
        password: "",
        cPassword: ""
      }, onSubmit: sendRegisterData,
      validationSchema:schema
    });

  async function sendRegisterData(values) {

    let {data}= await axios.post('https://king-prawn-app-3mgea.ondigitalocean.app/auth/signup',values).catch((err)=>{
       setStatusError(err.response.data.message);
    })
    if (data.message==="Done") {
      setStatusError('');
      setErrors([]);
      navigate('/login')
    } else {
       setErrors(data.err[0]);
    }
  }

  return (
    <div className='my-5'>
      <h2>  Register Now!!</h2>
  
      <form className='mt-5' onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label  className="form-label">Your Name</label>
          <input type="text" name="userName" value={formik.values.userName} onChange={formik.handleChange} className="form-control" />
          {formik.errors.userName?<p className="alert alert-danger mt-2">{formik.errors.userName}</p>:""}
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" value={formik.values.email} onChange={formik.handleChange} name="email" className="form-control" />
          {statusError?<p className="alert alert-danger mt-2">{statusError}</p>:""}
          {formik.errors.email?<p className="alert alert-danger mt-2">{formik.errors.email}</p>:""}
          </div>

        <div className="mb-3">
          <label  className="form-label">Password</label>
          <input type="password" value={formik.values.password} onChange={formik.handleChange} name='password' className=' form-control'id="exampleInputPassword1" />
          {formik.errors.password?<p className="alert alert-danger mt-2">{formik.errors.password}</p>:""}


        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
          <input type="password" value={formik.values.cPassword} onChange={formik.handleChange} name='cPassword' className=' form-control' id="exampleInputPassword2" />
          {formik.errors.cPassword?<p className="alert alert-danger mt-2">{formik.errors.cPassword}</p>:""}

        </div>
        
        <button type="submit" className="btn btn-primary">Register</button>
      </form>

    </div>
  )
}
