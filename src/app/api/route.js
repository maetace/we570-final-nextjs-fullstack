export async function GET(request) {
    console.log('GET request received:', request.method);
    return new Response('Hello from GET!');
}

export async function POST(request) {
    const body = await request.json();
    console.log('POST data:', body);
    return Response.json({ message: 'Data received', data: body });
}

export async function PUT(request) {
    const body = await request.json();
    console.log('PUT data:', body);
    return Response.json({ message: 'Data updated', data: body });
}

export async function PATCH(request) {
    const body = await request.json();
    console.log('PATCH data:', body);
    return Response.json({ message: 'Data patched', data: body });
}

export async function DELETE(request) {
    console.log('DELETE request received');
    return new Response(null, { status: 204 });
}