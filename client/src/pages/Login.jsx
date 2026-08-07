import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/axios";
import { useAuth } from "../context/Authcontext";


const Login = () => {

  const { login } = useAuth();

  const navigate = useNavigate();


  const [form,setForm] = useState({
    email:"",
    password:""
  });


  const [loading,setLoading] = useState(false);



  const handleChange=(e)=>{

    setForm({
      ...form,
      [e.target.name]:e.target.value
    });

  };



  const handleSubmit=async(e)=>{

    e.preventDefault();


    try{

      setLoading(true);


      const {data}=await API.post(
        "/users/login",
        form
      );


      console.log(
        "LOGIN RESPONSE:",
        data
      );


      login(data);


      navigate("/");


    }
    catch(error){

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }
    finally{

      setLoading(false);

    }

  };



return (

<div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">


<div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md">


<h1 className="text-4xl text-center font-bold text-[#8B1E3F]">
Vaidarbhi Sarees
</h1>


<p className="text-center mt-2 text-gray-500">
Welcome Back
</p>



<form 
onSubmit={handleSubmit}
className="space-y-5 mt-8"
>



<input

type="email"

name="email"

placeholder="Email"

value={form.email}

onChange={handleChange}

className="w-full border p-3 rounded-xl"

/>




<input

type="password"

name="password"

placeholder="Password"

value={form.password}

onChange={handleChange}

className="w-full border p-3 rounded-xl"

/>




<button

disabled={loading}

className="w-full bg-[#8B1E3F] text-white py-3 rounded-xl"

>


{
loading?
"Signing in..."
:
"Login"
}


</button>



</form>



<p className="text-center mt-5">

Don't have account?

<Link 
to="/register"
className="text-[#8B1E3F] ml-2 font-semibold"
>
Register
</Link>

</p>



</div>


</div>


);


};


export default Login;