import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { app, db } from "../firebase";
import Post from "./Post";

const Feed = async () => {
  const queryPosts = query(
    collection(db, "posts"),
    orderBy("timestamp", "desc")
  );
  const querySnapshot = await getDocs(queryPosts);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  console.log(data);
  return (
    <div>
      {data.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
