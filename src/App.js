import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Create from "./components/Create";
import { Edit } from "./components/Edit";
import { deleteProduct } from "./reducers/ProductReducer";
import { useModal } from "./components/ModalContext";

function App() {
  const {
    createIsOpen,
    openCreate,
    closeCreate,
    editIsOpen,
    openEdit,
    closeEdit,
    selectedProduct,
  } = useModal();

  const products = useSelector((state) => state.product);
  console.log(products);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteProduct({ id: id }));
  };

  const toggleBodyScroll = (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  // Використовуємо блокування скролу
  useEffect(() => {
    toggleBodyScroll(createIsOpen || editIsOpen);
    return () => toggleBodyScroll(false);
  }, [createIsOpen, editIsOpen]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        onClick={openCreate}
      >
        Create Product
      </button>

      <table className="min-w-full bg-white border border-gray-200 mt-4 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="px-4 py-2 text-left text-gray-600">Id</th>
            <th className="px-4 py-2 text-left text-gray-600">Image</th>
            <th className="px-4 py-2 text-left text-gray-600">Name</th>
            <th className="px-4 py-2 text-left text-gray-600">Count</th>
            <th className="px-4 py-2 text-left text-gray-600">Weight</th>
            <th className="px-4 py-2 text-left text-gray-600">Comments</th>
            <th className="px-4 py-2 text-left text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="px-4 py-2 text-gray-700">{product.id}</td>
              <td className="px-4 py-2">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  width={product.size.width}
                  height={product.size.height}
                />
              </td>
              <td className="px-4 py-2 text-gray-700">{product.name}</td>
              <td className="px-4 py-2 text-gray-700">{product.count}</td>
              <td className="px-4 py-2 text-gray-700">{product.weight}</td>
              <td className="px-4 py-2">
                {Array.isArray(product.comments) && product.comments.length > 0 ? (
                  <ul className="list-disc list-inside pl-4">
                    {product.comments.map((comment, index) => (
                      <li key={index} className="text-gray-600">
                        <strong>Comment {comment.id}:</strong>{" "}
                        {comment.description} - {comment.date}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-gray-600">No comments</span>
                )}
              </td>
              <td className="px-4 py-2">
                <button
                  className="bg-blue-600 text-white  px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mr-2"
                  onClick={() => openEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {createIsOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg mx-auto rounded-lg shadow-lg">
            <div className="p-4 border-b border-gray-200">
              <h5 className="text-xl font-semibold">Create Product</h5>
              <button
                type="button"
                onClick={closeCreate}
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <div className="p-4">
              <Create />
            </div>
          </div>
        </div>
      )}

      {editIsOpen && selectedProduct && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg mx-auto rounded-lg shadow-lg">
            <div className="p-4 border-b border-gray-200">
              <h5 className="text-xl font-semibold">Edit Product</h5>
              <button
                type="button"
                onClick={closeEdit}
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <div className="p-4">
              <Edit product={selectedProduct} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;