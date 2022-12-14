import { Button } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import AddComment from "../components/AddComment/AddComment";
import CommentsList from "../components/CommentsList/CommentsList";
import classes from "../styles/Home.module.css";
import commentType from "../types/CommentType";
import CommentContext from "../store/Comments-Context";

const Home = () => {
  const [openAddComment, setOpen] = useState(false);
  const [comments, setComments] = useState<commentType[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // FALSE
  const ctx = useContext(CommentContext);

  useEffect(() => {
    setComments(ctx.onWaitComments);
    ctx.updateComments("onWait");
    ctx.updateComments("approved");
  }, [ctx.onWaitComments]);

  console.log(window.localStorage.getItem("isLoggedIn"));

  return (
    <div>
      <Head>
        <title>RedXMas</title>
        <link
          rel="icon"
          href="https://infinitygreece.com/wp-content/uploads/2018/08/red-logo-150x150.png"
        />
      </Head>

      <main className={classes.main}>
        <Image
          src="https://infinitygreece.com/wp-content/uploads/2018/08/red-logo-150x150.png"
          height={100}
          width={100}
          alt={"image"}
          className={classes.image}
        />
        <br />
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setOpen((prevState) => !prevState);
          }}
          className={classes.cardButton}
        >
          Προσθηκη Σχολιου
        </Button>
        <AddComment open={openAddComment} />
        {isLoggedIn && (
          <div>
            <h5 style={{ color: "black" }}>WAIT LIST</h5>
            <CommentsList admin={isLoggedIn} comments={comments} />
            <h5 style={{ color: "black" }}>APPROVED</h5>
          </div>
        )}

        <CommentsList admin={false} comments={ctx.approvedComments} />
      </main>

      <footer className={classes.footer}>
        <a
          href="https://infinitygreece.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Web Design/Develop Team <br />
          Powered by InfinityGreece
        </a>
      </footer>
    </div>
  );
};

export default Home;
