const {client} = require('./client');

//PC_NO_13
//Creating a function to get Trailer Details
export async function getTrailerDetails(searchValue,page,order)
{
    let config =
    {
        url : `http://localhost:4000/forklift/gettrailerdetails?value=${searchValue}&start=${page}&order=${order}`,
        header:
        {
            "content-type" : "application/json",
        },
        method : "POST"
    };

    const response = await client(config);

    return response.data;
}

//PC_NO_33
// Creating a function to delete Trailer Details
export async function deleteTrailerDetailsById(id)
{
    let config =
    {
        url : `http://localhost:4000/forklift/deletetrailerdetailsbyid?id=${id}`,
        header:
        {
            "content-type" : "application/json",
        },
        method : "POST"
    };

    const response = await client(config);

    return response.data;
}

//PC_NO_7
//Creating function to get Service Center data
export async function getServiceCenterData()
{
    let config =
    {
        url : `http://localhost:4000/forklift/getservicecenterdata`,
        header:
        {
            "content-type" : "application/json",
        },
        method : "GET"
    };

    const response = await client(config);

    return response.data;
}

//PC_NO_48
// Creating function to get particular Trailer Details
export async function getTrailerDetailsById(id)
{
    let config =
    {
        url : `http://localhost:4000/forklift/gettrailerdetailsbyid/${id}`,
        header:
        {
            "content-type" : "application/json",
        },
        method : "GET"
    };

    const response = await client(config);

    return response.data;
}

//PC_NO_31
//Creating function to insert the Trailer Details
export async function insertTrailerDetails(trailerDetails)
{
    let config =
    {
        url : `http://localhost:4000/forklift/inserttrailerdetails`,
        header:
        {
            "content-type" : "application/json",
        },
        method : "POST"
    };

    const response = await client(config,trailerDetails);

    return response.data;
}

//PC_NO_67
//Creating a function to update the Tralier Details
export async function updateTrailerDetails(trailerDetails)
{
    let config =
    {
        url : `http://localhost:4000/forklift/updatetrailerdetails`,
        header:
        {
            "content-type" : "application/json",
        },
        method : "POST"
    };

    const response = await client(config,trailerDetails);

    return response.data;
}
