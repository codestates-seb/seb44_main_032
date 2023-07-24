import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
// import { Viewer } from '@toast-ui/react-editor';
// import '@toast-ui/editor/dist/toastui-editor-viewer.css';​

const DetailSection = styled.section`
  display: flex;
  background-color: #f9f9f9;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 67px 0 30px;
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
  planId: string;
  title: string;
  category: string; //value
  startDate: string;
  endDate: string;
  body: string; //content
};

// 더미데이터
// const dummyPlanData: PlanPostData = {
//   planId: '1',
//   title: '속초 여행',
//   category: '1',
//   startDate: '2023-07-20',
//   endDate: '2023-07-23',
//   body: '💫 여행루트옥계휴게소 – 설악대교&금강대교 – 동명항 대게거리 – 영금정 – 속초등대전망대 – 설악산 – 낙산사',
// };

function calculateDDay(startDate: string): string {
  const formattedStartDate = new Date(startDate);
  const today = new Date();

  const diffTime = Math.ceil((formattedStartDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const dDayText = diffTime > 0 ? `D-${diffTime}` : 'D-Day';

  return dDayText;
}

const categories = [
  { category: '1', label: '당일치기', color: '#99FFB6' },
  { category: '2', label: '여행', color: '#FEFFCA' },
  { category: '3', label: '일상', color: '#FFD0D0' },
  { category: '4', label: '회사', color: '#DBCAFF' },

];


function PlanDetail() {
  const [planData, setPlanData] = useState<PlanPostData | null>(null);
  const { planId } = useParams<{ planId: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // 추가


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/plan/${planId}`);
        setPlanData(response.data);
        // 가져온 데이터의 category 값(카테고리)을 selectedCategory로 설정합니다.
        setSelectedCategory(response.data.category);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [planId]);
  // 더미데이터를 사용합니다.
  //   setPlanData(dummyPlanData);
  // }, [planId]);


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
              <React.Fragment key={category.category}>
                {selectedCategory === category.category && <CategoryCircle color={category.color} />}
                {selectedCategory === category.category && category.label} {/* 여기서 해당 카테고리만 보이도록 변경 */}
              </React.Fragment>
            ))}
          </p>
          <Separator />

        </DetailInfo>
        {/* <DetSection> */}
          <DetailContent>
            <p>{planData.body}</p>
            {/* <Viewer initialValue={planData.body} /> */}
          </DetailContent>
          <ButtonWrapper>
            <PostButton to={`/plan/edit/${planId}`}>수정</PostButton>
            <CancelButton to='/plan'>목록</CancelButton>
          </ButtonWrapper>
        {/* </DetSection> */}
      </PostContainer>
    </DetailSection>
  );
}

export default PlanDetail;
