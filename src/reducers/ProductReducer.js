import { createSlice } from '@reduxjs/toolkit';


// export interface Comment {
//     id: number;
//     productId: number;
//     description: string;
//     date: string;
//   }
  
//  interface Product {
//     products: any;
//     product: any;
//     id: number;
//     imageUrl: string;
//     name: string;
//     count: number;
//     size: {
//       width: number;
//       height: number;
//     };
//     weight: string;
//     comments: Comment[];
//   }
  
//   interface ProductState {
//     products: Product[];
// }

const saveToLocalStorage = (products) => {
    localStorage.setItem("products", JSON.stringify(products));
  };

  const initialState = JSON.parse(localStorage.getItem("products"));


const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.push({
                ...action.payload,
                comments: action.payload.comments || [],
            });
            saveToLocalStorage(state);
        },

        editProduct: (state, action) => {
            const {id, image, name, count, size, weight, comments} = action.payload;
            const editingProduct = state.find(product => product.id === id);

            if (editProduct) {
                editingProduct.imageUrl = image;
                editingProduct.name = name;
                editingProduct.count = count;
                editingProduct.size = size;
                editingProduct.weight = weight;
                editingProduct.comments = comments;
            };

            saveToLocalStorage(state); 
        },

        deleteProduct: (state, action) => {
            const { id } = action.payload;
            const deletingProduct = state.find(product => product.id === id);
          
            if (deletingProduct) {
              const updatedProducts = state.filter(f => f.id !== id);
              saveToLocalStorage(updatedProducts);
              return updatedProducts;
            }
            return state;
          }
    }
})

export const { addProduct, editProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;