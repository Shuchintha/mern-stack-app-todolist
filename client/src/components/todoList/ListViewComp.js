import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import { GiCheckMark } from 'react-icons/gi'
import { MdEdit, MdDeleteForever } from 'react-icons/md'

function CardViewComp({ todo, handleDelete, handleEdit, handleDone }) {
  return (
    <Col className='d-flex flex-row justify-content-between flex-wrap col-12'>
      <Card
        className='m-2 w-100'
        style={{
          backgroundColor: `${todo.isDone ? '#d9d9d9' : ''}`,
          borderTop: `thick solid ${stringToColour(todo.title)}`,
        }}
      >
        <Card.Body className='w-100 align-content-between flex-Row'>
          <div className='w-75 '>
            <Card.Title>{todo.title}</Card.Title>
            <Card.Text>{todo.body}</Card.Text>
          </div>
          <div className='d-flex justify-content-end position-absolute fixed-bottom m-2'>
            <Button
              className={`m-2 ${todo.isDone ? 'bg-success' : 'bg-seondary'}`}
              variant='secondary'
              onClick={e => {
                handleDone(todo._id)
              }}
            >
              <GiCheckMark />
            </Button>
            <Button
              className='m-2'
              variant='secondary'
              onClick={() => handleEdit(todo)}
            >
              <MdEdit />
            </Button>
            <Button
              className='m-2'
              variant='danger'
              onClick={() => handleDelete(todo._id)}
            >
              <MdDeleteForever />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

const stringToColour = function (str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff
    colour += ('00' + value.toString(16)).substr(-2)
  }
  return colour
}

export default CardViewComp
