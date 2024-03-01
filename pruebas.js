// /* Parameters */
// let vertexCount = 10000 * 4
// let depth = 0
// let fontName = 'Arial, Helvetica'
// let fontSize = 24
// let frame = 0
// let smoothness = 6

// /* Properties */
// let vertices = []
// let dVertices = []

// let refctx = document.createElement('canvas').getContext('2d')
// let gl = document.createElement('canvas').getContext('webgl')
// let postctx = document.body.appendChild(document.createElement('canvas')).getContext('2d')
// let canvas = gl.canvas

// let compileShader = function (type, source) {
//     let shader = gl.createShader(type), status;
//     gl.shaderSource(shader, source)
//     gl.compileShader(shader)
//     status = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
//     if (status) return shader
//     console.error('Shader compile error', gl.getShaderInfoLog(shader))
//     gl.deleteShader(shader)
// }

// let createProgram = function (vertexShader, fragmentShader) {
//     let program = gl.createProgram(), status
//     gl.attachShader(program, vertexShader)
//     gl.attachShader(program, fragmentShader)
    
//     gl.linkProgram(program)
    
//     status = gl.getProgramParameter(program, gl.LINK_STATUS)
//     if (status) return program
    
//     console.error('program link error', gl.getProgramInfoLog())
//     gl.deleteProgram(program)
// }

// let vertexShader = compileShader(gl.VERTEX_SHADER, `
//     attribute vec4 a_position;
//     uniform vec2 u_resolution;
//     uniform float u_frame;
//     varying vec4 v_position;
//     varying float v_frame;
//     void main () {
//         v_position = a_position;
//         v_frame = u_frame;
//         v_position.xy /= u_resolution;
//         v_position.y *= -1.0;
        
//         v_position.xy *= 10.0;
//         v_position.z += cos(u_frame / 20.0 + v_position.x * 10.0) * sin(u_frame / 10.0 + v_position.y * 12.0) * 0.02;
//         v_position.xy /= (1.0 + v_position.z);
        
//         gl_Position = vec4(v_position.xy, 0.0, 1.0);
//         gl_PointSize = 3.0;
//     }
// `)

// let fragmentShader = compileShader(gl.FRAGMENT_SHADER, `
//     precision mediump float;
//     varying vec4 v_position;
//     varying float v_frame;
    
//     void main () {
//         if (v_position.w > 0.1) {
//             // Pixel belongs to text, set it to black
//             gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
//         } else {
//             // Pixel belongs to the background, set it to white
//             gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
//         }
//     }
// `)

// let program = createProgram(vertexShader, fragmentShader)

// let aPosition = gl.getAttribLocation(program, 'a_position')
// let uResolution = gl.getUniformLocation(program, 'u_resolution')
// let uFrame = gl.getUniformLocation(program, 'u_frame')

// let vertexBuffer = gl.createBuffer()

// gl.useProgram(program)
// gl.clearColor(1, 1, 1, 1)
// gl.clear(gl.COLOR_BUFFER_BIT)

// gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
// gl.vertexAttribPointer(aPosition, 4, gl.FLOAT, false, 0, 0)
// gl.enableVertexAttribArray(aPosition)

// let oldTimeStamp = performance.now();
// let render = (timeStamp = performance.now()) => {
//     const dt = (timeStamp - oldTimeStamp) / 1000;
//     oldTimeStamp = timeStamp;
//     frame += dt * 50;
//     gl.uniform1f(uFrame, frame)
//     gl.clear(gl.COLOR_BUFFER_BIT)
    
//     // Resizing
//     if (postctx.canvas.width !== postctx.canvas.offsetWidth || postctx.canvas.height !== postctx.canvas.offsetHeight) {
//         canvas.width = postctx.canvas.width = postctx.canvas.offsetWidth
//         canvas.height = postctx.canvas.height = postctx.canvas.offsetHeight
//         gl.viewport (0, 0, canvas.width, canvas.height)
//         gl.uniform2fv(uResolution, [canvas.width, canvas.height])
//     }
    
//     for (let i = 0; i < vertices.length; i+=4){
//         let x = i
//         let y = i + 1
//         let z = i + 2
//         let v = i + 3
        
//         // Make vertex transition to target vertex
//         dVertices[x] -= ((dVertices[x] - vertices[x]) / smoothness) * dt * 50 // x
//         dVertices[y] -= ((dVertices[y] - vertices[y]) / smoothness) * dt * 50 // y
//         dVertices[z] -= ((dVertices[z] - vertices[z]) / smoothness) * dt * 50 // z
//         dVertices[v] -= ((dVertices[v] - vertices[v]) / smoothness) * dt * 50 * 2 // alpha
//     }
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dVertices), gl.STATIC_DRAW)
//     gl.drawArrays(gl.POINTS, 0, dVertices.length / 4)
    
//     postctx.globalAlpha = 0.2
//     postctx.globalCompositeOperation = 'source-over'
//     postctx.drawImage(canvas, 0, 0)
//     postctx.globalCompositeOperation = 'lighten'
//     postctx.globalAlpha = 1
//     postctx.filter = 'blur(8px)'
//     postctx.drawImage(canvas, 0, 0)
//     postctx.filter = 'blur(0)'
    
//     requestAnimationFrame(render)
// }

// // Draw reference text
// let setText = (text) => {
//     vertices = []
    
//     // Drawing text and resizing canvas
//     refctx.font = fontSize.toString() + "px " + fontName
//     refctx.canvas.width = refctx.measureText(text).width || 100
//     refctx.canvas.height = fontSize
//     refctx.font = fontSize.toString() + "px " + fontName
//     refctx.textBaseline = "top"
//     refctx.clearRect(0, 0, refctx.canvas.width, refctx.canvas.height)
//     refctx.fillStyle = "#000" // Set text color to black
//     refctx.fillText(text, 0, 0)
    
//     let { data } = refctx.getImageData(0, 0, refctx.canvas.width, refctx.canvas.height)
    
//     for (let i = 0; i < vertexCount; i+=4) {
//         j = i % data.length
//         let dI = (j / 4 >> 0)
//         let x = dI % refctx.canvas.width - refctx.canvas.width / 2
//         let y = ((dI / refctx.canvas.width >> 0) % refctx.canvas.height) - refctx.canvas.height / 2
//         let z = -depth / 2 + Math.random() * depth
//         let v = (data[j] * (data[j + 3] / 255)) / 255
        
//         vertices.push(x)
//         vertices.push(y)
//         vertices.push(z)
//         vertices.push(v)
//     }
// }

// let textList = [
//     'Hey!',
//     'I\'m H2x',
//     'How are you?',
//     'Do you like it?',
//     '~~~CodePen~~~',
//     ':3'
// ]

// let textIndex = 0
// let textGeneration = () => {
//     setText(textList[textIndex])
//     setTimeout(() => {
//         textIndex++
//         if (textIndex === textList.length) {
//             textIndex = 0
//         }
//         textGeneration()
//     }, 1000)
// }

// textGeneration()

// for (let i = 0; i < vertexCount; i++) {
//     dVertices.push(0)
// }

// render()
