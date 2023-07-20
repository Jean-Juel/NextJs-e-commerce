import ProductForm from "@/src/components/admin/ProductForm";
const ObjectId = require('mongoose').Types.ObjectId;

// TODO A TEST
// import { Suspense } from 'react'
// <Suspense fallback={<p>Loading weather...</p>}>

async function getData(id) {
    const res = await fetch(`http://localhost:3000/api/products/${id}`)
    return res.json()
}


export default async function EditProductPage({params: {id}}) {
    const productInfo = await getData(id)

    return (
        <>
            <h1 className="text-blue-800 font-medium text-2xl">Edit product</h1>
            {productInfo && <ProductForm {...productInfo}/>}
        </>
    );
};

