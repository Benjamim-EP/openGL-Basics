"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gSimpleShader = null;
    // Reference to the shader program stored in gGL context.

var gShaderVertexPositionAttribute = null;
    // gGL reference to the attribute to be used by the VertexShader

    // Loads/compiles/links shader programs to gGL context
function initSimpleShader(vertexShaderID, fragmentShaderID,gGL) {
    // Step A: load and compile vertex and fragment shaders
    
    var vertexShader = loadAndCompileShader(vertexShaderID, gGL.VERTEX_SHADER,gGL);
    var fragmentShader = loadAndCompileShader(fragmentShaderID, gGL.FRAGMENT_SHADER,gGL);

    // Step B: Create and link the shaders into a program.
    gSimpleShader = gGL.createProgram();
    gGL.attachShader(gSimpleShader, vertexShader);
    gGL.attachShader(gSimpleShader, fragmentShader);
    gGL.linkProgram(gSimpleShader);

    // Step C: check for error
    if (!gGL.getProgramParameter(gSimpleShader, gGL.LINK_STATUS)) {
        alert("Error linking shader");
    }

    // Step D: Gets a reference to the SquareVertexPosition variable within the shaders.
    gShaderVertexPositionAttribute = gGL.getAttribLocation(gSimpleShader, "aSquareVertexPosition");
        // SquareVertexPosition: is defined in the VertexShader (in the index.html file)

    // Step E: Activates the vertex buffer loaded in VertexBuffer.js
    gGL.bindBuffer(gGL.ARRAY_BUFFER, gSquareVertexBuffer);
        // gSquareVertexBuffer: is defined in VertexBuffer.js and 
        //      initialized by the InitSquareBuffer() function.

    // Step F: Describe the characteristic of the vertex position attribute
    gGL.vertexAttribPointer(gShaderVertexPositionAttribute, // variable initialized above
        3,          // each vertex element is a 3-float (x,y,z)
        gGL.FLOAT,  // data type is FLOAT
        false,      // if the content is normalized vectors
        0,          // number of bytes to skip in between elements
        0);         // offsets to the first element
}

// Returns a compiled shader from a shader in the dom.
// The id is the id of the script in the html tag.
function loadAndCompileShader(id, shaderType,gGL) {
    var shaderText, shaderSource, compiledShader;

    // Step A: Get the shader source from index.html
    shaderText = document.getElementById(id);
    //console.log(shaderText)
    shaderSource = shaderText.firstChild.textContent;

    // Step B: Create the shader based on the shader type: vertex or fragment
    compiledShader = gGL.createShader(shaderType);

    // Step C: Compile the created shader
    gGL.shaderSource(compiledShader, shaderSource);
    gGL.compileShader(compiledShader);

    // Step D: check for errors and return results (null if error)
    if (!gGL.getShaderParameter(compiledShader, gGL.COMPILE_STATUS)) {
        alert("A shader compiling error occurred: " + gGL.getShaderInfoLog(compiledShader));
    }

    return compiledShader;
}