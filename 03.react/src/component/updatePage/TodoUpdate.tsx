import styled from 'styled-components';
import { getTodoItem, patchTodoItem, deleteTodoItem } from '../../API/axios';
import { useState, useEffect } from 'react';

const initailState = {
  title: '',
  content: '',
};

interface TodoUpdateProps {
  idNum: number;
  toggle: boolean;
  getData: Function;
}

export default function TodoUpdate({ idNum, toggle, getData }: TodoUpdateProps) {
  const [immediate, setImmediate] = useState(initailState);

  const getDetailData = async () => {
    const detailResponse = await getTodoItem(idNum);
    const { title, content } = detailResponse.data.item;
    setImmediate({ title, content });
  };

  useEffect(() => {
    getDetailData();
  }, []);

  const updateTodo = async () => {
    const body = { title: immediate.title, content: immediate.content };
    await patchTodoItem(idNum, body);
    getData();
  };

  const deleteTodo = async () => {
    await deleteTodoItem(idNum);
    getData();
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setImmediate((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {toggle && (
        <DetailForm>
          <input type='text' value={immediate.title} name='title' onChange={onChangeHandler} />
          <textarea value={immediate.content} name='content' onChange={onChangeHandler} />
          <BtnDetailWrapper>
            <UpdateButton type='button' onClick={updateTodo}>
              수정
            </UpdateButton>
            <DeleteButton type='button' onClick={deleteTodo}>
              삭제
            </DeleteButton>
          </BtnDetailWrapper>
        </DetailForm>
      )}
    </>
  );
}

const DetailForm = styled.form`
  background: #d9d9d9;
  width: 100% - 27px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  margin: 10px 0 0 27px;
  border-radius: 6px;

  input,
  textarea {
    background: #fff;
    width: 90%;
    border-radius: 5px;
    padding: 4px;
    border: unset;
  }

  textarea {
    height: 100px;
    resize: none;
  }
`;

const BtnDetailWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
  margin-right: 20px;

  button {
    border: unset;
    border-radius: 50px;
    padding: 5px 16px;
  }
`;

const UpdateButton = styled.button`
  background-color: #79e226;
  color: white;
`;

const DeleteButton = styled.button`
  background-color: #ef5142;
  color: white;
`;
