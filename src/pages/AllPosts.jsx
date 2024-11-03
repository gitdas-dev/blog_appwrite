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
    <div className="w-full py-4">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="flex flex-wrap justify-center align-middle sm:w-1/2 md:w-1/3 lg:w-1/4 gap-5">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
