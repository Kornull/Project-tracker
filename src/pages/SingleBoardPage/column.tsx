import { useState } from 'react';
import { useDeleteColumnByIdMutation, useGetTasksQuery } from 'services';
import { ColumnType } from 'types';

import { Card, CardContent, CardActions, Button, CardHeader } from '@mui/material';
import { Modal } from 'components';
import TaskForm from 'components/Forms/taskForm';
import ColumnForm from 'components/Forms/columnForm';

const BoardColumn = (column: ColumnType) => {
  const [deleteColumnById] = useDeleteColumnByIdMutation();
  const [isEditColumnTitle, setIsEditColumnTitle] = useState(false);

  const { data } = useGetTasksQuery({ boardId: column.boardId, columnId: column._id });

  const handleDelete = async () => {
    await deleteColumnById({ boardId: column.boardId, _id: column._id });
  };

  const handleClickColumnTitle = () => {
    setIsEditColumnTitle(!isEditColumnTitle);
  };

  return (
    <Card className="board-column" sx={{ width: 240, backgroundColor: '#f4f4f4' }}>
      {!isEditColumnTitle ? (
        <CardHeader
          className="column-title"
          title={column.title}
          onClick={handleClickColumnTitle}
        />
      ) : (
        <ColumnForm
          mode="edit"
          boardId={column.boardId}
          column={column}
          onClose={handleClickColumnTitle}
        />
      )}
      <CardContent className="column-tasks">
        {data && data.map((task) => <Button key={task._id}>{task.title}</Button>)}
      </CardContent>
      <CardActions>
        <Modal buttonText="+ Add task" title="Add task">
          <TaskForm mode="add" boardId={column.boardId} columnId={column._id} />
        </Modal>
        <Modal title="Delete column" mode="confirm" onConfirm={handleDelete}>
          <p>You want to delete this column. Are you sure?</p>
        </Modal>
      </CardActions>
    </Card>
  );
};

export default BoardColumn;
