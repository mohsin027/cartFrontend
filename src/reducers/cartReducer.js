const initialState = {
    cartRefresh: false,
  
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      
      case "REFRESH-CART":
        return {
          ...state,
          cartRefresh: !state.cartRefresh,
        };
    
      default:
        return state;
    }
  };
  
  export default authReducer;
  