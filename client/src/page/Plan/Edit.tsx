// import { useState } from 'react';
// import styled from "styled-components";
// // import PlanContainer from './Plan'

// const EditContainer = styled.div`
//   width: 342px;
//   padding: 20px;
//   background-color: #f9f9f9;
//   box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
//   border-radius: 8px;
//   margin-top: 20px;
// `;

// const InputContainer = styled.div`
//   margin-bottom: 8px;
// `;

// const InputLabel = styled.label`
//   font-size: 16px;
//   font-weight: bold;
// `;

// const InputField = styled.input`
//   width: 100%;
//   height: 32px;
//   padding: 4px;
//   margin-top: 4px;
// `;

// const Edit: React.FC<{ setPlanData: React.Dispatch<React.SetStateAction<{ title: string; date: string; content: string; } | null>> }> = ({ setPlanData }) => {
//   const [title, setTitle] = useState("");
//   const [date, setDate] = useState("");
//   const [content, setContent] = useState("");
// // const Edit: React.FC = () => {
// //   const [title, setTitle] = useState("");
// //   const [date, setDate] = useState("");
// //   const [content, setContent] = useState("");
// // //   const [planData, setPlanData] = useState(null);
// //   const [planData, setPlanData] = useState<{ title: string; date: string; content: string } | null>(null);


//   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTitle(e.target.value);
//   };

//   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setDate(e.target.value);
//   };

//   const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setContent(e.target.value);
//   };

//   const handleSave = () => {
//     const newPlanData = {
//       title,
//       date,
//       content
//     };
//     setPlanData(newPlanData);
//   };

//   return (
//     <EditContainer>
//       <InputContainer>
//         <InputLabel>제목</InputLabel>
//         <InputField
//           type="text"
//           value={title}
//           onChange={handleTitleChange}
//         />
//       </InputContainer>
//       <InputContainer>
//         <InputLabel>날짜</InputLabel>
//         <InputField
//           type="text"
//           value={date}
//           onChange={handleDateChange}
//         />
//       </InputContainer>
//       <InputContainer>
//         <InputLabel>내용</InputLabel>
//         <InputField
//           type="text"
//           value={content}
//           onChange={handleContentChange}
//         />
//       </InputContainer>
//       <button onClick={handleSave}>저장</button>
//       {/* {planData && (
//         <PlanContainer>
//           <h2>{planData.title}</h2>
//           <p>{planData.date}</p>
//           <p>{planData.content}</p>
//         </PlanContainer>
//       )} */}
//     </EditContainer>
//   );
// };

// export default Edit;
