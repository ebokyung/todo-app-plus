import TodoUpdate from '../../component/updatePage/TodoUpdate';
import { getTodoList, deleteTodoItem, patchTodoItem } from '../../API/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const TodoListMain = () => {
  const [data, setData] = useState<TodoItem[]>();
  const [category, setCategory] = useState('ALL');
  const categories = ['ALL', 'TODO', 'DONE'];

  const [toggle, setToggle] = useState<{ [key: number]: boolean }>({});
  const navigate = useNavigate();

  const moveToRegist = () => {
    navigate('/regist');
  };

  const deleteAllTodo = async () => {
    const res: any = data?.map((item) => deleteTodoItem(item._id));
    await Promise.all(res);
    getData();
  };

  const getData = async () => {
    const data = (await getTodoList()).data.items;
    setData(
      category === 'ALL'
        ? data
        : category === 'TODO'
        ? data.filter((i) => !i.done)
        : data.filter((i) => i.done),
    );
  };

  useEffect(() => {
    getData();
  }, [category]);

  const showTodoDetail = async (id: number) => {
    setToggle((prev) => {
      const newToggle = { ...prev };
      newToggle[id] = !newToggle[id];
      return newToggle;
    });
  };

  const checkTodoDone = async (item: TodoItem) => {
    const { _id, done } = item;
    const body = {
      ...item,
      done: !done,
    };
    await patchTodoItem(_id, body);
    getData();
  };

  return (
    <>
      <ul>
        {categories.map((text) => {
          return (
            <li key={text}>
              <CategoryBtn
                className={`${`category-${text}`} ${category === text ? 'isActive' : ''}`}
                onClick={() => setCategory(text)}
              >
                {text}
              </CategoryBtn>
            </li>
          );
        })}
      </ul>
      <TodoList>
        {data?.map((item) => (
          <li key={item._id}>
            <div>
              <CheckBox type='checkbox' onChange={() => checkTodoDone(item)} checked={item.done} />
              <TodoTitle onClick={() => showTodoDetail(item._id)}>{item.title}</TodoTitle>
            </div>

            <TodoUpdate idNum={item._id} toggle={toggle[item._id]} getData={getData} />
          </li>
        ))}
        {!data?.length && category === 'TODO' && <TodoGuide>할일을 추가해주세요.</TodoGuide>}
        {!data?.length && category === 'DONE' && <TodoGuide>할일을 완료해주세요.</TodoGuide>}
      </TodoList>
      <ButtonContainer>
        <Button onClick={moveToRegist}>등록</Button>
        <Button className='redButton' onClick={deleteAllTodo}>
          전체삭제
        </Button>
      </ButtonContainer>
    </>
  );
};

const TodoList = styled.ul`
  width: 300px;
  list-style: none;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 35px;
  margin: 0 auto 20px;

  li div {
    display: flex;
  }

  & > input {
    display: inline-block;
    margin-right: 10px;
    width: 20px;
  }
`;

const CheckBox = styled.input`
  margin: 3px 10px 3px 4px;
`;

const TodoTitle = styled.h2`
  display: inline-block;
  background-color: #d9d9d9;
  width: 260px;
  height: 40px;
  font-size: 16px;
  border-radius: 75px;
  color: black;
  text-align: left;
  justify-content: start;
  margin: 0;
  padding-left: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const TodoGuide = styled.span`
  text-align: center;
`;

// BUTTON
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
`;

const Button = styled.button`
  border: none;
  border-radius: 20px;
  background-color: #d9d9d9;
  color: black;
  padding: 6px 12px;
  flex-shrink: 0;
  cursor: pointer;

  &.redButton {
    margin-left: 10px;
  }

  &:hover {
    background: #79e127;
    color: white;
  }

  &.redButton:hover {
    background-color: #ef5242;
    color: white;
  }
`;

const CategoryBtn = styled.button`
  border: none;
  &.isActive {
    background-color: yellow;
  }
`;
