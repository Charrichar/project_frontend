import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"

const App = () => {
    //---------- State vars ----------//
    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('')
    const [newBody, setNewBody] = useState('')
    const [newCategory, setNewCategory] = useState('')
    const [newPublishedDate, setNewPublishedDate] = useState('')
    const [newImage, setNewImage] = useState('')
    const [newArticleList, setNewArticleList] = useState([]);

    const [authenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState('');

    useEffect(()=>{
        axios
            .get('http://localhost:3003/news')
            .then((response)=>{
                setNewArticleList(response.data);
            })
    }, []);


    //---------- Create ----------//
    const handleNewTitleChange = (event) =>{
        setNewTitle(event.target.value);
    };

    const handleNewBodyChange = (event) =>{
        setNewBody(event.target.value);
    };

    const handleNewCategoryChange = (event) =>{
        setNewCategory(event.target.value);
    };

    const handleNewAuthorChange = (event) =>{
        setNewAuthor(event.target.value);
    };

    const handleNewImageChange = (event) =>{
        setNewImage(event.target.value);
    };

    const handleNewPublishedDateChange = (event) =>{
        setNewPublishedDate(event.target.value);
    };



    const handleNewArticleSubmit = (event) =>{
        event.preventDefault();
        axios.post(
            'http://localhost:3003/news',
            {
                title: newTitle,
                author: newAuthor,
                category: newCategory,
                publishedDate: newPublishedDate,
                body: newBody,
                image: newImage
            }
        ).then(()=>{
            axios
                .get('http://localhost:3003/news')
                .then((response)=>{
                    setNewArticleList(response.data);
                });
        });
    };

    //---------- Delete ----------//
    const handleDelete = (article)=>{
        axios
            .delete(`http://localhost:3003/news/${article._id}`)
            .then(()=>{
                axios
                    .get('http://localhost:3003/news')
                    .then((response)=>{
                        setNewArticleList(response.data)
                    })
            })
    }


    //---------- Edit ----------//
    const handleEdit = (article)=>{
        axios
            .put(
                `http://localhost:3003/news/${article._id}`,
                {
                    title: newTitle,
                    author: newAuthor,
                    body: newBody,
                    category: newCategory,
                    image: newImage
                }
            ).then(()=>{
                axios
                    .get('http://localhost:3003/news')
                    .then((response)=>{
                        setNewArticleList(response.data)
                    })
            })
    }

    return(
        <>
          {authenticated && <div>Logged in</div>}
          <div class='container'>
          <div class='page-top'>
            <h1>Whenever O' Clock</h1>
            {authenticated &&
            <form onSubmit={handleNewArticleSubmit}>
                New Title: <input type="text" onChange={handleNewTitleChange}/><br/>
                New Category: <input type="text" onChange={handleNewCategoryChange}/><br/>
                New Date: <input type="text" onChange={handleNewPublishedDateChange}/><br/>
                New Author: <input type="text" onChange={handleNewAuthorChange}/><br/>
                New Image: <input type="text" onChange={handleNewImageChange}/><br/>
                New Body: <input type="text" onChange={handleNewBodyChange}/><br/>
                <input type="submit" value="Create New Article"/>
            </form>
            }
            <br/>

            <div>
              <Login setAuth={setAuthenticated} setToken={setToken}/>
              <Signup setAuth={setAuthenticated} setToken={setToken}/>
            </div>
            <div class='App'>
    <Slider {...settings}>
    {newArticleList.map((image) => {
    return(
      <div>
      <img src ={image.image}/>
      </div>
    )
    })}
    </Slider>
    </div>

            </div>

            <br/>

            <h2>Articles</h2>


            <div class="article-container">
            {newArticleList.length > 0 ?
                        newArticleList.map((article) => {
                            return(
                                    <div class="article">
                                      <h1 class= "title">{article.title}</h1>
                                      <img src={article.image} alt=''/>
                                      <h3 class= "author">{article.author}</h3>
                                      <h6 class="date">{article.publishedDate}</h6>
                                      <p class="body">{article.body}</p>
                                      {authenticated &&
                                        <div>
                                          <button class="delete" onClick={(event)=>{handleDelete(article)}}>delete
                                          </button>
                                          <details>
                                            <summary>
                                                Edit Article
                                            </summary>
                                            <form onSubmit={()=>{handleEdit(article)}}>
                                                Title: <input type="text" onChange={handleNewTitleChange}/><br/>
                                                Category: <input type="text" onChange={handleNewCategoryChange}/><br/>
                                                Date: <input type="text" onChange={handleNewPublishedDateChange}/><br/>
                                                Author: <input type="text" onChange={handleNewAuthorChange}/><br/>
                                                Body: <input type="text" onChange={handleNewBodyChange}/><br/>
                                                Image: <input type='text' onChange={handleNewImageChange}/>
                                                <input class="button" type="submit" value="Save Change"/>
                                            </form>
                                          </details>
                                        </div>
                                      }

                                    </div>
                            )
                        })
                : <h1>false</h1>}
                  </div>
            </div>
        </>
    );
}

export default App;
