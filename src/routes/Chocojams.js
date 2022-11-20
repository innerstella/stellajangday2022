import React from "react";
import { Link } from "react-router-dom";
import { dbService } from "../fbase";
import { useState, useEffect } from "react";
import styled from "styled-components";

const url = "img/homebg.jpg";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  background-image: url(${url});
  background-repeat: no-repeat;
  background-origin: padding-box;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0rem;
  width: 100vw;
  overflow-x: hidden;
  background-color: rgb(240, 234, 226);
`;

const TitleText = styled.p`
  font-size: 4rem;
  font-family: "Middleschool_student";
  font-weight: 600;
  color: black;
  margin: 2vh;
`;

const Dday = styled.p`
  font-size: 3rem;
  font-family: "Middleschool_student";
  color: black;

  position: relative;
  margin: 0;
  top: 1rem;
`;

const Count = styled.p`
  font-size: 2rem;
  font-family: "Middleschool_student";
  color: black;
  margin 0;
`;
const Copyright = styled.p`
  font-size: 1rem;
  font-family: "Middleschool_student";
  color: black;

  position: relative;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Stella = styled.img`
  position: relative;
  width: 60vw;
  top: 40vh;
`;

const WriteText = styled.p`
  font-size: 3.5rem;
  font-family: "Middleschool_student";
  font-weight: 500;

  color: black;
  width: 100vw;

  position: absolute;
  bottom: 0px;

  background-color: rgb(103, 150, 186);
  margin: 0;
  padding-top: 5vh;
  padding-bottom: 5vh;

  z-index: 2;

  &:hover {
    cursor: pointer;
    background-color: rgb(80, 150, 186);
  }
`;

const Chocojams = () => {
  const [num, setNum] = useState("loading...");
  const num_arr = [];
  const getNums = async () => {
    const dbMessages = await dbService.collection("writers").get();
    // console.log(dbMessages);
    dbMessages.forEach((doc) => {
      const messageObject = {
        ...doc.data(),
        id: doc.id,
      };
      console.log(messageObject.author);
      console.log(messageObject.content);
      num_arr.push(messageObject.content);
      console.log(num_arr);
    });
    setNum(num_arr.length);
  };

  useEffect(() => {
    getNums();
  }, []);

  const today = new Date();
  const date = today.getDate();
  const dDay = 18 - date;
  console.log(dDay);

  return (
    <>
      <Container>
        <center>
          <Wrapper>
            <Dday>D - {dDay > 0 ? dDay : "DAY"} </Dday>
            <TitleText>2022 스장 데이</TitleText>

            <Count>쌓인 편지 수 : {num}</Count>
            <Copyright>문의사항 @little__tomato_</Copyright>
          </Wrapper>
          {/* <Link to="/write"> */}
          <WriteText>편지 배달 중 ...</WriteText>
          {/* </Link> */}
          <Stella alt="stellajang" src="img/sj1.png" />
        </center>
      </Container>
    </>
  );
};

export default Chocojams;
