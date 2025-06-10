import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // title,
    //   categoryId,
    //   SKU,
    //   barcode,
    //    description,
    //    quantity,
    //    unitId,
    //    warehouseId,
    //    imageUrl,
    //    buyingPrice,
    //    sellingPrice, 
    //    brandId,
    const data = await request.json();
    console.log(data);
    
 return NextResponse.json(data);
    // validate input
    if (!title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }
    console.log(item);

    return NextResponse.json(item);
  } catch (error) { 
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create an  item",
      },
      {
        status: 500,
      }
    );
  }
}
