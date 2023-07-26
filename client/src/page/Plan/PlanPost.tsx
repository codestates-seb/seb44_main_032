import { useState, useEffect } from 'react';
import styled from "styled-components";
import TabButton from '../../components/Plan/TabButton';
import { LuCalendarDays } from "react-icons/lu";
import { Link } from 'react-router-dom';
import axios from 'axios';
import PostEditor from '../../components/Plan/PostEditor';
import { useParams } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_REACT_APP_SERVER;

const PostSection = styled.section`
  display: flex;
  background-color: #f9f9f9;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 67px 0 30px;
`;

const PlanForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px;
  max-width: 920px;
  width: 100%;
  align-items: stretch;
`;

const InputTitleContainer = styled.input`
  margin-bottom: 16px;
  border: 1px solid #98dde3;
  background: #FFFFFF;
  border-radius: 8px;
  height: 36px;
  width: 300px;
  padding: 0 8px;


    ::placeholder {
    color: #D6D6D6;
    font-size: 14px;

    }
`;

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
`;

const PlanStartDate = styled.input`
  position: relative;
  margin-bottom: 16px;
  border: 1px solid #98dde3;
  background: #FFFFFF;
  border-radius: 8px;
  height: 36px;
  width: 136px;
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
`;

const EndWrapper = styled.div`
  position: relative;
`;

const PlanEndDate = styled.input`
  position: relative;
  margin-bottom: 16px;
  border: 1px solid #98dde3;
  background: #FFFFFF;
  border-radius: 8px;
  height: 36px;
  width: 136px;
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

type PlanPostFormData = {
  planId?: number;
  title: string;
  category: string; //value
  startDate: string;
  endDate: string;
  body: string; //content
}; 

function PlanPost() {
  // const { planId } = useParams<{ planId: string }>();
  const { userId } = useParams<{ userId: string }>();
  const [formData, setFormData] = useState<PlanPostFormData>({
    title: "",
    category: "",
    startDate: "",
    endDate: "",
    body: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // URL에서 "/edit"이 포함되어 있는지 확인하여 수정 모드 여부 설정
    setIsEditMode(window.location.pathname.includes("/edit"));
  }, []);

  useEffect(() => {
    // 수정 모드일 때 초기 데이터 설정
    if (isEditMode) {
      const planId = window.location.pathname.split("/").pop(); // 수정 대상 게시물 ID

      axios
        .get(`${apiUrl}/plan/${planId}`)
        .then((response) => {
          const { title, category, startDate, endDate, body } = response.data;
          setFormData({ title, category, startDate, endDate, body });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isEditMode]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      title: e.target.value,
    }));
  };

  // const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     value: e.target.value,
  //   }));
  // };

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

  const handleBodyChange = (body: string) => {
    setFormData((prevData) => ({
      ...prevData,
      body: body,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.title.trim() === "") {
      alert("제목을 입력해주세요.");
      return;
    }

    if (formData.category.trim() === '') {
      alert('카테고리를 선택해주세요.');
      return;
    }

    if (formData.startDate === "") {
      alert("시작일을 선택해주세요.");
      return;
    }

    if (formData.endDate === "") {
      alert("종료일을 선택해주세요.");
      return;
    }

    if (formData.body.trim() === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    const data = {
      title: formData.title,
      category: formData.category,
      startDate: formData.startDate,
      endDate: formData.endDate,
      body: formData.body,
    };

    if (isEditMode) {
      const planId = window.location.pathname.split("/").pop(); // 수정 대상 게시물 ID
      axios
        .put(`${apiUrl}/plan/edit/${planId}`, data)
        .then(() => {
          window.location.href = "/plan";
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(`${apiUrl}/plan/registration/${userId}`, data)
        .then(() => {
          window.location.href = "/plan";
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log("폼 데이터:", formData);

    setFormData({
      title: "",
      category: "",
      startDate: "",
      endDate: "",
      body: "",
    });
  };



  //   if (isEditMode) {
  //     const planId = window.location.pathname.split("/").pop(); // 수정 대상 게시물 ID
  //     axios
  //       .put(`/plan/post/${planId}`, formData)
  //       .then(() => {
  //         window.location.href = "/plan";
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };

  return (
    <PostSection>
      <PlanForm onSubmit={handleSubmit}>
        <InputContainer>
          <PlanTitle>제목</PlanTitle>
          <InputTitleContainer onChange={handleTitleChange} placeholder="제목" />
        </InputContainer>
        <PlanTitle>카테고리</PlanTitle>
        <TabButton
          onCategorySelect={(category: string) =>
            setFormData(prevFormData => ({
              ...prevFormData,
              category,
            }))
          }
          selectedCategory={formData.category}
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
          <PostEditor
            content={formData.body}
            getEditorContent={handleBodyChange}
            isEditMode={isEditMode}
          
          />
        </InputContainer>
        <ButtonWrapper>
          <CancelButton to='/plan'>취소</CancelButton>
          <PostButton type="submit" onClick={handleSubmit}>{isEditMode ? "수정" : "등록"}</PostButton>
        </ButtonWrapper>
        
      </PlanForm>
    </PostSection>
  );
}

export default PlanPost;
