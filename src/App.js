import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import './App.css';
import Post from './Post';

function App() {
  const [posts, setPosts] = useState([
    // {
    //   username: "_cpp.freak",
    //   caption: "wow, what a wonderful day!",
    //   imgUrl: "https://instagram.fdel14-1.fna.fbcdn.net/v/t51.2885-15/e35/139032453_415799799736695_5678314497763823084_n.jpg?_nc_ht=instagram.fdel14-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=1qSD2-y6AJAAX8fKzje&tp=1&oh=c205a7bcadc6161be8d27feabbd1ec9d&oe=602A3843"
    // },
    // {
    //   username: "yes.m.kidding",
    //   caption: "Yeyy!",
    //   imgUrl: "https://instagram.fdel14-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/138373604_246805037065306_188224987130662923_n.jpg?_nc_ht=instagram.fdel14-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=TFrEgXFUIh0AX_UkidQ&tp=1&oh=1d502c1034f7f220e7e0270812f565fb&oe=6029E5ED"
    // },
    // {
    //   username: "cristiano",
    //   caption: "Dance Monkey",
    //   imgUrl : "https://instagram.fdel14-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/139007295_385971849365545_4232716593292261022_n.jpg?_nc_ht=instagram.fdel14-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=_gdoFdE94IUAX-QsDJC&tp=1&oh=9253bb04c0c60f0d3bd8f0b64ca295c5&oe=602A6E21"
    // }
  ]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    });
  }, []);

  return (
    <div className="app">
      <div className="app__header">
        <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
      </div>
      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imgUrl={post.imgUrl} />
        ))
      }
    </div>
  );
}

export default App;