export class BlogPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            author: "",
            title: "",
            slug: "",
            category: "",
            excerpt: "",
            post: ""
          ,
          blogList: []
        };
    }
  
    
    async componentDidMount() {

        try {
          const res = await fetch('http://localhost:8000/api/blog/');
          const blogList = await res.json();
          this.setState({
            blogList
          });
        } catch (e) {
          console.log(e);
        }
        }
    


    renderItems = () => {
      const items = this.state.blogList;
      return items.map(item => (
      
      <div className="card mb-3" style={{width: '18 rem'}} key={item.id}>
      <img className="card-img-top" src="https://openclipart.org/image/800px/338458" alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text">{item.excerpt}</p>
        <Link to={{pathname:`/detail/${item.slug}`}} className='btn btn-primary'>Read More</Link>
      </div>
    </div>
    ));
      };
    
    render() {
      return (
        <div className="row">
          
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <ul className="list-group list-group-flush">
                {this.renderItems()}
                </ul>
                </div>
                </div>
                </div>
        
      )
      };
    }


export default BlogPosts;