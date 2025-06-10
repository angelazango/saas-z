import { NextResponse } from "next/server";


export async function POST(request){
try {
    const {title,description}=await request.json();
    // validate input
    if(! title) {
        return NextResponse.json(
            { message:"Title is required"},
            { status:400 }
        )
    }


    const category = { title, description };
    console.log(category);
    return NextResponse.json(category);
}  catch (error) {
    console.log(error);
    return NextResponse.json({
        error,
        message:"Failed to create a category"
    },{
        status:500
    })

}
}
