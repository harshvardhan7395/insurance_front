import { useState } from "react";
import axios from './../utils/axios';
import { useHistory } from "react-router-dom";

const Login =props =>{

    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    let history=useHistory()

    const UserName = (event) => {
        setUsername(event.target.value)
    }

    const Password = (event) => {
        setPassword(event.target.value);
    }


    const Submit = async() => {
        const jobj={
            username:username,
            password:password
        }

        await axios.post('users/login/',jobj,{headers:{'Content-Type':'application/json'}}).then((response) =>{
            const {data} = response;
            console.log("Response Object : ");
            console.log(response);
            console.log(data.toLowerCase());
            localStorage.setItem('flag',data.toLowerCase());
            history.push({pathname:'/dashboard',data:response.config.data});
        }).catch(error =>{
            alert("Enter Valid Credentials\n"+error);
            console.log(error);
        })
    }

    const handleKeyDown = (event) => {
        if(event.key==='Enter')
        Submit();
    }

    
        return(
        <div className="flex bg-white p-5 " >
           <div className="flex-auto h-full w-1/2  m-1 ">
          
           <h3 className="block font-bold text-gray-700 italic ml-16 mt-28 font-serif text-4xl">LOG IN</h3>
           <div className="flex-auto  ml-16 mt-6 p-5 ">
                            <label className="block text-gray-700 text-2xl font-bold mb-2">User Name </label>
					        <input type="text" onChange={(event)=>{UserName(event)}} className="shadow appearance-none border rounded w-2/3 p-2 mb-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={username}/><br></br>
					
		
					        <label className="block text-gray-700 text-2xl font-bold mb-2">Password </label>
				        	<input type="password" onChange={(event)=>{Password(event)}} onKeyDown={(event)=>handleKeyDown(event)} className="shadow appearance-none border rounded w-2/3 mb-6 p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={password}/><br></br>

                            
                            <button onClick={()=>{Submit()}} className="bg-green-700 hover:bg-green-500 text-black font-bold mt-6 py-2 px-4 rounded ">LOGIN </button>

           </div>
           </div>
           <div className="flex-auto h-full w-1/2  m-1 ">
          
           </div>
          
          </div>
        )
    }

export default Login;