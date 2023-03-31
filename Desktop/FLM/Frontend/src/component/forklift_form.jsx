//PC_NO_1
//Importing the packages,functions.
import React, { useEffect, useState } from "react";
import {useNavigate,useParams} from 'react-router-dom';
import {getServiceCenterData,getTrailerDetailsById,insertTrailerDetails,updateTrailerDetails} from '../Api/service';
import {Link} from 'react-router-dom';
import moment from 'moment/moment';


//PC_NO_3
function ForkliftForm() {

    //Creating instance variable for usenavigation() and useParams()
    let navigation = useNavigate();
    let params = useParams();
    // console.log('p',)

    let trailerDetailsObject =
    {
        'TrailerNumber' : '',
        'ServiceCenterId' : '',
        'Supervisor' : '',
        'AccidentDate' : '',
        'AccidentTime' : '',
        'TrailerArrivedFrom' : '',
        'DriverName' : '',
        'LiftTruckNumber' : '',
        'OperatorName' : '',
        'DescriptionOfDamage' : '',
        'DescriptionOfWhatHappened': '',
        'ServiceCenterName' : ''
    };

    let trailerDetailsObjectError =
    {
        'TrailerNumberError' : '',
        'ServiceCenterIdError' : '',
        'SupervisorError' : '',
        'AccidentDateError' : '',
        'AccidentTimeError' : '',
        'TrailerArrivedFromError' : '',
        'DriverNameError' : '',
        'LiftTruckNumberError' : '',
        'OperatorNameError' : '',
        'DescriptionOfDamageError' : '',
        'DescriptionOfWhatHappenedError': '',
    }

    //PC_NO_4
    //Initailzing the State Variable
    const [trailerDetails,setTrailerDetails] = useState(trailerDetailsObject);
    const [trailerDetailsError, setTrailerDetailsError] = useState(trailerDetailsObjectError)
    const [serviceCenterData,setserviceCenterData] = useState([]);

    //PC_NO_5
    //Initailzing useEffect Hook with empty dependency
    useEffect(() => {
        pageLoad();
    },[]);

    //PC_NO_6
    //Creating function to load the Form page.
    async function pageLoad()
    {
        let dropDownData = await getServiceCenterData();
        setserviceCenterData(dropDownData);
        if(params.id != undefined)
        {
            let result = await getTrailerDetailsById(params.id);
            setTrailerDetails(result[0]);
        }
    }

    //PC_NO_18
    //Service Center Data Binding in dropdown
    const generateServiceCenterDetails = () => {
        return serviceCenterData.map((obj, index) => {
            return (
                <option value={obj.ServiceCenterId} selected={(trailerDetails.ServiceCenterId === obj.ServiceCenterId) ? true : false}>{obj.ServiceCenterName}</option>
            )
        })
    };

    //PC_NO_23
    // Creating function to handle the input values.
    function inputHandler(event)
    {
        setTrailerDetails({...trailerDetails,[event.target.name] : event.target.value});
    }
    console.log("tt",trailerDetails);

    //PC_NO_26
    //Validation 
    function validation()
    {
        let result= true;
        if(trailerDetails.ServiceCenterId == "")
        {
            setTrailerDetailsError((trailerDetailsError)=>({...trailerDetailsError,"ServiceCenterIdError" : "Select any option"}));
            result = false;
        }
        if(trailerDetails.Supervisor == "")
        {
            setTrailerDetailsError((trailerDetailsError)=>({...trailerDetailsError,"SupervisorError" : "Enter Supervisor"}));
            result = false;
        }
        if(trailerDetails.TrailerNumber == "")
        {
            setTrailerDetailsError((trailerDetailsError)=>({...trailerDetailsError,"TrailerNumberError" : "Enter Trailer Number"}));
            result = false;
        }
        if(trailerDetails.AccidentDate == "")
        {
            setTrailerDetailsError((trailerDetailsError)=>({...trailerDetailsError,"AccidentDateError" : "Enter Accident Date"}));
            result = false;
        }
        if(trailerDetails.AccidentTime == "")
        {
            setTrailerDetailsError((trailerDetailsError)=>({...trailerDetailsError,"AccidentTimeError" : "Enter Accident Time"}));
            result = false;
        }
        if(trailerDetails.TrailerArrivedFrom == "")
        {
            setTrailerDetailsError((trailerDetailsError)=>({...trailerDetailsError,"TrailerArrivedFromError" : "Enter Trailer Arrived From"}));
            result = false;
        }
        if(trailerDetails.DriverName == "")
        {
            setTrailerDetailsError((trailerDetailsError)=>({...trailerDetailsError,"DriverNameError" : "Enter Driver Name "}));
            result = false;
        }
        if(trailerDetails.LiftTruckNumber == "")
        {
            setTrailerDetailsError((trailerDetailsError)=>({...trailerDetailsError,"LiftTruckNumberError" : "Enter Lift Truck Number"}));
            result = false;
        }
        if(trailerDetails.OperatorName == "")
        {
            setTrailerDetailsError((trailerDetailsError)=>({...trailerDetailsError,"OperatorNameError" : "Enter Operator Name"}));
            result = false;
        }

        return result;
    }

    //PC_NO_25
    //submiting the form
    async function submitForm() {
        if(params.id == undefined && validation())
        {
            console.log("trailerDetails",trailerDetails);
            const result = await insertTrailerDetails(trailerDetails);
            console.log("result",result)
            if(result.rowsAffected[0] == 1)
            {
                window.alert("Inserted Sucessfully");
                navigation('/grid');
            }
        }
        else if(params.id != undefined && validation())
        {
            const result = await updateTrailerDetails(trailerDetails);
           
            if(result.rowsAffected[0] == 1)
            {
                window.alert("Trailer Details updated");
                navigation('/grid');
            }
        }
    }


    

    return (
        <div className="parent-container">
            {(params.id != undefined)?<div>
            <h1>Edit Report</h1>
            </div>:<div>New Report</div>}
            <div className="sub-container">
                <div className="child-container">
                    <label className="label-style">Service Center<span className="color-indication">*</span></label>
                    <select className="inputbox-style" name="ServiceCenterId" onChange={(e)=>inputHandler(e)} disabled={(params.view != undefined) ? true :false}>
                        <option value ="">Select</option>
                        {generateServiceCenterDetails()}
                    </select>
                    <span className="color-indication">{trailerDetailsError.ServiceCenterIdError}</span>
                </div>
                <div className="child-container">
                    <label className="label-style">Supervisor<span className="color-indication">*</span></label>
                    <input type="text" className="inputbox-style" name="Supervisor" placeholder="Supervisor" value={trailerDetails.Supervisor} onChange={(e)=>inputHandler(e)} disabled={(params.view != undefined) ? true :false} />
                    <span className="color-indication">{trailerDetailsError.SupervisorError}</span>
                </div>
                <div className="child-container">
                    <label className="label-style">Trailer Number<span className="color-indication">*</span></label>
                    <input type="number" className="inputbox-style" name="TrailerNumber" placeholder="Enter Trailer Number" value={trailerDetails.TrailerNumber} onChange={(e)=>inputHandler(e)} disabled={(params.id != undefined) ? true :false} />
                    <span className="color-indication">{trailerDetailsError.TrailerNumberError}</span>
                </div>
            </div>

            <div className="sub-container">
                <div className="child-container">
                    <label className="label-style">Accident Date<span className="color-indication">*</span></label>
                    <input type="date" className="inputbox-style" name="AccidentDate" value={moment(trailerDetails.AccidentDate).format("yyyy-MM-DD")} onChange={(e)=>inputHandler(e)} disabled={(params.view != undefined) ? true :false} />
                    <span className="color-indication">{trailerDetailsError.AccidentDateError}</span>
                </div>
                <div className="child-container">
                    <label className="label-style">Accident Time<span className="color-indication">*</span></label>
                    <input type="time" className="inputbox-style" name="AccidentTime" value={trailerDetails.AccidentTime} onChange={(e)=>inputHandler(e)} disabled={(params.view != undefined) ? true :false}/>
                    <span className="color-indication">{trailerDetailsError.AccidentTimeError}</span>
                </div>
                <div className="child-container">
                    <label className="label-style">Trailer Arrived From(Service Center)<span className="color-indication">*</span></label>
                    <input type="text" className="inputbox-style" placeholder="Enter Trailer Arrived From" name="TrailerArrivedFrom" value={trailerDetails.TrailerArrivedFrom} onChange={(e)=>inputHandler(e)} disabled={(params.view != undefined) ? true :false}/>
                    <span className="color-indication">{trailerDetailsError.TrailerArrivedFromError}</span>
                </div>
            </div>

            <div className="sub-container">
                <div className="child-container">
                    <label className="label-style">Driver/Jockey Name<span className="color-indication">*</span></label>
                    <input type="text" className="inputbox-style" placeholder="Enter Driver/Jockey Name" name="DriverName" value={trailerDetails.DriverName} onChange={(e)=>inputHandler(e)} disabled={(params.view != undefined) ? true :false} />
                    <span className="color-indication">{trailerDetailsError.DriverNameError}</span>
                </div>
                <div className="child-container">
                    <label className="label-style">Lift Truck Number<span className="color-indication">*</span></label>
                    <input type="number" className="inputbox-style" placeholder="Enter Lift Truck Number" name="LiftTruckNumber" value={trailerDetails.LiftTruckNumber} onChange={(e)=>inputHandler(e)} disabled={(params.view != undefined) ? true :false} />
                    <span className="color-indication">{trailerDetailsError.LiftTruckNumberError}</span>
                </div>
                <div className="child-container">
                    <label className="label-style">Fork Lift Operator Name<span className="color-indication">*</span></label>
                    <input type="text" className="inputbox-style" placeholder="Enter Operator Name" name="OperatorName" value={trailerDetails.OperatorName} onChange={(e)=>inputHandler(e)} disabled={(params.view != undefined) ? true :false} />
                    <span className="color-indication">{trailerDetailsError.OperatorNameError}</span>
                </div>
            </div>

            <div className="sub-container">
                <div className="description-container">
                    <label className="label-style">Description of Damage</label>
                    <textarea className="textarea-style" name="DescriptionOfDamage" rows="4" placeholder="Enter details" value={trailerDetails.DescriptionOfDamage} onChange={(e)=>inputHandler(e)} disabled={(params.view != undefined) ? true :false} />
                </div>
                <div className="description-container">
                    <label className="label-style">Description of what happened?</label>
                    <textarea className="textarea-style" rows="4" name="DescriptionOfWhatHappened" value={trailerDetails.DescriptionOfWhatHappened} placeholder="Enter details" onChange={(e)=>inputHandler(e)} disabled={(params.view != undefined) ? true :false} />
                </div>
            </div>
            
            <div className="btn">
               <Link to ="/grid"><button type="button" className="cancel">Cancel</button></Link>
               {(params.view != undefined)?<></>:
                <button type="button" className="submit" id="submitbtn" onClick={()=>submitForm()}>{(params.id == undefined) ? "Save":"Update"}</button>}
            </div>

        </div>
    )
}
export default ForkliftForm;