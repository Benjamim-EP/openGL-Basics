
function initializeGL(){
    canvas = document.getElementById( "gl-canvas" ); // Recuperar a referência ao GLCanvas

    var gGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (gGL !== null) {
        gGL.clearColor(0.0, 0.8, 0.0, 1.0); //Limpe a área de desenho da tela para sua cor favorita através do WebGL
        gGL.clear(gGL.COLOR_BUFFER_BIT); // resetar as cores

        // A. initialize the vertex buffer
        initSquareBuffer(gGL); // This function is defined VertexBuffer.js
        // B. now load and compile the vertex and fragment shaders
        initSimpleShader("vertex-shader", "fragment-shader",gGL);
        // the two shaders are defined in the index.html file
        // initSimpleShader() function is defined in ShaderSupport.js

    }
    return gGL
}
// Clears the draw area and draws one square
function drawSquare(gGL) {
    gGL.clear(gGL.COLOR_BUFFER_BIT);      // clear to the color previously set

    // Step A: Enable the shader to use
    gGL.useProgram(gSimpleShader);

    // Step B. Enables the vertex position attribute
    gGL.enableVertexAttribArray(gShaderVertexPositionAttribute);

    // Step C. draw with the above settings
    gGL.drawArrays(gGL.TRIANGLE_STRIP, 0, 4);
}

// this is the function that will cause the WebGL drawing
function doGLDraw() {
    let gGL = initializeGL();     // Binds gGL context to WebGL functionality
    drawSquare(gGL);       // Clears the GL area and draws one square
}