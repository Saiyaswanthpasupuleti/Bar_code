import { createSlice } from "@reduxjs/toolkit";

const User={
isLoggedIn:null,
}
export const reducer = createSlice({
    name:"app",
    initialState: User,
    reducers:{
        login:(state,action)=>{
            state.isLoggedIn=action.payload;
              localStorage.setItem("isLoggedIn", JSON.stringify(action.payload));


        },
        logout:(state,action)=>{
            state.isLoggedIn=false;
              localStorage.removeItem("isLoggedIn");

        }
    }

})

export const MyBill=createSlice({
    name:"bill",
    initialState: localStorage.getItem("billItems") ? JSON.parse(localStorage.getItem("billItems")) : [],
    reducers:{
        addToBill:(state,action)=>{
            state.push(action.payload);
            // const prev=JSON.parse(localStorage.getItem("billItems")) || [];
            // const updated= [...prev, action.payload];
            // localStorage.setItem("billItems", JSON.stringify(updated));
                  const updated = [...state]; 
      localStorage.setItem("billItems", JSON.stringify(updated));
           
            
        },
       
        removeItem:(state,action)=>{
            // const itemIdtoremove=action.payload;
            const updatedItems=state.filter(item=>item.itemId!==action.payload);
localStorage.setItem("billItems",JSON.stringify(updatedItems))
            // state.itemId!=
            return updatedItems;

        }
        ,

       
        clearBill:(state,action)=>{
            
      localStorage.removeItem("billItems");

           return [];
        }
    }
})

export const {addToBill,clearBill,removeItem} = MyBill.actions;

export const {login,logout} = reducer.actions;
export const MyMainReducer= reducer.reducer;

export const MyBillReducer= MyBill.reducer;