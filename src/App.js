import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import {BackgroundCarousel} from "./BackgroundCarousel"


const App = () => {

  const images = [
    "https://images.unsplash.com/photo-1490814525860-594e82bfd34a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjBhbmQlMjB3aGl0ZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1529432337323-223e988a90fb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YmxhY2slMjBhbmQlMjB3aGl0ZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1549281899-f75600a24107?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1557428894-56bcc97113fe?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG5ld3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  ]

    //---------- State vars ----------//
    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('')
    const [newBody, setNewBody] = useState('')
    const [newCategory, setNewCategory] = useState('')
    const [newPublishedDate, setNewPublishedDate] = useState('')
    const [newImage, setNewImage] = useState('')
    const [newArticleList, setNewArticleList] = useState([]);

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
          <div class='container'>
            <h1>Whenever O' Clock</h1>

            <form onSubmit={handleNewArticleSubmit}>
                New Title: <input type="text" onChange={handleNewTitleChange}/><br/>
                New Category: <input type="text" onChange={handleNewCategoryChange}/><br/>
                New Date: <input type="text" onChange={handleNewPublishedDateChange}/><br/>
                New Author: <input type="text" onChange={handleNewAuthorChange}/><br/>
                New Image: <input type="text" onChange={handleNewImageChange}/><br/>
                New Body: <input type="text" onChange={handleNewBodyChange}/><br/>
                <input type="submit" value="Create New Article"/>
            </form>


            <br/>
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
                            )
                        })


                : <h1>false</h1>}
                  </div>
                  </div>

        </>

    );
}

export default App;
