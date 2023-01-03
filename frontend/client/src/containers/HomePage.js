import Layout from "components/Layout";
import BlogPosts from "./Blog";
import { useGetPostsQuery } from "features/blogApi";

const HomePage = () => {
    
    return (
        <Layout title='Home' content='Home page'>
            <BlogPosts />

        </Layout>
    )
}

export default HomePage;