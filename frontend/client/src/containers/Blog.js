import React, { Component } from 'react';
import { BrowserRouter as Router, useLocation, useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useGetPostsQuery } from 'features/blogApi';


export const BlogPosts = () => { 
  
  const { 
    data:posts,
    isLoading,
    isSuccess,
    isError,
    error
   } = useGetPostsQuery()

  let content = []
  let len


  if (isLoading) {
    content = <h1>Loading...</h1>
    return ( content)
    
  } else if (isSuccess) {
    len = posts.length;
    

      for (let count = 0; count < len; count++) {


        content.push({id: posts[count].id,
                      author: posts[count].author,
                      author_name: posts[count].author_name,
                      title: posts[count].title,
                      slug: posts[count].slug,
                      category: posts[count].category,
                      excerpt: posts[count].excerpt, 
                      post: posts[count].post,
                      image: posts[count].image,
                      date: posts[count].date
                    })
        console.log(posts[count].image)
    }

  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  const renderItems = (props) => {
    const keys = Object.keys(content).length;
    let rendered = [];
    for (let cnt=0; cnt < keys; cnt++) {
      rendered.push(
        <div className="card mb-3" key={content[cnt].id}>
        <div className='card-header'><span className='badge text-bg-success'>Category: {content[cnt].category}</span></div>
        <img className="card-img-top" src={content[cnt].image} alt="Card image cap"/>
        <div className="card-body">
          <h2 className="card-title">{content[cnt].title}</h2>
          <p className="card-subtitle mb-2 text-muted">Posted by {content[cnt].author_name} on {content[cnt].date}</p>
          <p className="card-text">{content[cnt].excerpt}</p>
          <Link to={{pathname:`/detail/${content[cnt].slug}`}} className='btn btn-primary'>Read More</Link>
        </div>
      </div>
    );
    }
    return rendered;
  };

  
  return (
    <div className="row">
      
      <div className="col">
        <div className="p-3">
          <ul className="list-group list-group-flush">
          {renderItems()}

            </ul>
            </div>
            </div>
            </div>
    
  )
  }

export default BlogPosts;