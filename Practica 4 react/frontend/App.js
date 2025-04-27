import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Container, Button, Form, InputGroup, FormControl, Modal } from 'react-bootstrap';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [showModal, setShowModal] = useState(false); 
  const [modalType, setModalType] = useState('add');
  const [selectedUser, setSelectedUser] = useState(null); 
  const [newUser, setNewUser] = useState({ name: '', email: '', age: '' }); 


  useEffect(() => {
    axios.get('http://localhost:3001/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

 
  const handleSubmit = () => {
    if (modalType === 'add') {
      axios.post('http://localhost:3001/api/users', newUser)
        .then(() => {
          setNewUser({ name: '', email: '', age: '' });
          setShowModal(false);
          window.location.reload(); 
        })
        .catch(error => console.error('Error adding user:', error));
    } else {
      axios.put(`http://localhost:3001/api/users/${selectedUser.id}`, newUser)
        .then(() => {
          setNewUser({ name: '', email: '', age: '' });
          setShowModal(false);
          window.location.reload(); 
        })
        .catch(error => console.error('Error updating user:', error));
    }
  };

  const handleDeleteUser = (id) => {
    axios.delete(`http://localhost:3001/api/users/${id}`)
      .then(() => {
        window.location.reload();
      })
      .catch(error => console.error('Error deleting user:', error));
  };


  const filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.age.toString().includes(searchTerm)
    );
  });

 
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Age',
      selector: row => row.age,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <Button
            variant="warning"
            onClick={() => {
              setModalType('edit');
              setSelectedUser(row);
              setNewUser({ name: row.name, email: row.email, age: row.age });
              setShowModal(true);
            }}
            style={{ marginRight: '10px' }}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteUser(row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container>
      <h1>User Management</h1>

      <InputGroup className="mb-4">
        <InputGroup.Text>Search</InputGroup.Text>
        <FormControl
          placeholder="Search by Name, Email, or Age"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <Button variant="primary" onClick={() => {
        setModalType('add');
        setNewUser({ name: '', email: '', age: '' });
        setShowModal(true);
      }}>Add User</Button>


      <DataTable
        title="Users"
        columns={columns}
        data={filteredUsers} 
        pagination
        selectableRows
        highlightOnHover
        striped
        dense
      />


      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === 'add' ? 'Add User' : 'Edit User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={newUser.age}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" onClick={handleSubmit}>
              {modalType === 'add' ? 'Add User' : 'Update User'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default App;
