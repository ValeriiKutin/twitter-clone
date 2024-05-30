"use client";

import { db } from "@/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Comment from "./Comment";

const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [db, id]);
  console.log(comments);
  console.log(id);
  return (
    <div>
      {comments.map((comment) => {
        console.log("comment: ", comment);
        console.log("comment.data(): ", comment.data());
        return (
          <Comment key={comment.id} comment={comment.data()} id={comment.id} />
        );
      })}
    </div>
  );
};

export default Comments;
