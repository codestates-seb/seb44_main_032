import { useState } from 'react';
import styled from "styled-components";
import TabButton from '../../components/Plan/TabButton';
import { LuCalendarDays } from "react-icons/lu";


const PostSection = styled.section`
  display: flex;
  background-color: #f9f9f9;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

// const TitleContainer = styled.div`
//   display: flex;
// `

const PlanForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* height: 100vh; */
  border: 1px solid black;
  /* margin: 0 auto; */
  padding: 40px;
  max-width: 920px;
  width: 100%;
`

const InputTitleContainer = styled.input`
  margin-bottom: 16px;
  border: 1px solid #98dde3;
  background: #FFFFFF;
  border-radius: 8px;
  height: 36px;
  width: 288px;
  padding: 0 8px;


    ::placeholder {
    color: #D6D6D6;
    font-size: 14px;

    }
`

const PlanTitle = styled.div`
  color: black;
  font-size: 16px;
  margin-bottom: 4px;
`;

const DateContainer = styled.div`
  /* position: relative; */
  display: flex;
  margin-top: 16px;
  gap: 12px;
`

const PlanStartDate = styled.input`
  position: relative;
  margin-bottom: 16px;
  border: 1px solid #98dde3;
  background: #FFFFFF;
  border-radius: 8px;
  height: 36px;
  width: 135px;
  padding: 0 8px;
  font-size: 14px;
  color: #000;

  /* &:focus::placeholder {
    color: transparent; 
  } */


  /* &::before {
    content: attr(placeholder);
    color: #D6D6D6;
  } 
  
  &:valid::before {
    display: none; 
  } */

  &::-webkit-calendar-picker-indicator {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: transparent; 
    color: transparent; 
    cursor: pointer;
    }
`;

const CalendarIcon = styled(LuCalendarDays)`
  cursor: pointer;
  position: absolute;
  padding: 8px;
  top: 35%;
  right: 0;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  pointer-events: none;
`;

const StartWrapper = styled.div`
  position: relative;
`

const EndWrapper = styled.div`
  position: relative;
`

const PlanEndDate = styled.input`
  position: relative;
  margin-bottom: 16px;
  border: 1px solid #98dde3;
  background: #FFFFFF;
  border-radius: 8px;
  height: 36px;
  width: 135px;
  padding: 0 8px;
  font-size: 14px;
  color: #000;

  /* &:focus::placeholder {
    color: transparent; 
  } */


  /* &::before {
    content: attr(placeholder);
    color: #D6D6D6;
  } 
  
  &:valid::before {
    display: none; 
  } */

  &::-webkit-calendar-picker-indicator {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: transparent; 
    color: transparent; 
    cursor: pointer;
    }
`;

const InputContainer = styled.div`
  margin-bottom: 8px;
`;

const TextArea = styled.textarea`
  width: 900px;
  height: 316px;
  background: #FFFFFF;
  border: 1px solid #98DDE3;
  border-radius: 8px;

`;

const PostButton = styled.button`
  width: 62px;
  height: 44px;
  background: #98DDE3;
  border-radius: 12px;
  border: none; 
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  
`;

const CancelButton = styled.button`
  width: 62px;
  height: 44px;
  background: #EEA9A9;
  border-radius: 12px;
  border: none; 
  color: #fff;
  font-weight: 700;
  font-size: 16px;
`

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 12px;
  gap: 12px;
  justify-content: flex-end;
`


const InputField = styled.input`
  width: 100%;
  height: 32px;
  padding: 4px;
  margin-top: 4px;
`;

type PlanPostFormData = {
  title: string;
  value: string;
  startDate: string;
  endDate: string;
  content: string;
};

function PlanPost() {
  const [formData, setFormData] = useState<PlanPostFormData>({
    title: "",
    value: "",
    startDate: "",
    endDate: "",
    content: "",
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      title: e.target.value,
    }));
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      value: e.target.value,
    }));
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      startDate: e.target.value,
    }));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      endDate: e.target.value,
    }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      content: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 필요한 데이터 처리나 API 호출은 이곳에서 수행합니다.
    console.log("폼 데이터:", formData);
    // 제출 후 폼 초기화
    setFormData({
      title: "",
      value: "",
      startDate: "",
      endDate: "",
      content: "",
    });
  };

  return (
    <PostSection>
      {/* <TitleContainer></TitleContainer> */}
      <PlanForm onSubmit={handleSubmit}>
        <InputContainer>
          <PlanTitle>제목</PlanTitle>
          <InputTitleContainer onChange={handleTitleChange} placeholder="제목" />
        </InputContainer>
        <PlanTitle>카테고리</PlanTitle>
        <TabButton
          onCategorySelect={(value: string) =>
            setFormData(prevFormData => ({
              ...prevFormData,
              value,
            }))
          }
          selectedCategory={formData.value}
        />
        <DateContainer>
          <div>
            <PlanTitle>시작일</PlanTitle>
            <StartWrapper>
              <PlanStartDate 
                type="date" 
                value={formData.startDate}
                onChange={handleStartDateChange} 
                placeholder="시작일"
                required 
              />
              <CalendarIcon />
            </StartWrapper>
          </div>
          <div>
            <PlanTitle>종료일</PlanTitle>
            <EndWrapper>
              <PlanEndDate 
                type="date" 
                value={formData.endDate}
                onChange={handleEndDateChange} 
                placeholder="종료일"
                required 
              />
              <CalendarIcon />
            </EndWrapper>
          </div>
        </DateContainer>
        <InputContainer>
          <PlanTitle>내용</PlanTitle>
          <TextArea
              value={formData.content}
              onChange={handleContentChange}
          />
        </InputContainer>
        <ButtonWrapper>
          <CancelButton type="button" onClick={handleCancel}>
            취소
          </CancelButton>

          <PostButton type="submit" onClick={handleSubmit}>제출</PostButton>
        </ButtonWrapper>
        
      </PlanForm>
    </PostSection>
  );
}

export default PlanPost;
