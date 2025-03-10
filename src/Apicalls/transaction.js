import { axiosInstance } from "./index";


export const fetchTransactions = async ({ page, perPage, searchText, selectedMonth }) => {
    try {
      const response = await axiosInstance.get('http://localhost:8081/api/transaction/transaction',{
        params: {
            page, // Current page
            perPage, // Items per page
            search: searchText, // Search text
            month: selectedMonth, // Selected month
          },
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } 
  };