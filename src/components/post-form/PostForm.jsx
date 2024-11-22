import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import service from "../../Appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineLoading } from "react-icons/ai";

export default function PostForm({ post }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setLoading(true);
    if (post) {
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;

      if (file) {
        service.deletFile(post.featuredImage);
      }

      const dbPost = await service.updatePost(post?.$id, {
        ...data,
        featuredImage: file ? file?.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await service.uploadFile(data.image[0]);

      if (file) {
        const fileId = file?.$id;
        data.featuredImage = fileId;
        const dbPost = await service.createPost({
          ...data,
          userId: userData?.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost?.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="">
      <div className="bg-slate-400 sm:p-5 p-2 max-w-[700px] rounded-xl mx-auto font-mono">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-2 bg-slate-400 font-mono"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <p className="text-red-800">* Please provide a title</p>
        )}
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4 bg-slate-400 font-mono"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="px-2 max-w-[715px] mx-auto">
        {post && (
          <div className="w-full mb-4 mt-10 mx-auto text-center">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg mx-auto"
            />
          </div>
        )}
        <Input
          label="Featured Image :"
          type="file"
          className=" bg-slate-400 font-mono"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {errors.image && (
          <p className="text-red-800 mt-2 font-mono">
            * Please upload an image
          </p>
        )}
        <Input
          label="author :"
          type="text"
          className=" bg-slate-400 font-mono"
          {...register("author")}
          placeholder="Enter author name...(leave blank for anonymous post"
        />
        {errors.author && (
          <p className="text-red-800 mt-2 font-mono">
            * Please provide author's name
          </p>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4 bg-slate-400 font-mono"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full text-center flex items-center justify-center mt-2 font-mono"
        >
          {loading ? (
            <AiOutlineLoading className="h-7 w-7 animate-spin text-center" />
          ) : post ? (
            "Update"
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </form>
  );
}
