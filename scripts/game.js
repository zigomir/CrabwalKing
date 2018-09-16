﻿var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var song = new Audio('../sounds/one_by_one.ogg')
var crowd = new Audio('../sounds/crowd.ogg')

var abbath = {
  img: new Image(),
  x: 0,
  y: 0,
  width: 50,
  height: 50
}

var drummer = new Image()
// stage elements
var poster = new Image()
var sSpeakerWidth = 100
var sSpeakerHeight = 200

var playing = false
// assets
var IMMORTAL =
  'data:image/gif;base64,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%3D'
var ABBATH_GUITAR =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAyCAMAAADC1sOAAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyUlJSYmJigoKCkpKSoqKisrKywsLC4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njg4ODk5OTo6Ojs7Oz4+Pj8/P0BAQEFBQUREREZGRkhISElJSUpKSkxMTE1NTVBQUFFRUVVVVVtbW1xcXF1dXV5eXl9fX2BgYGFhYWNjY2RkZGhoaGtra29vb3BwcHNzc3V1dXZ2dnd3d3h4eHp6ent7e3x8fH5+fn9/f4CAgIGBgYKCgoODg4SEhIeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5aWlpeXl5iYmJmZmZqamp+fn6SkpKampqurq6ysrK2tra6urq+vr7Ozs7W1tbe3t7m5ub29vb6+vr+/v8LCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy83Nzc7Ozs/Pz9HR0dLS0tPT09TU1NXV1dbW1tfX19jY2Nzc3ODg4OHh4ePj4+Tk5OXl5efn5+jo6Onp6erq6uzs7O/v7/Dw8PHx8QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGnq9LAAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS44NzuAXQAAA8FJREFUSEuNlft/E0UUxc+dmd3Z3Wyym7QhaVNooVgfqG0FFYoCFgVUfNW3paKC1oJSFasWVKAgPlDiiwIVi7b6d453EwmbzeaTzm97535n7j3nJgOTWHjDN5hEMnz7O7mF4z/iRt/CdHsksRPClpAW4LVFmjeyOIqzgYuLeNXBSnplzQQ+6EbVqJvXQrzb7pJ4fKUEwAr4aEBptEGawriqMxD4AcgrXFkLEb4CXCF5Gk4V3mtrIbgSIFerymfBOnfOeSVUanlZBReUisQP8t/iK4z56eTvZoVs+1hngm1Txri2RrcxmRqdsuJRXcX33AJQhG3Ohj/LjgSdx9xidMQfBpfn3TOd78CkrnDW5fnfah4eWQNRwUuFehpoBhAdq8LbEnbdCsCmw521coFvxQk/cvEj/c1atEKA45z3ujfD5r8Dv3NVfLrAORU5cUHlWu948dntG5/8t3l2mTmK88657FQWmxJSXRuv9sKo8UQYXcS9Zzye9yahlj/MbwFpQVRNaj4PVeoXvf0vx4EbBx2SquhJ4e0ySWJCS26AuvIzDWRpf5AB2fqFx3abL/6JiC7dM7d6a3/9kJA8kf5u9r22ru5zHi4QeTeX/qwHmFh09zwabju0UP/OELRA8cETtc9LT+fuKitg4naRUVU2bbk/V9jq7D22uCrLIEHYOLafN/5+ytvaI6xy8WSsq4i4vsN/IoAoz00M9Wa5ZALl+rzHvxuJpgWWsOr3/b/qnfv2XkutOzAx+Wa3Cw2S1L/Ts4jzhXrgy3h+rQ9ev7r2e5bkjH3jY0xYPoZ3VkDK3VwslZqBhrqy+NX06NDwqXKPbbGLtN5SxULWe2b2UgJoEBdduJmRMGQvwgAWbC4/2HxvOfAO/JJW1cCopkgibhpiQ05gTKrA53khSCo2zLrlhzEbLOGqwGK9GIr0mZpya/9262BpsupONWl1d7QbW7sckKukpHu22wVJXguxvI2oQkVz6Dmnf9AX9Ek4ZZYX6qvgFRKPT6TuakZYgn9wz9NAXuVGpgtHYofa/nDijYk2o+J5EAZxOBgtHez9PF7FLE9Zax9M3MfRPtnTl/n6erM0ppvSiUh0Oej0fpY0zPAotN4R6gwHHcvfcaoFMOxRKzEQCbh0x6aHZlsBwx6lEHB5frV1Zwpgkk9oja9Y4RmTyz+SBhgp0zpXmY/N+8W/UgmdeBBrPKT/qaleOJ1KhK13lBz+J0+YEDedxYq/VlD8AIimUOImrQKCo53G7PKAaJlr83ZHWaT59yyRbZr21PrbBf8D4k+C72yWYCQAAAAASUVORK5CYII%3D'
var ABBATH_GUITAR_HORN =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyUlJSYmJicnJygoKCkpKSoqKisrKywsLC4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njg4ODk5OTo6Ojs7Oz09PT4+Pj8/P0BAQEFBQUREREZGRkhISElJSUpKSktLS0xMTE1NTVBQUFFRUVJSUlVVVVlZWVtbW1xcXF1dXV5eXl9fX2BgYGFhYWNjY2RkZGdnZ2hoaGtra29vb3BwcHNzc3V1dXZ2dnd3d3h4eHp6ent7e3x8fH5+fn9/f4CAgIGBgYKCgoODg4SEhIeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5aWlpeXl5iYmJmZmZqamp+fn6Ojo6SkpKampqurq6ysrK2tra6urq+vr7Ozs7W1tbe3t7m5ub29vb6+vr+/v8LCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy83Nzc7Ozs/Pz9HR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tzc3N/f3+Dg4OHh4ePj4+Tk5OXl5efn5+jo6Onp6erq6uzs7O/v7/Dw8PHx8QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABtoU8AAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS44NzuAXQAABBxJREFUSEuNlf1fFFUUxp/7Mq87uzMsDAssCghGmSWQ9qJYWmGWWNorZW9IVlKEllSaJZqpaPZiub2JpZJBQf6Jt3NnhXZnZ/hwftnP3nO+99zznHPnQsUMb3oKw4gvV/yP+3D4B9xsnRpbhom5ApgCwgDcdKbak8UozvoOLuI1G/Mph6tG8GEDSkrOXQvwXmqaSsd8AYDh0+aAtJDGVK3jqpUBx/dAncSVFSHBq8AVJk7BLsF9fUUIHQbIRQfzSLYVlE+BBRSjwKyEA5bM4FaeHA1/aK/3NiVR6sejv6l5ZpqH0pB57eCnNUL9k0o5poUGpTIRnmRQzmf7rvMoi1XCd1QGEMJUZ4OfRBoSbuhaxSMnO4/j03rrPxUuTzpnUrM8Jdo7dkYIhq0ihV2e/DVq5sFURI16606VkSJeyZfjwMaBcu4a0xE7eWs57h0Bs9wSwGQH0hTTsYEzqn8c4Bt+xNPt/Nj6ehnFKPZ3Jz+ns/g4TIFvuOM0Bu/CW+ZgSg3adxBC+3Ock7ojF2SuNsvLz23uePqWuq1KIaNFA0GjOG+fy45ksSYm2LWBUguUHFhEjnmZiUiBekYCZFwa/yqlZj+qWw9mccZKi4h63hX1eyhqErLQxlva9lUSN/faTMjQFdzdRtsuutYKJsxs90OWoCJYfd34EjMz6GfATOulx7erE/9GSL3VfHyBAh7j1A/WyAWNp7edJiCyq7vsB/OMuXMzf91eIWTaefSRYNP+KaWuD5hwGCyO8P4jUcClPbm7miQwVHFOfTCTrd+Qy2+0dxyaXhAmGGfo6B8kxz/PuBubudEUHq2sTCM3tnhP+uBNx4e6W7IWGAPLtbpPfNurBwcGN8oZF61cvmfuMGTj7qHhtxocECRY21bXYARwed+XVcCiYr845vuGoJBdA/2EGB56thbBpNMVFgoxYklkEZ4e6+vuOdnUbBrUTrbKkGE+6z47cSlOLCEXHTiZ3iAgmQMfBkwqwe+6p8l3d/+ceLD2Potpoahy8NU5jn4hfY9Gh0GwUDctXv5qgzvSN0g1orRKIyNO9BlshGExgzpWg6zT7grbZoM5Ugh292YzL5hbi8xuYqzIQrX/Bbut0+Ps02BEzU6VLe/m46+T7stChhucruCLrL1O5nrH8gcrtjW9ntjFif7qAmgmOnHA7yvsbfmi8iATNHEJtRByLy23iubWzFc3YgI1sBREiy867ZbPazpHQ5GQJbAytGob3paTNYSiXiUg7VrHmbVrHojuf8yoV0kIHJpmy7gzgVA172y0Q9EIzqhc3cNJhBIisXyZ+UR9EP6diFjxR7PcF+EdU6UL5e9/3IKELAWbvvOxZlS2nySres8g6X3g1WvVeSzpM9iWvbSqZ8USubQ3nuKYRVdcIPs/knj+ZRf/A/+Ng4zyXtDUAAAAAElFTkSuQmCC'
var ABBATH_GUITAR_WALK =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAxCAMAAAB9JQB1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyUlJSYmJigoKCkpKSoqKisrKywsLC4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njg4ODk5OTo6Ojs7Oz4+Pj8/P0BAQEFBQUREREZGRkhISElJSUpKSkxMTE1NTVBQUFFRUVVVVVtbW1xcXF1dXV5eXl9fX2BgYGFhYWNjY2RkZGhoaGtra29vb3BwcHNzc3V1dXZ2dnd3d3h4eHp6ent7e3x8fH5+fn9/f4CAgIGBgYKCgoODg4SEhIeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5aWlpeXl5iYmJmZmZqamp+fn6SkpKampqurq6ysrK2tra6urq+vr7Ozs7W1tbe3t7m5ub29vb6+vr+/v8LCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy83Nzc7Ozs/Pz9HR0dLS0tPT09TU1NXV1dbW1tfX19jY2Nzc3ODg4OHh4ePj4+Tk5OXl5efn5+jo6Onp6erq6uzs7O/v7/Dw8PHx8QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGnq9LAAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS44NzuAXQAAA7BJREFUSEuFlvl/1GQQxp95j2Rz7Ca7bdhtt9BCsR6obQUVigIWBVS86m2pqKC1oFTFqgUVKIgHynpRoCJo0b/zdbKLNMluP5nfMu935p33mUnewKQMb/gGk0g7k0/pJRz9Edf6FqZXD0ithLAkpAbcVQOSC0UcxunAwXm8WsBy55qSPD7oRsOoG1dCvLvaBiv+5SoAHXBaQNlYJSDhxmXbg8APQFnhUj4fvgJcInkShQbc1/J5rgEoNevxWaS88zJVRb1JFRUcUMeAlTT+W5zemJ+O/26WybKO5PHcJGWMY9noNsZrxnawFa/dwPdcOhDBMqfDn2UOT2cxtxiH/2Fwcd45lZcfk3admYvzvzU7diiXr+OlSgsCzQAipx68LWG1pAcsOpinjwN8K475cc8+sr/J1wcBjjL1ujvDjX4Hfl49nFngjIqVP6dK7flffHbr+if/Tc4nRxzG2cKZ4lQRGzLyXBlv9MKo8ZQbXcQn9lye6JQ41z8sbwLZgqiRTjMPVe0Xvf0vJ/Fr+wskVeRK4e4waX7Cllw4dZVnbgcs7Q08kGW/8NhO88U/Bl12z9zN/1fXDgnJc+fv5B437fKewsMVIvfG0p8tBxadXY+GWw4stJ48gi0QPXis+Xjh6dJdNQVMrJQHY9Gm+0uVzYXdRxZvyhpIENaP7WXi76fczT1C16LjidPAXN3mPxFA1OYmhnqLXCqBSn3u49+NxHMBLXRrr1sWn9e3dmu1Zt/E5JvdDmyQpP7triamhXrgy/TYxfyvjvWelry+Z3yMee1jeHsdpJyNUbWamdKWnjL6anp0aPhErcfS3DNaq1VUKbrPzF7I4Lf0P+/A8UbCkLUPA2hYXHaw8d5a4O77pb2egVGbYln4qBDrSgJjUgU+TwZBUnS7OS3FjVmnhaMCzRpxSKzJ1JTT/HatgbZJtzqT0OfueC1hOwogR0lJ92y1KpLcLL+FqE6ROfBcoX/QF/RJOGWuL7Ss4lYyVwfX4wkt+GV6ngbKqjQyXTmUSGj5w5kbK/4aANzyQRwMRqv7ez9P7j/L05Sth/n72Ncne/q8r6+m5TDd1ImPRZaDhd7Psu0x3PZs/tD22FXQ/rYTbbjhnmT5gViypTs2PDTbjhvuSRsPh2fU1nd2wE324uPoug5PmVL5kU64kbL9vMr72Lwf/dWRtzMXGUdD+p+axrmTHfmwPX/Ir1GlI2wiRZT+TnN+hzeQ9VjTjAVCl7QKsvq4Dv+W2PZSG++RLpKtU/7/AM4L85Cn17HrAAAAAElFTkSuQmCC'
var ABBATH_GUITAR_SLAM =
  'data:image/png;base64,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%3D'
var DRUMMER_1 =
  'data:image/png;base64,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%3D'
var DRUMMER_2 =
  'data:image/png;base64,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%3D%3D'

var stage = function() {
  // poster
  ctx.drawImage(poster, canvas.width / 2 - poster.width / 2, 100)

  // ground
  ctx.fillStyle = 'rgb(0,0,0)'
  ctx.fillRect(0, canvas.height - 10, canvas.width, 10)

  // drummer stage
  ctx.fillRect(canvas.width / 2 + 100, canvas.height - 40, 100, 10)
  ctx.fillRect(canvas.width / 2 + 100, canvas.height - 30, 10, 20)
  ctx.fillRect(canvas.width / 2 + 190, canvas.height - 30, 10, 20)
}

var speakers = function() {
  var speakerSize = 40
  if (playing === true) {
    speakerSize = Math.round(Math.random() * 40)
  }

  ctx.strokeStyle = 'rgb(255,255,255)'
  ctx.lineWidth = 3

  // left speaker
  ctx.fillRect(0, canvas.height - sSpeakerHeight, sSpeakerWidth, sSpeakerHeight)
  // speaker circle
  ctx.beginPath()
  ctx.arc(sSpeakerWidth / 2, canvas.height - sSpeakerHeight / 2, speakerSize, 0, Math.PI * 2, true)
  ctx.stroke()

  // right speaker
  ctx.fillRect(canvas.width - sSpeakerWidth, canvas.height - sSpeakerHeight, sSpeakerWidth, sSpeakerHeight)

  // speaker circle
  ctx.beginPath()
  ctx.arc(
    sSpeakerWidth / 2 + canvas.width - sSpeakerWidth,
    canvas.height - sSpeakerHeight / 2,
    speakerSize,
    0,
    Math.PI * 2,
    true
  )
  ctx.strokeStyle = 'rgb(255,255,255)'
  ctx.stroke()
}

var drawDrummer = function() {
  if (playing) {
    if (drummer.src.endsWith(DRUMMER_1)) {
      drummer.src = DRUMMER_2
    } else {
      drummer.src = DRUMMER_1
    }
  }
  ctx.drawImage(drummer, canvas.width / 2 + 125, canvas.height - 89)
}

var posterColorInvert = function() {
  var imageData = ctx.getImageData(canvas.width / 2 - poster.width / 2, 100, poster.width, poster.height)
  var data = imageData.data

  for (var i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i] // red
    data[i + 1] = 255 - data[i + 1] // green
    data[i + 2] = 255 - data[i + 2] // blue
    // i+3 is alpha (the fourth element)
  }

  // overwrite original image
  ctx.putImageData(imageData, canvas.width / 2 - poster.width / 2, 100)
}

var drawAbbath = function() {
  if (abbath.img.src.endsWith(ABBATH_GUITAR_HORN)) {
    posterColorInvert()
  }
  ctx.drawImage(abbath.img, abbath.x, abbath.y)
}

var walk = function() {
  if (abbath.img.src.endsWith(ABBATH_GUITAR)) {
    abbath.img.src = ABBATH_GUITAR_WALK
  } else {
    abbath.img.src = ABBATH_GUITAR
  }
}

var moveAbbath = function(event) {
  song.play()
  var dx = 5

  switch (event.keyCode) {
    case 38 /* Up arrow was pressed */:
      abbath.img.src = ABBATH_GUITAR_HORN
      crowd.play()
      break
    case 40 /* Down arrow was pressed */:
      if (abbath.img.src.endsWith(ABBATH_GUITAR)) {
        abbath.img.src = ABBATH_GUITAR_SLAM
      } else {
        abbath.img.src = ABBATH_GUITAR
      }
      break
    case 37 /* Left arrow was pressed */:
      if (abbath.x - dx - sSpeakerWidth > 0) {
        abbath.x -= dx
        walk()
      }
      break
    case 39 /* Right arrow was pressed */:
      if (abbath.x + dx < canvas.width - 50 - sSpeakerWidth) {
        abbath.x += dx
        walk()
      }
      break
  }
}

String.prototype.endsWith = function(suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1
}

var draw = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  stage()
  speakers()
  drawAbbath()
  drawDrummer()
}

abbath.img.src = ABBATH_GUITAR
drummer.src = DRUMMER_1
poster.src = IMMORTAL

// abbath initial position
abbath.x = canvas.width / 2 - abbath.width / 2
abbath.y = canvas.height - abbath.height - 9 // because 10px ground

setInterval(draw, 10)
window.addEventListener('keydown', moveAbbath, true)

song.addEventListener(
  'ended',
  function() {
    this.currentTime = 0 // for restart playing
    playing = false
    this.pause()
  },
  false
)

song.addEventListener(
  'playing',
  function() {
    playing = true
  },
  false
)
