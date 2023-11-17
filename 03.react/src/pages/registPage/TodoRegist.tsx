import { postTodoItem } from '../../API/axios';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { REGIST_PAGE_CONSTANT_TEXT, initialState } from './TodoRegistSettings';

export const TodoRegist = () => {
  const [input, setInput] = useState<TodoInput>(initialState);
  const navigate = useNavigate();

  const moveToBack = () => {
    navigate(-1);
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.content === '') {
      input.content = REGIST_PAGE_CONSTANT_TEXT.INPUT_WRAN;
    }

    const res = await postTodoItem(input);

    if (res.status === 200) {
      moveToBack();
    }
  };

  const onCancel = () => {
    let useAnswer = window.confirm(REGIST_PAGE_CONSTANT_TEXT.WRITE_CANCEL);
    if (useAnswer) {
      setInput(initialState);
      moveToBack();
    }
  };
  return (
    <Wrap onSubmit={onSubmit}>
      <InputContainer>
        <InputTitle
          name='title'
          placeholder={REGIST_PAGE_CONSTANT_TEXT.INPUT_TITLE}
          type='text'
          onChange={onChangeInput}
          value={input.title}
        />
        <InputContent
          name='content'
          placeholder={REGIST_PAGE_CONSTANT_TEXT.INPUT_CONTENT}
          onChange={onChangeInput}
          value={input.content}
        />
      </InputContainer>
      <ButtonContainer>
        <Button>등록</Button>
        <Button type='button' className='redButton' onClick={onCancel}>
          {REGIST_PAGE_CONSTANT_TEXT.BUTTON_CANCEL}
        </Button>
      </ButtonContainer>
    </Wrap>
  );
};

// ROOT
const Wrap = styled.form`
  width: 360px;
  height: 780px;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

// INPUT
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  margin: 15px auto 20px;
  max-width: calc(100% - 100px);
  gap: 15px;
`;

const InputTitle = styled.input`
  outline: none;
  border: none;
  border-radius: 10px;
  height: 40px;
  font-family: 'Noto Sans KR', sans-serif;
  padding-left: 12px;
`;

const InputContent = styled.textarea`
  outline: none;
  border: none;
  border-radius: 10px;
  height: 140px;
  resize: none;
  font-family: 'Noto Sans KR', sans-serif;
  padding: 12px 12px 0;
`;

// BUTTON
const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  margin-left: 210px;
  gap: 5px;
`;

const Button = styled.button`
  border: none;
  border-radius: 20px;
  background-color: #79e127;
  color: #fff;
  padding: 6px 14px;
  flex-shrink: 0;
  cursor: pointer;

  &.redButton {
    background-color: #ef5242;
  }
`;
