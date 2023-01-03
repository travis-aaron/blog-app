import { Helmet } from 'react-helmet';
import Navbar from 'components/Navbar';

const Layout = ({title, contents, children}) => (
    <>
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={contents} />
        </Helmet>
        <Navbar />      
    <div className="container mt-5">
        {children}
    </div>
    </>
)

export default Layout;