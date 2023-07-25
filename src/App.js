import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

// getLocalStorage() Function for our item's list a maintain it after refreshing the page
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  
    /* parse() analyses a JSON character string and 
    constructs the JavaScript value or object described by this string. 
    You can optionally use this function with a modification parameter 
    to process the object before it is returned */
    // if the list exist returns the list as a string  
    if(list) {
      return JSON.parse(localStorage.getItem('list'))
    }
    // else return an empty array
    else {
      return []
    }
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({show: false, msg:'', type:'' });

  
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('hello');
    
    if(!name) {
      // If name is false; display alert
      showAlert(true, 'danger', 'please enter a value')
    }
    else if(name && isEditing) {
      // Deal with edit
      setList(list.map((item) => {
        if(item.id === editID) {
          return {...item, title : name}
        }
        return item
      }))
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed')
    }
    else {
      // Show alert
      showAlert(true, 'success', 'item added to the list')

      const newItem = {
        id : new Date().getTime().toString(),
        title : name
      };
      // Get all the previous values from the state list values 
      setList([...list, newItem]);
      setName('') 
    }  
  }
  // showAlert Function
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({show, type, msg })
  }

  // clearList Function to clear all the items in Grocery Bud's List
  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  }

  // editItem() Function to modify the target item added in the list
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  }
  // 
  useEffect(() => {
    // key (key name of 'list') pairs value (
    // Use the item objects in the list and transform them as a string with .stringify(list))
    /* JavaScript Object Notation (JSON) is a standard format used 
    to represent structured data in a similar way to JavaScript objects. */
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  // removeItem Function 
  // To remove item one by one in the list
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id))
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
            <List 
              items={list} 
              removeItem={removeItem}
              editItem={editItem} 
            />
            <button className='clear-btn' onClick={clearList}>
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