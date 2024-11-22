import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import service from "../Appwrite/conf";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function EditPost() {
  const [post, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
          setLoading(false);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

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
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
