"use client";

import {
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
  HiHeart,
} from "react-icons/hi";
import { signIn, useSession } from "next-auth/react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";

const Icons = ({ id, uid }) => {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const likePost = async () => {
    if (session) {
      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
        username: session.user.username,
        timestamp: serverTimestamp(),
      });
    } else {
      signIn();
    }
  };
  const unLikePost = async () => {
    await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
  };

  const deletePost = async () => {
    if (session?.user?.uid === uid) {
      if (window.confirm("Are you sure you want to delete this post?")) {
        await deleteDoc(doc(db, "posts", id))
          .then(() => {
            console.log("Document successfully deleted");
            location.reload();
          })
          .catch((error) => {
            console.error("Error removing document: ", error);
          });
      }
    } else {
      alert("You are not authorized to delete this post");
    }
  };

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db]);

  useEffect(() => {
    setIsLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  console.log(likes);
  return (
    <div className="flex justify-start gap-5 p-2 text-gray-500">
      <HiOutlineChat className="h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100" />
      <div className="flex items-center">
        {isLiked ? (
          <HiHeart
            onClick={unLikePost}
            className="h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100 text-red-600"
          />
        ) : (
          <HiOutlineHeart
            onClick={likePost}
            className="h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
          />
        )}
        {likes.length > 0 && (
          <span className={`text-xs ${isLiked && "text-red-600"}`}>
            {likes.length}
          </span>
        )}
      </div>
      {session?.user?.uid === uid && (
        <HiOutlineTrash
          className="h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
          onClick={deletePost}
        />
      )}
    </div>
  );
};

export default Icons;
