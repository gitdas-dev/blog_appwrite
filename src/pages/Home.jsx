import React, { useEffect, useState } from "react";
import service from "../Appwrite/conf";
import { Button, Container, PostCard } from "../components";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state?.auth?.status);
  const navigate = useNavigate()


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

  if(!authStatus){
    return (
      <div className="w-full h-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full my-64">
              <h1 className="text-lg md:text-2xl text-white font-bold font-mono">
                Login to read and post blogs. <Link to={'/login'}><Button className="font-mono text-md md:text-lg">Log in</Button></Link>
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
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10">
        {posts.map((post) => (
          <div key={post.$id}>
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </Container>
  </div>
  );
}

export default Home;
