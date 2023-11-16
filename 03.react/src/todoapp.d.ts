interface TodoItem {
  _id: number;
  title: string;
  content: string;
  done: true;
  createdAt: string;
  updatedAt: string;
}

interface TodoListResponse {
  ok: number;
  items: TodoItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 상세조회
interface TodoResponse {
  ok: number;
  item: TodoItem;
}

// 등록
interface TodoInput {
  title: string;
  content: string;
}
