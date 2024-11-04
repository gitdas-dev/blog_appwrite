import React, { useEffect, useState } from "react";
import service from "../Appwrite/conf";
import { Container, PostCard } from "../components";
import { CircularProgress } from "@mui/material";
function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-black">
                <div className="h-full rounded-md bg-black p-4 m-4 overflow-hidden flex flex-col justify-between align-center">
                  <div className="w-full justify-center align-center mb-36">
                    <div className="w-60 h-40"></div>

                    <CircularProgress />
                  </div>
                  <h2 className="font-semibold font-mono mb-3"></h2>
                </div>
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full h-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl text-black font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="py-4 text-center flex justify-center align-center mb-20 h-full">
      <Container>
        <div className="flex flex-wrap justify-center md:justify-start align-center gap-y-10">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="w-1/1 sm:w-1/2 md:w-1/3 lg:w-1/5 xl:1/5 h-72 mb-5"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
