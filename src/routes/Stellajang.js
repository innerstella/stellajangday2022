import { dbService } from "../fbase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Stellajang = () => {
  const navigate = useNavigate();
  // if (window.confirm("스텔라장입니까?")) {
  //   alert("생일축하합니다!");
  // } else {
  //   navigate(`/`);
  // }
  const checkStellajang = () => {
    let password = prompt("암호를 입력하세요");
    if (password === "stellastella1118") {
      alert("생일축하합니다!");
    } else {
      alert("초코쨈은 편지나 쓰세요.");
      navigate(`/`);
    }
  };

  const [messages, setMessages] = useState([]);
  const getMessages = async () => {
    const dbMessages = await dbService.collection("writers").get();
    dbMessages.forEach((doc) => {
      const messageObject = {
        ...doc.data(),
        id: doc.id,
        // text: doc.content,
        // writer: doc.author,
      };
      console.log(messageObject.author);
      console.log(messageObject.content);

      setMessages((prev) => [messageObject, ...prev]);
    });
  };

  useEffect(() => {
    checkStellajang();
    getMessages();
  }, []);

  // console.log(messages);
  return (
    <>
      <h2>스텔라장 페이지</h2>
      {messages.map((m) => (
        <div key={m.id}>
          <p>{m.content}</p>
          <p>{m.author}</p>
          <hr />
        </div>
      ))}
      <Link to="/">
        <button>Home</button>
      </Link>
    </>
  );
};

export default Stellajang;
