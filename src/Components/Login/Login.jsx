import axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from 'yup';

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  let [errors, setErrors] = useState([]);
  let [statusError, setStatusError] = useState('');
  let navigate = useNavigate();

  let schema = Yup.object(
    {
      email: Yup.string().required("email is required").email("email invalid"),
      password: Yup.string().min(10, "minimum characters is 10").max(15, "maximum characters is 15")
    }
  )

  let formik = useFormik(
    {
      initialValues: {
        email: "",
        password: ""
      }, onSubmit: sendLoginData,
      validationSchema: schema
    });

  async function sendLoginData(values) {

    let { data } = await axios.post('https://king-prawn-app-3mgea.ondigitalocean.app/auth/login', values).catch((err) => {
      setStatusError(err.response.data.message);

    });
    if (data.message === "Done") {
      setErrors([]);
      setStatusError([]);
      localStorage.setItem("userToken",data.access_token);
      props.info();
      navigate('/cart')
  }
  }
  return (
    <div className='my-5'>
      <h2>  Login Now!!</h2>

      <form className='mt-5' onSubmit={formik.handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" value={formik.values.email} onChange={formik.handleChange} name="email" className="form-control" />
          {statusError ? <p className="alert alert-danger mt-2">{statusError}</p> : ""}
          {formik.errors.email ? <p className="alert alert-danger mt-2">{formik.errors.email}</p> : ""}
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" value={formik.values.password} onChange={formik.handleChange} name='password' className=' form-control' id="exampleInputPassword1" />
          {formik.errors.password ? <p className="alert alert-danger mt-2">{formik.errors.password}</p> : ""}

        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>

    </div>
  )
}

