import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


const DetailSection = styled.section`
  display: flex;
  background-color: #f9f9f9;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  /* flex-direction: column; */
  /* align-items: flex-start; */
`;

const PostContainer = styled.div`
  background-color: white;
  justify-content: center;
  align-items: center;
  width: 100vh;
  height: 60vh;
  padding: 36px;
  box-shadow: 2px 4px 4px rgba(152, 221, 227, 0.25);
  border-radius: 25px;
`;

const DetailTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 16px;
  font-weight: 500;
  margin: 0 0 20px 0;
`;

const DetailInfo = styled.div`
  font-size: 15px;
`;

const DDayText = styled.span`
  font-size: 12px; 
  font-weight: 500;
  color: #AAAAAA;
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #98DDE3;
  margin: 20px 0;
`;

const DetailContent = styled.div`
  font-size: 16px;
  overflow: auto;
  height: 35vh;
  /* border: 1px solid blue; */
`;

// const DetSection = styled.section`
//   align-content: space-around;

// `

const CategoryCircle = styled.span<{ color: string }>`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${(props) => props.color};
`;

const PostButton = styled(Link)`
  width: 62px;
  height: 44px;
  background: #98DDE3;
  border-radius: 12px;
  border: none; 
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  display: flex;
  text-decoration: none;
`;

const CancelButton = styled(Link)`
  width: 62px;
  height: 44px;
  background: #EEA9A9;
  border-radius: 12px;
  border: none; 
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  display: flex;
  text-decoration: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 12px;
  gap: 12px;
  justify-content: flex-end;
  width: 100%;
  
`;

type PlanPostData = {
  title: string;
  value: string;
  startDate: string;
  endDate: string;
  content: string;
};

// 더미데이터
const dummyPlanData: PlanPostData = {
  title: '속초 여행',
  value: '1',
  startDate: '2023-07-20',
  endDate: '2023-07-23',
  content: '💫 여행루트옥계휴게소 – 설악대교&금강대교 – 동명항 대게거리 – 영금정 – 속초등대전망대 – 설악산 – 낙산사',
  // content: '강렬한 신인, 강력한 데뷔작 주인공의 불안감에서 시작한 심리 서스펜스는 사건이 전개되면서 가정 스릴러로서의 모습을 드러낸다. 처음에는 미스터리의 기본적인 재미(대체 마당에 묻힌 것은 무엇이고, 누가 어떤 사실을 숨기고 있는가)에 충실히 따르면서 읽기를 재촉하는데, 이야기의 형태가 분명해지고 작가가 말하고자 하는 것이 선명하게 드러나면서 이 몰입감은 더욱 높아진다. 『마당이 있는 집』의 재미를 풍족하게 만드는 것은 이 지점이다. 두 주인공의 집에서 무슨 일이 벌어졌는가 하는 궁금증을 풀어나가는 과정에는 우리가 살고 있는 사회, 우리가 사는 모습이 그대로 담겨 있다. 그리고 그 중심에 주란과 상은이 있다. 같은 나라 같은 사회에서만 공감할 수 있는 생생한 지역성과 특수성이 살아 있다. 호기심을 자극하는 도입부 두 주인공을 화자로 한 교차 서술, 관련 없는 사건과 사실들이 절묘하게 맞아떨어지는 구성, 현재 사회를 반영하고 있는 현실감 넘치는 캐릭터와 공감할 수밖에 없는 상황들, 스토리의 구조를 탄탄하게 받치고 있는 세부 장치까지, 『마당이 있는 집』은 노련한 중견 작가의 손에서 탄생한 것 같은 작품이다. 다 읽고 나면 이 작품이 정말 소설 집필 경험이 없는 작가의 첫 작품인가 놀라는 동시에 곧장 다음 작품을 기대하게 만든다.행복한 일상을 의심하기 시작한 여자와 불행한 일상을 탈출하기 위해 분투하는 두 여자의 삶이 교차하며 변해가는 과정을 그린 소설. 김진영 작가의 데뷔작으로, 본디 단편 영화를 만들며 시나리오 작업에 몰두하던 그는 원천 스토리로서의 소설에 관심을 갖고 2016년 한국콘텐츠진흥원 스토리창작과정에 지원하여 작품을 완성했다. 소설 창작 경험이 거의 없지만 흡입력 있는 설정과 뛰어난 스토리 구성으로 이 과정에 참여한 심사자들의 찬사를 한몸에 받았다. 의사 남편에 똑똑하고 잘생긴 아들, 모자랄 것 없는 풍족한 가정. 주란의 가족은 누구나 꿈꾸는 완벽한 집으로 이사한다. 주란은 이 행복한 가정 속에서 완벽한 아내이자 주부, 어머니로서 행복을 누리며 산다. 단 한 가지 신경을 거스르는 것은 마당에서 나는 냄새. 남편은 금방 사라질 거름 냄새로 치부하지만 예쁜 수채화에 찍힌 기름 얼룩처럼 좀처럼 머릿속에서 지워지지 않는다. 별것 아닌 것 같았던 이 불안감은 조금씩 커져, 완벽한 것 같았던 남편의 행동들도 하나씩 수상쩍게 느껴지기 시작한다. 남편은 살인자인가?강렬한 신인, 강력한 데뷔작 주인공의 불안감에서 시작한 심리 서스펜스는 사건이 전개되면서 가정 스릴러로서의 모습을 드러낸다. 처음에는 미스터리의 기본적인 재미(대체 마당에 묻힌 것은 무엇이고, 누가 어떤 사실을 숨기고 있는가)에 충실히 따르면서 읽기를 재촉하는데, 이야기의 형태가 분명해지고 작가가 말하고자 하는 것이 선명하게 드러나면서 이 몰입감은 더욱 높아진다. 『마당이 있는 집』의 재미를 풍족하게 만드는 것은 이 지점이다. 두 주인공의 집에서 무슨 일이 벌어졌는가 하는 궁금증을 풀어나가는 과정에는 우리가 살고 있는 사회, 우리가 사는 모습이 그대로 담겨 있다. 그리고 그 중심에 주란과 상은이 있다. 같은 나라 같은 사회에서만 공감할 수 있는 생생한 지역성과 특수성이 살아 있다. 호기심을 자극하는 도입부 두 주인공을 화자로 한 교차 서술, 관련 없는 사건과 사실들이 절묘하게 맞아떨어지는 구성, 현재 사회를 반영하고 있는 현실감 넘치는 캐릭터와 공감할 수밖에 없는 상황들, 스토리의 구조를 탄탄하게 받치고 있는 세부 장치까지, 『마당이 있는 집』은 노련한 중견 작가의 손에서 탄생한 것 같은 작품이다. 다 읽고 나면 이 작품이 정말 소설 집필 경험이 없는 작가의 첫 작품인가 놀라는 동시에 곧장 다음 작품을 기대하게 만든다.행복한 일상을 의심하기 시작한 여자와 불행한 일상을 탈출하기 위해 분투하는 두 여자의 삶이 교차하며 변해가는 과정을 그린 소설. 김진영 작가의 데뷔작으로, 본디 단편 영화를 만들며 시나리오 작업에 몰두하던 그는 원천 스토리로서의 소설에 관심을 갖고 2016년 한국콘텐츠진흥원 스토리창작과정에 지원하여 작품을 완성했다. 소설 창작 경험이 거의 없지만 흡입력 있는 설정과 뛰어난 스토리 구성으로 이 과정에 참여한 심사자들의 찬사를 한몸에 받았다. 의사 남편에 똑똑하고 잘생긴 아들, 모자랄 것 없는 풍족한 가정. 주란의 가족은 누구나 꿈꾸는 완벽한 집으로 이사한다. 주란은 이 행복한 가정 속에서 완벽한 아내이자 주부, 어머니로서 행복을 누리며 산다. 단 한 가지 신경을 거스르는 것은 마당에서 나는 냄새. 남편은 금방 사라질 거름 냄새로 치부하지만 예쁜 수채화에 찍힌 기름 얼룩처럼 좀처럼 머릿속에서 지워지지 않는다. 별것 아닌 것 같았던 이 불안감은 조금씩 커져, 완벽한 것 같았던 남편의 행동들도 하나씩 수상쩍게 느껴지기 시작한다. 남편은 살인자인가?',
};

function calculateDDay(startDate: string): string {
  const formattedStartDate = new Date(startDate);
  const today = new Date();

  const diffTime = Math.ceil((formattedStartDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const dDayText = diffTime > 0 ? `D-${diffTime}` : 'D-Day';

  return dDayText;
}

const categories = [
  { value: '1', label: '당일치기', color: '#99FFB6' },
  { value: '2', label: '여행', color: '#FEFFCA' },
  { value: '3', label: '일상', color: '#FFD0D0' },
  { value: '4', label: '회사', color: '#DBCAFF' },

];


function PlanDetail() {
  const [planData, setPlanData] = useState<PlanPostData | null>(null);
  const { id } = useParams<{ id: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // 추가


  useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`/plan/${id}`);
  //       setPlanData(response.data);
  //       // 가져온 데이터의 value 값(카테고리)을 selectedCategory로 설정합니다.
  //       setSelectedCategory(response.data.value);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, [id]);
  // 더미데이터를 사용합니다.
    setPlanData(dummyPlanData);
  }, [id]);


  if (!planData) {
    return <div>Loading...</div>;
  }

  const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formatter = new Intl.DateTimeFormat('ko-KR', dateOptions);
  const formattedStartDate = formatter.format(new Date(planData.startDate));
  const formattedEndDate = formatter.format(new Date(planData.endDate));
  const dateRange = `${formattedStartDate} ~ ${formattedEndDate}`;

  const dDayText = calculateDDay(planData.startDate);

  return (
    <DetailSection>
      <PostContainer>
        <DetailTitle>{planData.title}</DetailTitle>
        <DetailInfo>
          <p>{dateRange} <DDayText>{dDayText}</DDayText></p>
          <p>
            {categories.map((category) => (
              <React.Fragment key={category.value}>
                {planData.value === category.value && <CategoryCircle color={category.color} />}
                {planData.value === category.value && category.label} {/* 여기서 해당 카테고리만 보이도록 변경 */}
              </React.Fragment>
            ))}
          </p>
          <Separator />

        </DetailInfo>
        {/* <DetSection> */}
          <DetailContent>
            <p>{planData.content}</p>
          </DetailContent>
          <ButtonWrapper>
            <PostButton to={`/plan/${id}/edit`}>수정</PostButton>
            <CancelButton to='/plan'>목록</CancelButton>
          </ButtonWrapper>
        {/* </DetSection> */}
      </PostContainer>
    </DetailSection>
  );
}

export default PlanDetail;
