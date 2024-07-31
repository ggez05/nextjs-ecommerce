import Image from "next/image";
import { useRouter } from "next/navigation";

type CategoryData = {
  _id: string;
  categoryName: string;
  categoryDescription: string;
  categoryImage: string;
  categorySlug: string;
};

export default function CategoryCard({
  categoryDescription,
  categoryImage,
  categoryName,
  categorySlug,
  _id,
}: CategoryData) {
  const router = useRouter();
  return (
    <div className="card card-compact text-black cursor-pointer m-3 w-80 bg-gray-50 shadow-xl relative">
      <div className="w-full rounded-t-lg relative h-60">
        <Image
          src={categoryImage || "/images98.jpg"}
          alt="no Image"
          className="rounded-t-lg"
          fill
        />
      </div>
      <div className="card-body bg-black text-white rounded-b-lg flex justify-center place-items-center">
        <h2 className="card-title mb-1">{categoryName} </h2>
        <button
          onClick={() => router.push(`/category/category-product/${_id}`)}
          className="btn text-black bg-white tracking-widest btn-wide mt-2 hover:bg-gray-200"
        >
          View Products
        </button>
      </div>
    </div>
  );
}
