import { dbService } from "../fbase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Bg = styled.img`
  width: 100vw;
  position: absolute;
  top: -6rem;
  left: 0;
  overflow-x: hidden;
`;

const Img = styled.img`
  width: 101vw;
  position: absolute;
  top: 5rem;
  z-index: 2;
  left: 0;
  overflow-x: hidden;
`;

const Desk = styled.div`
  height: 50vh;
  width: 80vw;
  overflow: scroll;
  z-index: 3;

  position: relative;
  top: 20rem;
  left: -0.3rem;
`;
const Letter = styled.div`
  background-color: rgb(231, 228, 223);
  font-family: "Middleschool_student";
  font-size: 1.5rem;
  margin: 0.5rem;
`;
const Content = styled.p`
  padding: 1rem;
  margin: 0;
`;

const ToMain = styled.button`
  font-family: "Middleschool_student";
  font-size: 1.5rem;
  color: black;
  position: relative;
  top: 23rem;
  z-index: 2;

  background-color: white;
  border: none;
  padding: 0.5rem 1rem;
`;
const Stellajang = () => {
  const [messages, setMessages] = useState([]);
  const getMessages = async () => {
    const dbMessages = await dbService.collection("writers").get();
    dbMessages.forEach((doc) => {
      const messageObject = {
        ...doc.data(),
        id: doc.id,
      };
      // console.log(messageObject.createdAt);

      setMessages((prev) => [messageObject, ...prev]);
    });
  };

  // console.log(messages);
  let msg = messages;
  msg.sort(function (a, b) {
    return b.createdAt - a.createdAt;
  });
  console.log(msg);

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <center>
        <Bg src="img/homebg.jpg" />
        <Img src="img/bg.png" />
        <Desk>
          {msg.map((m) => (
            <Letter key={m.id}>
              <Content>{m.content}</Content>
              <Content>- {m.author} -</Content>
            </Letter>
          ))}
        </Desk>
        <Link to="/">
          <ToMain>메인 화면</ToMain>
        </Link>
      </center>
    </>
  );
};

export default Stellajang;
