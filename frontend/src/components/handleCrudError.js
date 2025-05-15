import { toast } from "react-toastify";

export default function handleCrudError(error) {
    let errorMessage = 'Something went wrong, please try again';
      if (error.response) {
        // The server responded with a status code outside the range of 2xx
        errorMessage = error.response.data.error || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        //  Handle network errors, The request was made but no response was received
        errorMessage = "No response from the server, please try again";
      }
      // Something happened in setting up the request that triggered an Error
      toast.error(errorMessage);
      //throw error;
}