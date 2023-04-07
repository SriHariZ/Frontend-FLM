// PC_NO_3
// Importing required functions, packages and images.
import React, { useEffect, useState } from 'react';
import editicon from '../images/editicon.png';
import deleteicon from '../images/deleteicon.jpg';
import { Link } from "react-router-dom";
import { getTrailerDetails, deleteTrailerDetailsById} from '../Api/service';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import ReactPaginate from 'react-paginate';

//PC_NO_11
// Creating a component function
function ForkliftGrid() {

    //Creating instance variable for useNavigatiom()
    let navigation = useNavigate();

    //Initializing State Variable
    const [trailerDetails, setTrailerDetails] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [order,setOrder] = useState('');
    const perPageValue = 4
    const totalPages = Math.ceil(totalCount / perPageValue);


    // Initializing useEffect
    useEffect(() => {

        // Function for populating Trailer Details
        populateTrailerDetails(page,order);

    }, [])

    // PC_NO_12
    // Creating function to get all the Trailer details
    async function populateTrailerDetails(page,order) {
        let result = await getTrailerDetails(searchValue,page,order);
        setTrailerDetails(result);
        if(result.length !=0)
        {
            setTotalCount(result[0].TotalValues)
        }   
    }

    // PC_NO_57
    // Creating a function to get the selected page value 
    const changePage = ({ selected }) => {
        setPage(selected);
        populateTrailerDetails(selected,order);
    };

    //PC_NO_32
    //Creating a function to delete the Trailer Details
    async function deleteTrailerDetails(event) {
        if (window.confirm("Are you sure want to delete")) {
            let result = await deleteTrailerDetailsById(event.target.id);
            console.log(result)
            if (result.rowsAffected == 1) {
                window.alert("deleted sucessfully");
                populateTrailerDetails(page,order);
            }
        }
    }

    //PC_NO_47
    //Creating a function to edit the Trailer Details
    function editTrailerDetails(event) {
        navigation(`/form/${event.target.id}`);
    }

    //PC_NO_51
    //Creating a function to handle the Serach bar
    function searchHandler(event) {
        setSearchValue(event.target.value);
    }

    //PC_NO_28
    // Creating a function to bind the data in the table
    const generateTrailerDetails = () => {
        return trailerDetails.map((obj, index) => {
            return (
                <tr className='table-row'>
                    <td className="t-data link">{obj.ServiceCenterName}</td>
                    <td className="t-data">{moment(obj.CreatedDate).format('yyyy-MM-DD')}</td>
                    <td className="t-data">{obj.Supervisor}</td>
                    <Link to ={`/form/view/${index+1}`} className="view"><td className="t-data">{obj.TrailerNumber}</td></Link>
                    <td className="t-data">{obj.DriverName}</td>
                    <td className="t-data">{obj.LiftTruckNumber}</td>
                    <td className="t-data">{obj.OperatorName}</td>
                    <td className="t-data-center"><img src={editicon} id={obj.TrailerNumber} className="icon-btn" onClick={(event) => editTrailerDetails(event)} /><img src={deleteicon} id={obj.TrailerNumber} className="icon-btn" onClick={(event) => deleteTrailerDetails(event)} /></td>
                </tr>
            )
        })
    }

    return (
        <>
            <div className="parent-container">
                <div className="sub-container">
                    <h3 className="Heading">FORKLIFT/TRAILER DAMAGE</h3>
                    <div className='btn-right'>
                        <input type="text" className="searchbar-style" placeholder="Search..." onChange={(e) => searchHandler(e)} />
                        <button className="add-btn" onClick={() => populateTrailerDetails(0,order)}>Search</button>
                        {/* PC_NO_43 */}
                        <Link to="/form"><button className="add-btn">Create New Report</button></Link>
                    </div>
                </div>
                <div className="sub-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="table-column">Service Center</th>
                                <th className="table-column">Created Date</th>
                                <th className="table-column">Supervisor</th>
                                {/* PC_NO_61 */}
                                <th className="table-column">Trailer#<div class="btn-right"><button className='order-btn' value="asc" onClick={(event)=>{setOrder(event.target.value);populateTrailerDetails(page,event.target.value)}}>↑</button><button className='order-btn' value="desc" onClick={(event)=>{setOrder(event.target.value);populateTrailerDetails(page,event.target.value)}}>↓</button></div></th>
                                <th className="table-column">Driver</th>
                                <th className="table-column">Lift#</th>
                                <th className="table-column">Operator</th>
                                <th className="table-column-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {generateTrailerDetails()}
                        </tbody>
                    </table>
                    {(trailerDetails.length == 0) ? <div className='Center-Style'> <h3>No Trailer Details Found!</h3> </div> : <></>}
                    {(trailerDetails.length !== 0) ?
                    <>
                    <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={totalPages}
                    onPageChange={changePage}
                    containerClassName={"navigationButtons"}
                    previousLinkClassName={"previousButton"}
                    nextLinkClassName={"nextButton"}
                    disabledClassName={"navigationDisabled"}
                    activeClassName={"navigationActive"}/></>:<></>}
                </div>
            </div>
        </>
    )
}
export default ForkliftGrid;