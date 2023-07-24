import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({show: false, msg:'', type:'' });

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({show, type, msg })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('hello');
    

    if(!name) {
      // If name is false; display alert
      showAlert(true, 'danger', 'please enter a value')
    }
    else if(name && isEditing) {
      // Deal with edit
    }
    else {
      // Show alert
      const newItem = {
        id : new Date().getTime().toString(),
        title : name
      };
      // Get all the previous values from the state list values 
      setList([...list, newItem]);
      setName('') 
    }
    
  }

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        { alert.show && <Alert {...alert} removeAlert={showAlert} /> }
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input 
            type='text'
            className='grocery'
            placeholder='e.g eggs'
            value={name}
            onChange={(e) => {setName(e.target.value)}}
          />

          <button
            type='submit'
            className='submit-btn'
          >
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      <div className='grocery-container'>
        {/* Set the items list and the clearList Button as we add one item */}
        {list.length > 0 && (
          <div className='grocery-container'>
            <List items={list} />
            <button className='clear-btn'>
              clear items
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default App

// <></>