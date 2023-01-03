import Layout from "components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { resetRegistered, login } from "features/user";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";


const LoginPage = () => {


    const dispatch = useDispatch();
    const { loading, isAuthenticated, registered } = useSelector(state => state.user);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        if (registered)
            dispatch(resetRegistered()); 
    });


    const { username, password} = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const onSubmit = e => {
         e.preventDefault();
        
        dispatch(login({username, password}));
        
    };

    if (isAuthenticated && !loading )
        return <Navigate to='/'/>;

    return (            
        <Layout title="Login" content='Login page'>
            <h1>Login</h1>
            <form className="mt-5" onSubmit={onSubmit}>

                <div className="form-group">
                    <label className='form-label' htmlFor='username'>Username</label>
                    <input
                        className="form-control"
                        type='text'
                        name='username'
                        onChange={onChange}
                        value={username}
                        required
                    />
                </div>

                <div className="form-group mt-3">
                    <label className='form-label' htmlFor='password'>Password</label>
                    <input
                        className="form-control"
                        type='password'
                        name='password'
                        onChange={onChange}
                        value={password}
                        required
                    />
                </div>
                    <button className="btn btn-primary mt-4">
                    Login
                 </button>

            </form>        
            </Layout>
    );
}

export default LoginPage;