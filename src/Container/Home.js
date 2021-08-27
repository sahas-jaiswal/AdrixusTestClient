import React, {useEffect, useState} from 'react';
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../Actions/user.action';
import { Redirect } from 'react-router-dom';
import NavBar from '../Component/NavigationBar';

const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const token = window.localStorage.getItem('token');
    const [search, setSearch] =  useState('')
    const [currentPage, setCurrentPage] =  useState('1')
    const [dataPerPage] =  useState('5')
    let data =[];

    useEffect(() => {
        if(!user.loading)
       dispatch(getAllUsers());
    }, [])

    

    if(!token){
        return <Redirect to={'/'}/>;
    }
   if(search){
       let list = user.users;
       data = list.filter(data=>data.firstName.toLowerCase().includes(search.toLowerCase()))
   }else{
       data = user.users
   }

   const indexOfLastPost = currentPage * dataPerPage;
   const indexOfFirstPost = indexOfLastPost - dataPerPage;
   const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);


   //Logic for displaying page numbers
   const pageNumbers = [];
   for (let i = 1; i <= Math.ceil(data.length / dataPerPage); i++) {
     pageNumbers.push(i);
   } 
   const handleClick = (e) => {
      setCurrentPage(e.target.id)
    
  }

    return (
        <>
        <NavBar/>
            <input className='Search' 
            placeholder="Search with first name..." 
            value={search} 
            onChange={(e)=>setSearch(e.target.value)}/>
            <div>
            <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentPosts.map(user => (
                                <tr>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </Table>
            </div>
            <ul>
                {pageNumbers.map(number =>  (
                    <li key={number}>
                        <button id={number} onClick={handleClick}>{number}</button>
                        
                    </li>

                ))}
            </ul>
        </>
    )
}

export default Home
