import { useState } from "react";
import Layout from "components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { register } from "features/user";

const RegisterPage = () => {

    const dispatch = useDispatch();

    const { registered, loading } = useSelector(state => state.user);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
    });

    const { first_name, last_name, username, email, password} = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const onSubmit = e => {
         e.preventDefault();
        
        dispatch(register({first_name, last_name, username, email, password}));
    };

    if (registered) return <Navigate to='/login' />;
    return (
        <Layout title="Register" content='Register for a new account'>
            <h1>Register for an account</h1>
            <form className="mt-5" onSubmit={onSubmit}>
                <div className="form-group">
                    <label className='form-label' htmlFor='first_name'>First Name</label>
                    <input
                        className="form-control"
                        type='text'
                        name='first_name'
                        onChange={onChange}
                        value={first_name}
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    <label className='form-label' htmlFor='last_name'>Last Name</label>
                    <input
                        className="form-control"
                        type='text'
                        name='last_name'
                        onChange={onChange}
                        value={last_name}
                        required
                    />
                </div>
                <div className="form-group mt-3">
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
                    <label className='form-label' htmlFor='email'>Email</label>
                    <input
                        className="form-control"
                        type='email'
                        name='email'
                        onChange={onChange}
                        value={email}
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
                {loading ? (
                    <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                    <button className="btn btn-primary mt-4">
                    Register 
                 </button>
                )}

            </form>
        </Layout>
    );
};

export default RegisterPage;