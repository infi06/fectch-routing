// Write your JS code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'
import './index.css'

class BlogList extends Component {
  state = {isLoader: true, blogsData: []}

  componentDidMount() {
    this.getBlogList()
  }

  getBlogList = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()

    const formatBlog = data.map(eachdata => ({
      id: eachdata.id,
      title: eachdata.title,
      imageUrl: eachdata.image_url,
      avatarUrl: eachdata.avatarUrl,
      author: eachdata.author,
      topic: eachdata.topic,
    }))
    this.setState({blogsData: formatBlog, isLoader: false})
  }

  render() {
    const {blogsData, isLoader} = this.state
    console.log(isLoader)

    return (
      <div className="blog-list-container">
        {isLoader ? (
          <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
        ) : (
          blogsData.map(each => <BlogItem blogData={each} key={each.id} />)
        )}
      </div>
    )
  }
}

export default BlogList
