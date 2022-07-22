import { gql } from "@apollo/client";

export const GetLists = gql`
  subscription getLists {
    todolist(order_by: { id: asc }) {
      id
      title
      completed
    }
  }
`;

// todolist_insert_input! dimasukkan kedalam variabel $object
export const InsertList = gql`
  mutation insertList($object: todolist_insert_input!) {
    insert_todolist_one(object: $object) {
      id
    }
  }
`;

export const DeleteList = gql`
  mutation deleteList($id: Int!) {
    delete_todolist_by_pk(id: $id) {
      id
    }
  }
`;

export const UpdateCompleted = gql`
  mutation updateCompleted($id: Int!, $completed: Boolean) {
    update_todolist_by_pk(
      pk_columns: { id: $id }
      _set: { completed: $completed }
    ) {
      id
    }
  }
`;

export const UpdateTask = gql`
  mutation updateTask($id: Int!, $title: String) {
    update_todolist_by_pk(pk_columns: { id: $id }, _set: { title: $title }) {
      id
    }
  }
`;

// mutation MyMutation {
//   update_todolist_by_pk(pk_columns: {id: 6}, _set: {completed: true}) {
//     id
//   }
// }
