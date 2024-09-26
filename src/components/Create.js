import React, { useState } from "react";
import { addProduct } from "../reducers/ProductReducer";
import { useDispatch } from "react-redux";
import { useModal } from "./ModalContext";

const Create = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [count, setCount] = useState("");
  const [size, setSize] = useState({ width: "", height: "" });
  const [weight, setWeight] = useState("");
  const [comments, setComments] = useState([]);

  const dispatch = useDispatch();
  const { closeCreate } = useModal();

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      addProduct({
        id:
          Math.floor(Math.random() * 100) +
          Math.floor(Date.now() / 1000000000),
        imageUrl: image,
        name,
        count,
        size: {
          width: size.width,  // Використовуємо ширину
          height: size.height  // Використовуємо висоту
        },
        weight,
        comments,
      })
    );

    closeCreate();
  };

  const handleCommentsChange = (e) => {
    const newComments = e.target.value.split(",").map((comment) => ({
      id: Math.floor(Math.random() * 100000),
      description: comment.trim(),
      date: new Date().toLocaleString(),
    }));
    setComments(newComments);
  };

  // Функція для зміни розмірів
  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    setSize((prevSize) => ({
      ...prevSize,
      [name]: value,  // Оновлюємо відповідно до назви поля
    }));
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="w-1/2 border bg-gray-800 p-5 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <label htmlFor="imageUrl" className="text-white">Image:</label>
            <input
              type="text"
              name="imageUrl"
              className="form-control bg-gray-400 text-white w-full pl-2 py-1 rounded-md"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="my-2">
            <label htmlFor="name" className="text-white">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control bg-gray-400 text-white w-full pl-2 py-1 rounded-md"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="my-2">
            <label htmlFor="count" className="text-white">Count:</label>
            <input
              type="text"
              name="count"
              className="form-control bg-gray-400 text-white w-full pl-2 py-1 rounded-md"
              onChange={(e) => setCount(e.target.value)}
            />
          </div>
          <div className="my-2">
            <label htmlFor="size" className="text-white">Size (Width x Height):</label>
            <input
              type="number"
              name="width"  // Назва поля width
              className="form-control bg-gray-400 text-white w-full pl-2 py-1 mb-2 rounded-md"
              onChange={handleSizeChange}  // Виклик функції зміни
              placeholder="Width"
            />
            <input
              type="number"
              name="height"  // Назва поля height
              className="form-control bg-gray-400 text-white w-full pl-2 py-1 rounded-md"
              onChange={handleSizeChange}  // Виклик функції зміни
              placeholder="Height"
            />
          </div>
          <div className="my-2">
            <label htmlFor="weight" className="text-white">Weight:</label>
            <input
              type="text"
              name="weight"
              className="form-control bg-gray-400 text-white w-full pl-2 py-1 rounded-md"
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="my-2">
            <label htmlFor="comment" className="text-white">Comments:</label>
            <input
              type="text"
              name="comment"
              className="form-control bg-gray-400 text-white w-full pl-2 py-1 rounded-md"
              onChange={handleCommentsChange}
            />
          </div>
          <div className="flex justify-end mt-4">
            <button type="submit" className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
