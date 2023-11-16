import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:33088/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface Data {
  title: string;
  content: string;
  done?: boolean;
}

export const getTodoList = async () => {
  const response = await instance.get<TodoListResponse>('/todolist');
  return response;
};

export const deleteTodoItem = async (id: number) => {
  const response = await instance.delete<Partial<TodoResponse>>(`todolist/${id}`);
  return response;
};

export const getTodoItem = async (id: number) => {
  const response = await instance.get<TodoResponse>(`todolist/${id}`);
  return response;
};

export const patchTodoItem = async (itemId: number, body: Partial<Data>) => {
  const response = await instance.patch<TodoResponse>(`todolist/${itemId}`, body);
  return response;
};

export const postTodoItem = async (body: Data) => {
  const response = await instance.post<TodoResponse>(`todolist`, body);
  return response;
};
