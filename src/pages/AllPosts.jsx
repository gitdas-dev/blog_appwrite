import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import service from "../Appwrite/conf";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className='py-4 text-center flex justify-center align-center mb-20 h-full'>
        <Container>
            <div className='flex flex-wrap justify-center md:justify-start align-center gap-y-10'>
                {posts.map((post) => (
                    <div key={post.$id} className='w-1/1 md:w-1/3 lg:w-1/4 xl:1/5 h-72 mb-5'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  );
}

export default AllPosts;
