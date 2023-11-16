import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TodoListMain } from './mainPage/TodoListMain';
import RootLayout from './RootLayout';
import { TodoRegist } from './registPage/TodoRegist';
import { Error404 } from './errorPage/Error404';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path='/' element={<TodoListMain />} />
          <Route path='/regist' element={<TodoRegist />} />
          <Route path='*' element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
