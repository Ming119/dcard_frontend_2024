import { toast } from "react-toastify";
import { useRef, useState } from "react";
import { redirect } from "next/navigation";
import { createPost } from "@/actions/createPost";

export const CreatePostForm = ({ accessToken }: { accessToken: string }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const [titleError, setTitleError] = useState<string | null>(null);
  const [bodyError, setBodyError] = useState<string | null>(null);

  const submitHandler = async (formData: FormData) => {
    // input validation
    const title = titleRef.current?.value;
    const body = bodyRef.current?.value;

    if (title === "") {
      setTitleError("Title is required");
      return;
    } else {
      setTitleError(null);
    }

    // count the number of words in the body, instead of characters
    if (!body || body?.split(" ").filter((word) => word !== "").length! < 30) {
      setBodyError("Body must be at least 30 words long");
      return;
    } else {
      setBodyError(null);
    }

    const response = await createPost(formData);
    if (response.status === "success") {
      toast.success(response.message as string);
      redirect("/");
    } else {
      toast.error(response.message as string);
    }
  };

  return (
    <form action={submitHandler} className="mx-20">
      <input type="hidden" name="accessToken" value={accessToken} />

      <div className="my-2">
        <div className="flex">
          <label
            htmlFor="title"
            className="mb-2 text-sm font-medium text-gray-900"
          >
            Title
          </label>
          <p className="text-red-700 text-sm font-medium mx-2">{titleError}</p>
        </div>
        <input
          ref={titleRef}
          type="text"
          id="title"
          name="title"
          className="form-input p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg"
        />
      </div>

      <div className="my-2">
        <div className="flex">
          <label
            htmlFor="body"
            className="mb-2 text-sm font-medium text-gray-900"
          >
            Contents
          </label>
          <p className="text-red-700 text-sm font-medium mx-2">{bodyError}</p>
        </div>
        <textarea
          ref={bodyRef}
          id="body"
          name="body"
          rows={8}
          placeholder="Write your thoughts here..."
          className="form-textare p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg"
        />
      </div>

      <button
        type="submit"
        className="my-2 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
      >
        Publish post
      </button>
    </form>
  );
};

export default CreatePostForm;
