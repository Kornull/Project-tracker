import { Button, Typography } from '@mui/material';
import { Modal } from 'components';
import AddBoard from 'components/Forms/addBoard';
import { Link, useParams } from 'react-router-dom';

import { useGetBoardByIdQuery, useGetColumnsQuery } from 'services';

import './singleBoardPage.scss';

type SingleBoardRouterPropsType = {
  boardId: string;
};

const SingleBoardPage = () => {
  const { boardId } = useParams<SingleBoardRouterPropsType>();
  const { data: boardData } = useGetBoardByIdQuery(boardId as string);
  const { data: columnsData } = useGetColumnsQuery(boardId as string);

  return (
    <section className="single-board-page">
      <div className="board-info">
        <Button variant="contained">
          <Link className="back-link" to="/boards">
            &lt; Back to boards
          </Link>
        </Button>
        <Typography variant="h4">{boardData?.title}</Typography>
        <Modal buttonText="Edit" title="Edit board">
          <AddBoard />
        </Modal>
      </div>
      <div className="board-container">
        <Modal buttonText="+ Add column" title="Add column">
          <AddBoard />
        </Modal>
        {columnsData &&
          columnsData.map((column) => (
            <div className="board-column" key={column._id}>
              {column.title}
              <Modal buttonText="+ Add task" title="Add task">
                <AddBoard />
              </Modal>
            </div>
          ))}
      </div>
    </section>
  );
};

export default SingleBoardPage;
