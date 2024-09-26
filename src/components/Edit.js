import { useDispatch } from "react-redux";
import { editProduct } from "../reducers/ProductReducer";
import { useModal } from "./ModalContext";
import { productValidationSchema } from "../validate";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const Edit = ({ product }) => {
  const { id, imageUrl, name, count, size, weight, comments } = product;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      imageUrl,
      name,
      count,
      size: {
        width: size.width,
        height: size.height
      },
      weight,
      comments: comments.map(comment => comment.description).join(", ")
    },
    resolver: yupResolver(productValidationSchema)
  });

  const dispatch = useDispatch();
  const { closeEdit } = useModal();

  const onSubmit = (data) => {
    const commentsArray = data.comments.split(",").map((comment) => ({
      id: Math.floor(Math.random() * 100000),
      description: comment.trim(),
      date: new Date().toLocaleString(),
    }));

    dispatch(
      editProduct({
        id,
        image: data.imageUrl,
        name: data.name,
        count: data.count,
        size: data.size,
        weight: data.weight,
        comments: commentsArray,
      })
    );
    closeEdit();
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="w-1/2 border bg-gray-800 p-5 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="imageUrl" className="text-white">Image:</label>
            <input
              type="text"
              name="imageUrl"
              className="form-control bg-gray-400 text-white w-full pl-2 py-1 rounded-md"
              {...register("imageUrl")}
            />
            {errors.imageUrl && <p>{errors.imageUrl.message}</p>}
          </div>
          <div className="my-2">
            <label htmlFor="name" className="text-white">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control bg-gray-400 text-white w-full pl-2 py-1 rounded-md"
              {...register("name")}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className="my-2">
            <label htmlFor="count" className="text-white">Count:</label>
            <input
              type="number"
              name="count"
              className="form-control bg-gray-400 text-white w-full pl-2 py-1 rounded-md"
              {...register("count")}
            />
            {errors.count && <p>{errors.count.message}</p>}
          </div>
          <div className="my-2">
            <label htmlFor="size" className="text-white my-2">Size (Width x Height):</label>
            <input
              type="number"
              name="size.width"
              className="my-2 form-control bg-gray-400 text-white w-full pl-2 py-1 rounded-md"
              {...register("size.width")}
            />
            {errors.size?.width && <p>{errors.size.width.message}</p>}
            <input
              type="number"
              name="size.height"
              className="form-control bg-gray-400 text-white w-full pl-2 py-1 rounded-md"
              {...register("size.height")}
            />
            {errors.size?.height && <p>{errors.size.height.message}</p>}
          </div>
          <div className="my-2">
            <label htmlFor="weight" className="text-white">Weight:</label>
            <input
              type="number"
              name="weight"
              className="form-control bg-gray-400 text-white w-full pl-2 py-1 rounded-md"
              {...register("weight")}
            />
            {errors.weight && <p>{errors.weight.message}</p>}
          </div>
          <div className="my-2">
            <label htmlFor="comments" className="text-white">Comments:</label>
            <input
              type="text"
              name="comments"
              className="form-control bg-gray-400 text-white w-full pl-2 py-1 rounded-md"
              {...register("comments")}
            />
            {errors.comments && <p>{errors.comments.message}</p>}
          </div>
          <button type="submit" className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};