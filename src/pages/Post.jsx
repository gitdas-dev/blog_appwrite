import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../Appwrite/conf";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AiOutlineLoading } from "react-icons/ai";
import { CircularProgress } from "@mui/material";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postloading, setPostLoading] = useState(false);

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    setPostLoading(true);
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          setPostLoading(false);
        } else {
          navigate("/");
        }
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    setLoading(true);
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deletFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  if (postloading) {
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
        <div className="flex justify-center mb-4 relative border rounded-xl h-[400px] lg:w-[800px] mx-auto">
          <img
            src={service.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl max-h-[600px] w-full object-cover"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500"
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6 md:px-16 lg:px-48">
          <h1 className="text-2xl font-bold text-white">{post.title}</h1>
          <h2 className="text-sm text-white">
            Author: {post.author ? post.author : "anonymous"}
          </h2>
        </div>
        <div className="browser-css text-white md:px-16 lg:px-48">
          {parse(post.content)}
        </div>
      </Container>
      <Dialog
        open={openDialog}
        onOpenChange={() => setOpenDialog(false)}
        className="bg-slate-400"
      >
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className="h-[120px] w-[300px] bg-transparent">
          <DialogHeader>
            <DialogTitle className="text-center text-white">
              Are you sure?
            </DialogTitle>
            <DialogDescription className="flex items-center justify-center">
              <Button
                bgColor="bg-red-500"
                className="mt-4"
                onClick={deletePost}
              >
                {loading ? (
                  <AiOutlineLoading className="h-7 w-7 animate-spin text-center" />
                ) : (
                  "Yes"
                )}
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  ) : null;
}
