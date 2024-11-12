'use client'

import { useState } from 'react'
import styles from '../../../styles/admin.module.css'

const initialUsers = [
  { id: 1, name: 'John Doe', type: 'Dancer', createdBy: 'Self' },
  { id: 2, name: 'Jane Smith', type: 'Representative', createdBy: 'Self' },
  { id: 3, name: 'Alice Johnson', type: 'Dancer', createdBy: 'Rep' },
  { id: 4, name: 'Bob Williams', type: 'Representative', createdBy: 'Self' },
  { id: 5, name: 'Charlie Brown', type: 'Dancer', createdBy: 'Rep' },
]

export default function AdminPanel() {
  const [users, setUsers] = useState(initialUsers)
  const [filter, setFilter] = useState('all')

  const filteredUsers = users.filter(user => {
    if (filter === 'all') return true
    if (filter === 'representatives') return user.type === 'Representative'
    if (filter === 'dancers') return user.type === 'Dancer'
    if (filter === 'dancersR') return user.type === 'Dancer' && user.createdBy === 'Rep'
    return true
  })

  const deleteUser = (id : any) => {
    setUsers(users.filter(user => user.id !== id))
  }

  const userCounts = {
    total: users.length,
    representatives: users.filter(user => user.type === 'Representative').length,
    dancers: users.filter(user => user.type === 'Dancer').length,
    dancersR: users.filter(user => user.type === 'Dancer' && user.createdBy === 'Rep').length,
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminPanel}>
        <h1 className={styles.title}>Admin Panel</h1>
        
        <div className={styles.topSection}>
          <select className={styles.filterSelect} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Users</option>
            <option value="representatives">Representatives</option>
            <option value="dancers">Dancers</option>
            <option value="dancersR">Dancers (Rep Signed)</option>
          </select>
          
          <div className={styles.userInfo}>
            <p>Total Users: {userCounts.total}</p>
            <p>Representatives: {userCounts.representatives}</p>
            <p>Dancers: {userCounts.dancers}</p>
            <p>Dancers (Rep Signed): {userCounts.dancersR}</p>
          </div>
        </div>
        
        <div className={styles.userGrid}>
          {filteredUsers.map(user => (
            <div key={user.id} className={styles.userCard}>
              <h2 className={styles.userName}>{user.name}</h2>
              <p className={styles.userType}>{user.type}</p>
              <p className={styles.userCreatedBy}>Created by: {user.createdBy}</p>
              <button className={styles.deleteButton} onClick={() => deleteUser(user.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}