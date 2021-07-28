import { Col } from 'react-bootstrap';
import { Droppable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';

const KanbanColumn = (props) => {
  const {
    t,
    id,
    title,
    count,
    columnCount,
    columns,
    setColumns,
    countColor,
    background,
    borderColor,
    optionOpened,
    setOptionOpened,
  } = props;

  const [edit, setEdit] = useState(false);
  const [columnWide, setColumnWide] = useState(2);
  const [column, setColumn] = useState(title);
  const handleOption = (id) => {
    if (optionOpened === id) return setOptionOpened('');

    setOptionOpened(id);
  };

  const enableEditing = (id) => {
    setEdit(id);
  };

  useEffect(() => {
    if (columnCount > 3) return setColumnWide(2);
    if (columnCount > 2) return setColumnWide(3);
    if (columnCount == 2) return setColumnWide(5);
  }, [columnCount]);

  const removeColumn = (id) => {
    console.log(id);
    if (id == 'applicants') return;
    if (columnCount <= 2) return;
    let bordColumns = columns.filter((item) => item.columnId != id);
    console.log(columns);
    setColumns(bordColumns);
  };

  const handleEdit = (id) => {
    let index = columns.findIndex((item) => item.columnId == id);
    let bordColumns = [...columns];
    bordColumns[index].title = column;

    console.log(bordColumns);
    setColumns(bordColumns);
  };
  const handleEnter = (e, id) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      setEdit('');
      handleEdit(id);
    }
  };

  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <Col
          className={'single__column'}
          {...provided.droppableProps}
          ref={provided.innerRef}
          lg={columnWide}
          sm={12}
          xs={12}
          style={{
            backgroundColor: background,
            borderColor: borderColor,
          }}
        >
          <div>
            <div className={'column__header'}>
              <span
                className={'item__count'}
                style={{ backgroundColor: countColor }}
              >
                {count}
              </span>
              <span onDoubleClick={() => enableEditing(id)}>
                {edit !== id && column}
                {edit === id && (
                  <input
                    type="text"
                    placeholder={column}
                    value={column}
                    onKeyUp={(e) => handleEnter(e, id)}
                    onChange={(e) => setColumn(e.target.value)}
                    onBlur={() => {
                      setEdit('');
                      handleEdit(id);
                    }}
                  />
                )}
              </span>
              <span
                className={'column__option_container'}
                onClick={() => handleOption(id)}
              >
                <span
                  className={'item__option'}
                  onClick={() => handleOption(id)}
                >
                  . . .
                </span>
                {optionOpened === id && (
                  <div className={'options'}>
                    <div
                      onClick={() => enableEditing(id)}
                      className={'single_option'}
                    >
                      {t('kanban:kanban.columns.edit')}
                    </div>

                    {id != 'applicants' && (
                      <div
                        onClick={() => removeColumn(id)}
                        className={'single_option'}
                      >
                        {t('kanban:kanban.remove')}
                      </div>
                    )}
                  </div>
                )}
              </span>
            </div>
          </div>
          {props.children}
          {provided.placeholder}
        </Col>
      )}
    </Droppable>
  );
};

export default KanbanColumn;
