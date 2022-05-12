import React, { useState , useEffect} from "react";

export default function AddQuestion() {
  const [answers, setAnswers] = useState([]);
  const [type, setType] = useState(0);
  const [question, setQuestion] = useState('');

  useEffect(() => {
      if(type==0){
          setAnswers(['','','',''])
      }else{
          setAnswers([])
      }
  }, [type]);

  const updateFieldChanged = index => e => {
    let newArr = [...answers];
    newArr[index] = e.target.value;
    setAnswers(newArr);
  }
  return (
    <>
      <div>AddQuestion</div>
      <br />
      <label>Kiểu</label>
      <select onChange={(e)=>setType(e.target.value)}>
        <option value="0" key="0">
          Single choice
        </option>
        <option value="1" key="1">
          Multiple choice
        </option>
        <option value="2" key="2">
          Select choice
        </option>
      </select>
      <br/> 

      <label>Question</label>
      <input type="text" onChange={e=>setQuestion(e.target.value)}/>
      <input type="file"  />
      <br />
      <label>Answer</label>
      {answers.map((item, index) => (
        <div key={index}>
           <input type="text" name="name" onChange={updateFieldChanged(index)}  />
          <br />
        </div>
      ))}
      {type!=0 &&
            <button onClick={() => setAnswers([...answers, ""])}>Tang</button>
      }

    </>
  );
}
