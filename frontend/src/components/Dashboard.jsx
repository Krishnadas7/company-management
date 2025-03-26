import React, { useEffect, useState } from "react";
import { Users, Building2, Plus, Trash2, Edit } from 'lucide-react';
import axios from "axios";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", mobile: "", email: "" });
  const [newCompany, setNewCompany] = useState({ name: "", email: "", contact: "" });
  const [editingUser, setEditingUser] = useState(null);
  const [editingCompany, setEditingCompany] = useState(null);
  const [added,setAdded] = useState(false)
  useEffect(()=>{
   async function fetchCompanies(){
    const res = await axios.get('http://localhost:3000/api/companies')
    console.log(res.data);
    setCompanies(res.data)
   }
   fetchCompanies()
  },[])
 

useEffect(() => {
  async function fetchUsers() {
    try {
      const storedCompany = localStorage.getItem("company");
      if (!storedCompany) {
        console.error("Company details not found in localStorage.");
        return;
      }

      const companyData = JSON.parse(storedCompany);
      if (!companyData.id) {
        console.error("Company ID is missing.");
        return;
      }

      const res = await axios.get(`http://localhost:3000/api/users/${companyData.id}`);
      setUsers(res.data)
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  }

  fetchUsers();
}, [added]);



  const handleAddUser = async () => {
    const storedCompany = localStorage.getItem("company"); 
    const companyId = storedCompany ? JSON.parse(storedCompany).id : null; 
  
    if (!companyId) {
      alert("Company ID not found. Please log in again.");
      return;
    }
  
    if (newUser.name && newUser.mobile && newUser.email) {
      try {
         await axios.post("http://localhost:3000/api/users/add", {
          name: newUser.name,
          email: newUser.email,
          companyId: companyId,
        });
        setAdded(!added)
        alert("User added successfully!");
  
        setNewUser({ name: "", mobile: "", email: "" });
      } catch (error) {
        console.error("Error adding user:", error.response?.data || error.message);
        alert("Failed to add user. Please try again.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };
  


  const handleEditUser = () => {
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id ? editingUser : user
      ));
      setEditingUser(null);
      setActiveSection(null);
    }
  };


  const handleAddCompany = () => {
    if (newCompany.name && newCompany.email && newCompany.contact) {
      const companyToAdd = {
        ...newCompany,
        id: companies.length > 0 ? Math.max(...companies.map(c => c.id)) + 1 : 1
      };
      setCompanies([...companies, companyToAdd]);
      setNewCompany({ name: "", email: "", contact: "" });
      setActiveSection(null);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleEditCompany = () => {
    if (editingCompany) {
      setCompanies(companies.map(company => 
        company.id === editingCompany.id ? editingCompany : company
      ));
      setEditingCompany(null);
      setActiveSection(null);
    }
  };

  

  const renderUserModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
          {editingUser ? "Edit User" : "Add New User"}
        </h2>
        <input
          type="text"
          placeholder="Name"
          value={editingUser ? editingUser.name : newUser.name}
          onChange={(e) => 
            editingUser 
              ? setEditingUser({...editingUser, name: e.target.value})
              : setNewUser({...newUser, name: e.target.value})
          }
          className="w-full mb-3 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
        <input
          type="email"
          placeholder="Email"
          value={editingUser ? editingUser.email : newUser.email}
          onChange={(e) => 
            editingUser 
              ? setEditingUser({...editingUser, email: e.target.value})
              : setNewUser({...newUser, email: e.target.value})
          }
          className="w-full mb-3 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
        <input
          type="tel"
          placeholder="Mobile Number"
          value={editingUser ? editingUser.mobile : newUser.mobile}
          onChange={(e) => 
            editingUser 
              ? setEditingUser({...editingUser, mobile: e.target.value})
              : setNewUser({...newUser, mobile: e.target.value})
          }
          className="w-full mb-3 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
        <div className="flex space-x-2">
          <button
            onClick={editingUser ? handleEditUser : handleAddUser}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
          >
            {editingUser ? "Update" : "Add"}
          </button>
          <button
            onClick={() => {
              setActiveSection(null);
              setEditingUser(null);
              setNewUser({ name: "", mobile: "", email: "" });
            }}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const renderCompanyModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
          {editingCompany ? "Edit Company" : "Add New Company"}
        </h2>
        <input
          type="text"
          placeholder="Company Name"
          value={editingCompany ? editingCompany.name : newCompany.name}
          onChange={(e) => 
            editingCompany 
              ? setEditingCompany({...editingCompany, name: e.target.value})
              : setNewCompany({...newCompany, name: e.target.value})
          }
          className="w-full mb-3 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
        <input
          type="email"
          placeholder="Company Email"
          value={editingCompany ? editingCompany.email : newCompany.email}
          onChange={(e) => 
            editingCompany 
              ? setEditingCompany({...editingCompany, email: e.target.value})
              : setNewCompany({...newCompany, email: e.target.value})
          }
          className="w-full mb-3 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
        <input
          type="tel"
          placeholder="Contact Number"
          value={editingCompany ? editingCompany.contact : newCompany.contact}
          onChange={(e) => 
            editingCompany 
              ? setEditingCompany({...editingCompany, contact: e.target.value})
              : setNewCompany({...newCompany, contact: e.target.value})
          }
          className="w-full mb-3 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
        <div className="flex space-x-2">
          <button
            onClick={editingCompany ? handleEditCompany : handleAddCompany}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
          >
            {editingCompany ? "Update" : "Add"}
          </button>
          <button
            onClick={() => {
              setActiveSection(null);
              setEditingCompany(null);
              setNewCompany({ name: "", email: "", contact: "" });
            }}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const renderUserList = () => (
    <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
          Users List
        </h2>
        <button
          onClick={() => {
            setActiveSection('addUser');
            setEditingUser(null);
          }}
          className="flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          <Plus className="mr-2" size={20} /> Add User
        </button>
      </div>
      {users.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No users added yet</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b dark:border-gray-700">
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  const renderCompanyList = () => (
    <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
          Companies List
        </h2>
        
      </div>
      {companies.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No companies added yet</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id} className="border-b dark:border-gray-700">
                <td className="border px-4 py-2">{company.name}</td>
                <td className="border px-4 py-2">{company.email}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Dashboard Management
        </h1>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveSection('users')}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            <Users className="mr-2" size={24} /> Show Users
          </button>
          <button
            onClick={() => setActiveSection('companies')}
            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            <Building2 className="mr-2" size={24} /> Show Companies
          </button>
        </div>

        {activeSection === 'users' && renderUserList()}
        {activeSection === 'companies' && renderCompanyList()}
        {activeSection === 'addUser' && renderUserModal()}
        {activeSection === 'addCompany' && renderCompanyModal()}
      </div>
    </div>
  );
};

export default Dashboard;