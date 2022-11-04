import { useState, React } from "react";
import { Link } from "react-router-dom";
import { dbService } from "../fbase";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Background = styled.div`
  background-color: rgb(240, 234, 226);
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`;

const TitleText = styled.p`
  font-size: 2rem;
  font-family: "Middleschool_student";
  font-weight: 600;
  font-size: 1.5rem;
`;
const Unordered = styled.ol`
  display: flex;
  flex-direction: column;
  width: 65vw;

  position: relative;
`;
const List = styled.li`
  font-size: 1rem;
  font-family: "Middleschool_student";
  font-weight: 500;

  text-align: left;
`;

const Form = styled.form`
  padding-top: 2rem;
`;
const To = styled.label`
  font-size: 2rem;
  font-family: "Middleschool_student";
  font-weight: 600;
  margin-bottom: 1rem;
  margin-right: 1rem;

  position: relative;
  left: -5.5rem;
`;
const ToInput = styled.textarea`
  font-size: 1.5rem;
  font-family: "Middleschool_student";
  font-weight: 500;
  width: 80%;
  height: 17vh;
  border: none;
  background-color: rgb(250, 247, 243);

  margin-top: 1rem;
  text-align: left;
`;

const From = styled.label`
  font-size: 2rem;
  font-family: "Middleschool_student";
  font-weight: 600;
  margin-bottom: 1rem;
  margin-right: 1rem;

  position: relative;
  left: 2.5rem;
`;
const FromInput = styled.input`
  font-size: 2rem;
  font-family: "Middleschool_student";
  font-weight: 500;
  width: 40vw;
  height: 3.5vh;
  border: none;
  background-color: rgb(250, 247, 243);
  margin-top: 1rem;

  position: relative;
  left: 3rem;
`;

const Stella = styled.img`
  position: absolute;
  width: 45vw;
  bottom: 0.9vh;
  z-index: 2;
`;
const BackBtn = styled.p`
  font-size: 2rem;
  font-family: "Middleschool_student";
  font-weight: 600;

  position: absolute;
  bottom: 10vh;
  left: 4vw;
`;

const WriteText = styled.input`
  font-size: 3.5rem;
  font-family: "Middleschool_student";
  font-weight: 500;

  color: black;
  width: 100vw;

  position: absolute;
  bottom: 0px;
  left: 0%;

  background-color: rgb(160, 128, 84);
  margin: 0;
  padding-top: 2vh;
  padding-bottom: 2vh;
  border: 1.5px solid black;

  z-index: 2;

  &:hover {
    cursor: pointer;
  }
`;

const Write = () => {
  const [message, setMessage] = useState("");
  const [writer, setWriter] = useState("");

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    dbService.collection("writers").add({
      content: message,
      author: writer,
      createdAt: Date.now(),
    });
    setMessage("");
    setWriter("");
    navigate(-1);
  };

  const onMessageChange = (e) => {
    const {
      target: { value },
    } = e;
    console.log(e.target.value);
    setMessage(value);
  };

  const onWriterChange = (e) => {
    const {
      target: { value },
    } = e;
    setWriter(value);
    console.log(e.target.value);
  };
  return (
    <Background>
      <center>
        <div>
          <TitleText>📢 편지 쓰기 전에 꼭 읽어주세요! 📢</TitleText>
          <Unordered>
            <List>작성해주신 편지는 스장님만 읽을 수 있어요. </List>
            <List>예쁜 말, 고운 말로 생일을 축하해주세요.</List>
            <List>
              편지를 보낸 후 수정 및 삭제할 수 없어요. 신중히 작성해주세요!
            </List>
          </Unordered>

          <hr />

          <Form onSubmit={onSubmit}>
            <To htmlFor="to">To. 스텔라장</To>
            <ToInput
              id="to"
              onChange={onMessageChange}
              value={message}
              required
              maxLength={400}
            />
            <br />
            <From htmlFor="from">From</From>
            <FromInput
              id="from"
              value={writer}
              onChange={onWriterChange}
              type="text"
              maxLength={15}
              required
            />
            <br />
            <Link to="/" style={{ textDecorationLine: "none", color: "black" }}>
              <BackBtn>뒤로 가기</BackBtn>
            </Link>
            <WriteText type="submit" value="편지 보내기" />
          </Form>
        </div>
        <br />
        <Stella alt="stella" src="img/sj2.png" />
      </center>
    </Background>
  );
};

export default Write;
