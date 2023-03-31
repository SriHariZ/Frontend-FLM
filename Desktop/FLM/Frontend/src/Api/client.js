import axios from 'axios';

// PC_NO_14
// Creating a function to connect with the backend
export async function client(header,body={})
{
    let config =
    {
        ...header,
        data : body,
    };

    const response = await axios(config);

    return response;
}